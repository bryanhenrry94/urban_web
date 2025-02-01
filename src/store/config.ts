/**
 * Data structure of the AppStore state
 */

export interface SettingStoreState {
  darkMode: boolean;
  TRLMode: boolean;
  SidebarExpanded: boolean;
  ThemeFullWidth: boolean;
  formLayout: boolean;
}

export interface AppStoreState extends SettingStoreState {
  isAuthenticated: boolean;
  currentUser?: object | undefined;
  // TRLMode: boolean;
}

export const APP_STORE_INITIAL_STATE: AppStoreState = {
  darkMode: false, // Overridden by useMediaQuery('(prefers-color-scheme: dark)') in AppStore
  isAuthenticated: false, // Overridden in AppStore by checking auth token
  TRLMode: false,
  SidebarExpanded: false,
  ThemeFullWidth: true,
  formLayout: false,
};
