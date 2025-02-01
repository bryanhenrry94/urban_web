import { Reducer } from "react";
import { localStorageGet } from "../utils/localStorage";
import { AppStoreState } from "./config";

/**
 * Reducer for global AppStore using "Redux styled" actions
 * @function AppReducer
 * @param {object} state - current/default state
 * @param {string} action.type - unique name of the action
 * @param {string} action.action - alternate to action.type property, unique name of the action
 * @param {*} [action.payload] - optional data object or the function to get data object
 */
const AppReducer: Reducer<AppStoreState, any> = (state, action) => {
  // console.log('AppReducer() - action:', action);
  switch (action.type || action.action) {
    case "CURRENT_USER":
      return {
        ...state,
        currentUser: action?.currentUser || action?.payload,
      };
    case "SIGN_UP":
    case "LOG_IN":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        isAuthenticated: false,
        currentUser: undefined, // Also reset previous user data
      };
    case "DARK_MODE": {
      const darkMode = action?.darkMode ?? action?.payload;
      setNewSettingValue("darkMode", darkMode);

      return {
        ...state,
        darkMode,
      };
    }
    case "TRL_MODE": {
      const TRLMode = action?.TRLMode ?? action?.payload;
      setNewSettingValue("TRLMode", TRLMode);
      return {
        ...state,
        TRLMode,
      };
    }
    case "SIDEBAR_MODE": {
      const SidebarExpanded = action?.SidebarExpanded ?? action?.payload;
      setNewSettingValue("SidebarExpanded", SidebarExpanded);
      return {
        ...state,
        SidebarExpanded,
      };
    }
    case "THEME_WIDTH": {
      const ThemeFullWidth = action?.ThemeFullWidth ?? action?.payload;
      setNewSettingValue("ThemeFullWidth", ThemeFullWidth);
      return {
        ...state,
        ThemeFullWidth,
      };
    }
    case "FORM_LAYOUT": {
      const formLayout = action?.formLayout ?? action?.payload;
      return {
        ...state,
        formLayout,
      };
    }

    default:
      return state;
  }
};

export default AppReducer;

const setNewSettingValue = (field: string, value: string) => {
  const currentSettings = localStorageGet("Settings");
  // Actualizar el estado con el nuevo valor de darkMode
  const updatedSettings = {
    ...currentSettings,
    [field]: value,
  };
  localStorage.setItem("Settings", JSON.stringify(updatedSettings));
};
