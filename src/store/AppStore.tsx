"use client";
import {
  createContext,
  useReducer,
  useContext,
  FunctionComponent,
  PropsWithChildren,
  Dispatch,
  ComponentType,
} from "react";
// import useMediaQuery from '@mui/material/useMediaQuery';
import AppReducer from "./AppReducer";
import { localStorageGet } from "@/utils/localStorage";
import { IS_SERVER } from "../utils/environment";
import {
  APP_STORE_INITIAL_STATE,
  AppStoreState,
  SettingStoreState,
} from "./config";

/**
 * Instance of React Context for global AppStore
 */

export type AppContextReturningType = [AppStoreState, Dispatch<any>];
const AppContext = createContext<AppContextReturningType>([
  APP_STORE_INITIAL_STATE,
  () => null,
]);

/**
 * Main global Store as HOC with React Context API
 * @component AppStoreProvider
 * import {AppStoreProvider} from './store'
 * ...
 * <AppStoreProvider>
 *  <App/>
 * </AppStoreProvider>
 */
const AppStoreProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  // const prefersDarkMode = IS_SERVER ? false : useMediaQuery('(prefers-color-scheme: dark)'); // Note: Conditional hook is bad idea :(
  const prefersDarkMode = IS_SERVER
    ? false
    : window.matchMedia("(prefers-color-scheme: light)").matches;
  //
  const currentSettings: SettingStoreState = localStorageGet(
    "Settings",
    APP_STORE_INITIAL_STATE
  );

  const previousDarkMode = IS_SERVER
    ? false
    : Boolean(currentSettings.darkMode || false);
  const previousTRLMode = IS_SERVER
    ? false
    : Boolean(currentSettings.TRLMode || false);
  const previousSidebarExpanded = IS_SERVER
    ? false
    : Boolean(currentSettings.SidebarExpanded || false);
  const previousThemeFullWidth = IS_SERVER
    ? false
    : Boolean(currentSettings.ThemeFullWidth || false);

  const initialState: AppStoreState = {
    ...APP_STORE_INITIAL_STATE,
    darkMode: previousDarkMode || prefersDarkMode,
    TRLMode: previousTRLMode || false,
    SidebarExpanded: previousSidebarExpanded || false,
    ThemeFullWidth: previousThemeFullWidth || true,
    formLayout: false,
  };
  const value: AppContextReturningType = useReducer(AppReducer, initialState);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook to use the AppStore in functional components
 * @hook useAppStore
 * import {useAppStore} from './store'
 * ...
 * const [state, dispatch] = useAppStore();
 *   OR
 * const [state] = useAppStore();
 */
const useAppStore = (): AppContextReturningType => useContext(AppContext);

/**
 * HOC to inject the ApStore to class component, also works for functional components
 * @hok withAppStore
 * import {withAppStore} from './store'
 * ...
 * class MyComponent
 *
 * render () {
 *   const [state, dispatch] = this.props.appStore;
 *   ...
 * }
 * ...
 * export default withAppStore(MyComponent)
 */
interface WithAppStoreProps {
  appStore: AppContextReturningType;
}
const withAppStore = (
  Component: ComponentType<WithAppStoreProps>
): FunctionComponent =>
  function ComponentWithAppStore(props) {
    return <Component {...props} appStore={useAppStore()} />;
  };

export { AppStoreProvider, useAppStore, withAppStore };
