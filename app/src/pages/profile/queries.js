import gql from 'graphql-tag'

const userProfileQuery = gql`
  query UserProfileQuery {
    user {
      id
      title
      createdAt
      company {
        id
        name
      }
    }
  }
`

export { userProfileQuery }
