import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'

export interface UserInput {
  dogName?: string
  dogAge?: number
  dogBreed?: string
  bio?: string
  contact?: string
  facebook?: string
  linkedin?: string
  location?: string
  image?: string
}

const infoMutation = gql`
  mutation ChangeInfo($input: UserInput!) {
    changeUserInfo(input: $input)
  }
`

export function mutateInfo(info: UserInput) {
  return getApolloClient().mutate<any, any>({
    mutation: infoMutation,
    variables: { input: info },
  })
}
