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

query Banner($locale: I18NLocaleCode) {
  homePage(locale: $locale) {
    banner {
      title
      image {
        url
      }
      video {
        url
      }
    }
    locale
    documentId
    localizations {
      banner {
        title
        id
        image {
          url
        }
        video {
          url
        }
      }
    }
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