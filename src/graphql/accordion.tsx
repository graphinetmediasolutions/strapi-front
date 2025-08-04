import { gql } from '@apollo/client';


export const GET_SCHOOLS_LIST = gql`

query School {
  schools {
    courses {
      title
      slug
      program {
        name
      }
      featuredImage {
        url
      }
      link
    }
    name
  }
}
`
