import { gql } from '@apollo/client';

// export const MAIN_MENU_QUERY = gql`

// query Header {
//   header {
//     ctaButton {
//       label
//       id
//       url
//       style
//     }
//     logo {
//       url
//       alternativeText
//     }
//     menuItems {
//       title
//       url
//       children {
//         title
//         url
//         order
//         children {
//           title
//           url
//           children {
//             title
//             url
//             order
//           }
//         }
//       }
//     }
//     locale
//     localizations {
//       menuItems {
//         title
//         url
//         children {
//           title
//           url
//         }
//       }
//     }
//   }
// }
// `



export const MAIN_MENU_QUERY = gql`
  query Header {
    header {
      menuItems {
        title
        url
        localizations {
          title
          url
          locale
        }
        children {
          title
          url
          localizations {
            title
            url
            locale
          }
          children {
            title
            url
            localizations {
              title
              url
              locale
            }
            children {
              title
              url
              localizations {
                title
                url
                locale
              }
            }
          }
        }
      }
      locale
    }
  }
`;
