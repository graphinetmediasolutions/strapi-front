// graphql/homepage.ts
import { gql } from '@apollo/client';

export const GET_HOME_PAGE_QUERY = gql`
query HomePage {
  homePage {
    documentId
    banner {
      image {
        url
      }
      title
      video {
        url
      }
    }
    sections {
      ... on ComponentComponentsSectionWhatYouSeek {
        mainHeading
        leftSubHeading
        rightSubHeading
        id
        SeekCard {
          id
          title
          image {
            url
          }
          icon {
            url
          }
          description
        }
      }
    }
  }
}
`;

export const HOME_PAGE_QUERY_NEW = gql`

query HomePageWithLocalizations {
    # Fetch the English homepage entry as the main object
    homePage(locale: "en") {
      banner {
        title
        image {
          url
        }
      }
      locale
      # Get all localizations of the *entire homePage entry*
      localizations {
        locale
        banner {
          title
          image {
            url
          }
        }
        # Sections are localized with the entire entry, so you query for them here
        sections {
          ... on ComponentComponentsSectionWhatYouSeek {
            id
            mainHeading
            leftSubHeading
            rightSubHeading
            SeekCard {
              icon {
                url
              }
              image {
                url
              }
              title
              description
            }
          }
        }
      }
      # The main sections are from the English version
      sections {
        ... on ComponentComponentsSectionWhatYouSeek {
          id
          mainHeading
          leftSubHeading
          rightSubHeading
          SeekCard {
            icon {
              url
            }
            image {
              url
            }
            title
            description
          }
        }
      }
    }
  }
`

// You can export other homepage-related queries here too
// export const UPDATE_HOME_PAGE_MUTATION = gql`...`;