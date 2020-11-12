import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Matching } from '../entities/Matching'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { SwipeLeft } from '../entities/SwipeLeft'
import { User } from '../entities/User'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    getUserById: async (_, { userId }) => (await User.findOne({ where: { id: userId } })) || null,
    // TODO: replace id to cts.user.id
    getUserByLocation: async (_, { location }, ctx) =>
      (await User.createQueryBuilder('user')
        .where('user.id != :id', { id: 1 })
        .andWhere('user.location = :location', { location: location })
        .andWhere(() => {
          const query = SwipeLeft.createQueryBuilder('swiped')
            .select('swiped.SwipedLeftOnId')
            .where('swiped.SwipedLeftById = :id', { id: 1 })
            .getQuery()
          return 'user.id NOT IN (' + query + ')'
        })
        .limit(10)
        .getMany()) || null,
    getMatches: async (_, args, ctx) =>
      (await User.createQueryBuilder('user')
        .where(() => {
          const query = Matching.createQueryBuilder('match')
            .select('match.user2Id')
            .where('match.user1Id = :id')
            .getQuery()
          return 'user.id IN (' + query + ')'
        })
        .setParameter('id', 1)
        .getMany()) || null,
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
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
