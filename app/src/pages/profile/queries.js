import gql from 'graphql-tag'

const fetchUserProfile = gql`
  query fetchUserProfile($id: ID) {
    getUser(id: $id) {
      firstName
      lastName
      username
      birthDate
      gender
      sexualOrientation
    }
    getPictures(userId: $id) {
      profilePicture {
        path
      }
    }
  }
`

export { fetchUserProfile }
