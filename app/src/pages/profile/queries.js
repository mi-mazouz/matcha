import gql from 'graphql-tag'

const fetchUserProfile = gql`
  query fetchUserProfile {
    getUser {
      firstName
      lastName
      username
      birthDate
      gender
      sexualOrientation
      profilePicture {
        path
      }
    }
  }
`

export { fetchUserProfile }
