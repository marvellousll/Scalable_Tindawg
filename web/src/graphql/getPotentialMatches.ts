import { gql } from '@apollo/client'

export const getPotentialMatches = gql`
  query GetPotential {
    getPotentialMatches {
      user {
        id
      }
      dogName
      dogAge
      dogBreed
      location
      bio
      contact
      facebook
      linkedin
      imageURL
    }
  }
`
