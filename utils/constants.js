//React Native Navigation's three basic customizable navigators (TAB, STACK and Drawer)
//These three are forms our Routing in React Native
/*
- Tab Navigator allows us to route between Tabs
- Stack Navigator allows us to drill deeper into our route hierarchy 
  and also have little right to left transition as it loads the component pages
- Drawer Navigator allows us to have a drawer to to navigate between Component
 pages. Basicually you slide the screen to the right to see the navigation for the app
*/

/*Application Tabs */
export const HISTORY_TAB = 'History' //Route to History Component
export const ADD_ENTRY_TAB = 'AddEntry' //Route to AddEntry Component

/* Application Stacks */
export const HOME_STACK = 'Home' //Route to App Component page. You can only Route to the History and AddEntry Compnent through the Tab in this App Component
export const ENTRY_DETAILS_STACK = 'EntryDetail' //Route to EntryDetail COmponent Page

