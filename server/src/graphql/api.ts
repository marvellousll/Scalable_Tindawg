import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Matching } from '../entities/Matching'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { SwipeLeft } from '../entities/SwipeLeft'
import { SwipeRight } from '../entities/SwipeRight'
import { User } from '../entities/User'
import { UserInfo } from '../entities/UserInfo'
import { Resolvers, UserType } from './schema.types'

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
    self: (_, args, ctx) => {
      return ctx.user
    },
    getUserById: async (_, { userId }) => (await User.findOne({ where: { id: userId } })) || null,
    getPotentialMatches: async (_, args, ctx) => {
      const userInfo = await UserInfo.createQueryBuilder('userInfo')
        .where('userInfo.userId = :id', { id: ctx.user?.id })
        .getOne()
      const location = userInfo!.location

      return (
        (await UserInfo.createQueryBuilder('userInfo')
          .where('userInfo.userId != :id', { id: ctx.user?.id })
          .andWhere('userInfo.location = :loc', { loc: location })
          .andWhere(() => {
            const query1 = SwipeLeft.createQueryBuilder('swiped')
              .select('swiped.swipedLeftOnId')
              .where('swiped.swipedLeftById = :id', { id: ctx.user?.id })
              .getQuery()
            const query2 = SwipeRight.createQueryBuilder('swiped')
              .select('swiped.swipedRightOnId')
              .where('swiped.swipedRightById = :id', { id: ctx.user?.id })
              .getQuery()
            return 'userInfo.userId NOT IN (' + query1 + ' UNION ' + query2 + ')'
          })
          .innerJoinAndSelect('userInfo.user', 'user')
          .limit(10)
          .getMany()) || null
      )
    },
    getMatches: async (_, args, ctx) => {
      return (
        (await UserInfo.createQueryBuilder('userInfo')
          .where(() => {
            const query = Matching.createQueryBuilder('match')
              .select('match.user2Id')
              .where('match.user1Id = :id')
              .getQuery()
            return 'userInfo.userId IN (' + query + ')'
          })
          .setParameter('id', ctx.user?.id)
          .innerJoinAndSelect('userInfo.user', 'user')
          .getMany()) || null
      )
    },
    getUserInfoById: async (_, { userId }) =>
      (await UserInfo.createQueryBuilder('userInfo').where('userInfo.userId = :id', { id: userId }).getOne()) || null,
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
      check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
    changeUserInfo: async (_, { input }, ctx) => {
      const userInfo = await UserInfo.createQueryBuilder('userInfo')
        .where('userInfo.userId = :id', { id: ctx.user.id })
        .getOne()
      if (!userInfo) {
        const userInfo = new UserInfo()
        userInfo.user = ctx.user
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
      swipe.swipedLeftBy = new User()
      swipe.swipedLeftBy.id = ctx.user!.id
      swipe.swipedLeftOn = new User()
      swipe.swipedLeftOn.id = userId

      await swipe.save()
      return true
    },
    swipeRight: async (_, { userId }, ctx) => {
      const swipe = new SwipeRight()
      swipe.swipedRightBy = new User()
      swipe.swipedRightBy.id = ctx.user!.id
      swipe.swipedRightOn = new User()
      swipe.swipedRightOn.id = userId
      await swipe.save()

      if (
        await SwipeRight.createQueryBuilder('swipe')
          .where('swipe.swipedRightOnId = :id', { id: ctx.user?.id })
          .andWhere('swipe.swipedRightById = :id2', { id2: userId })
          .getOne()
      ) {
        const match = new Matching()
        match.user1 = new User()
        match.user1.id = ctx.user!.id
        match.user2 = new User()
        match.user2.id = userId
        await match.save()

        const revMatch = new Matching()
        revMatch.user1 = new User()
        revMatch.user1.id = userId
        revMatch.user2 = new User()
        revMatch.user2.id = ctx.user!.id
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
