import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { getRepository } from 'typeorm'
import { check } from '../../../common/src/util'
import { Matching } from '../entities/Matching'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { SwipeLeft } from '../entities/SwipeLeft'
import { SwipeRight } from '../entities/SwipeRight'
import { User } from '../entities/User'
import { UserInfo } from '../entities/UserInfo'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User
  request: Request
  response: Response
  pubsub: PubSub
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    getUserById: async (_, { userId }) => (await User.findOne({ where: { id: userId } })) || null,
    // TODO: replace id to ctx.user.id
    getPotentialMatches: async (_, { location }, ctx) =>
      (await User.createQueryBuilder('user')
        .where('user.id != :id', { id: ctx.user.id })
        .andWhere(() => {
          const query = UserInfo.createQueryBuilder('userinfo')
            .select('userinfo.userId')
            .where('userinfo.location = :location', { location: location })
            .getQuery()
          return 'user.id IN (' + query + ')'
        })
        .andWhere(() => {
          const query = SwipeLeft.createQueryBuilder('swiped')
            .select('swiped.swipedLeftOnId')
            .where('swiped.swipedLeftById = :id', { id: ctx.user.id })
            .getQuery()
          return 'user.id NOT IN (' + query + ')'
        })
        .limit(10)
        .getMany()) || null,
    // TODO: replace id to ctx.user.id
    getMatches: async (_, args, ctx) =>
      (await User.createQueryBuilder('user')
        .where(() => {
          const query = Matching.createQueryBuilder('match')
            .select('match.user2Id')
            .where('match.user1Id = :id')
            .getQuery()
          return 'user.id IN (' + query + ')'
        })
        .setParameter('id', ctx.user.id)
        .getMany()) || null,
    getUserInfoById: async (_, { userId }) =>
      (await getRepository(UserInfo)
        .createQueryBuilder('info')
        .leftJoinAndSelect('info.user', 'user')
        .where('user.id = :id', { id: userId })
        .getOne()) || null,
  },
  Mutation: {
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
    changeUserInfo: async (_, { input }, ctx) => {
      const userInfo = await UserInfo.findOne({ where: { userId: ctx.user.id } })
      if (!userInfo) {
        const userInfo = new UserInfo()
        userInfo.userId = ctx.user.id
        Object.assign(userInfo, input)
        await userInfo.save()
      } else {
        Object.assign(userInfo, input)
        await userInfo.save()
      }
      return true
    },
    swipeLeft: async (_, { userId }, ctx) => {
      const swipe = new SwipeLeft()
      //TODO: generate a new, distinct id
      swipe.id = 99 + userId

      swipe.swipedLeftBy = new User()
      swipe.swipedLeftBy.id = ctx.user.id
      swipe.swipedLeftOn = new User()
      swipe.swipedLeftOn.id = userId

      await swipe.save()
      return true
    },
    swipeRight: async (_, { userId }, ctx) => {
      const swipe = new SwipeRight()
      //TODO: generate a new, distinct id
      swipe.id = 99 + userId
      swipe.swipedRightBy = new User()
      swipe.swipedRightBy.id = ctx.user.id
      swipe.swipedRightOn = new User()
      swipe.swipedRightOn.id = userId
      await swipe.save()

      if (
        await SwipeRight.createQueryBuilder('swipe')
          .where('swipe.swipedRightOnId = :id', { id: ctx.user.id })
          .andWhere('swipe.swipedRightById = :id2', { id2: userId })
          .getOne()
      ) {
        const match = new Matching()
        //TODO: generate a new, distinct id
        match.id = 99 + userId
        match.user1 = new User()
        match.user1.id = 1
        match.user2 = new User()
        match.user2.id = userId
        await match.save()

        const revMatch = new Matching()
        //TODO: generate a new, distinct id
        revMatch.id = 999 + userId
        revMatch.user1 = new User()
        revMatch.user1.id = userId
        revMatch.user2 = new User()
        revMatch.user2.id = 1
        await revMatch.save()
      }

      return true
    },
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
