import gql from 'graphql-tag'

const fetchUserProfile = gql`
  query fetchUserProfile($userId: ID) {
    getUser(userId: $userId) {
      id
      email
      firstName
      lastName
      username
      birthDate
      gender
      sexualOrientation
    }
    getPictures(userId: $userId) {
      pictures {
        path
      }
      profilePicture {
        path
      }
    }
  }
`

export { fetchUserProfile }
