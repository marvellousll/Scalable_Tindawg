import { gql } from '@apollo/client'

export const swipeRight = gql`
  mutation SwipeRight($userId: Int!) {
    swipeRight(userId: $userId)
  }
`
