import { gql } from '@apollo/client';

export const MAIN_MENU_QUERY = gql`

query RenderNavigation {
  renderNavigation(navigationIdOrSlug: "navigation", type: TREE, menuOnly: false) {
    title
    
    items {
      title
      
      items {
        title
        
        items {
          title
         
        }
      }
    }
  }
}
`