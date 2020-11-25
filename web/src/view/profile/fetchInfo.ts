import { gql } from '@apollo/client'

export const fetchInfo = gql`
  query getUserInfoById($userId: Int!) {
    getUserInfoById(userId: $userId) {
      dogName
      dogAge
      dogBreed
      bio
    }
  }
`

export const fetchContact = gql`
  query getContactById($userId: Int!) {
    getUserInfoById(userId: $userId) {
      contact
      linkedin
      facebook
      location
    }
  }
`

export const fetchImage = gql`
  query getImageById($userId: Int!) {
    getUserInfoById(userId: $userId) {
      imageURL
    }
  }
`
