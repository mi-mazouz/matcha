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
