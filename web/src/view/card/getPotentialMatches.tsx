import { gql } from '@apollo/client'

export const getPotentialMatches = gql`
  query GetPotentialMatches($location: String!) {
    getPotentialMatches(location: $location) {
      id
    }
  }
`
