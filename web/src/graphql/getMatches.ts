import { gql } from '@apollo/client'

export const getMatches = gql`
  query GetMatches {
    getMatches {
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
