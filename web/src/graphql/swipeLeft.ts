import { gql } from '@apollo/client'

export const swipeLeft = gql`
  mutation SwipeLeft($userId: Int!) {
    swipeLeft(userId: $userId)
  }
`
