import DataLoader from 'dataloader'
import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import { Redis } from 'ioredis'
import path from 'path'
import { Matching } from '../entities/Matching'
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
  userLoader: DataLoader<number, User>
  redis: Redis
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

      await ctx.redis.set('abc', 1)
      const val = await ctx.redis.get('abc')
      console.log(val)
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
          .getMany()) || null
      )
    },
    getUserInfoById: async (_, { userId }) =>
      (await UserInfo.createQueryBuilder('userInfo').where('userInfo.userId = :id', { id: userId }).getOne()) || null,
  },
  Mutation: {
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
  UserInfo: {
    user: async (self, _, ctx) => {
      // return User.findOne({ where: { id: (self as any).id } }) as any
      return ctx.userLoader.load((self as any).id) as any
    },
  },
}
