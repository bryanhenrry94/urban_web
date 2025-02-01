import { useCallback } from 'react';
import { useAppStore } from '../store';

/**
 * Returns event handler to toggle Dark/Light modes
 * @returns {function} calling this event toggles dark/light mode
 */
export function useEventSwitchDarkMode() {
  const [state, dispatch] = useAppStore();

  return useCallback((newMode: boolean) => {
    dispatch({
      type: 'DARK_MODE',
      payload: newMode,
    });
  }, [state, dispatch]);
}


export function useEventSwitchRTLMode() {
  const [state, dispatch] = useAppStore();

  return useCallback((newMode: boolean) => {
    dispatch({
      type: 'TRL_MODE',
      payload: newMode,
    });
  }, [state, dispatch]);
}

export function useEventSwitchSidebarExpanded() {
  const [state, dispatch] = useAppStore();

  return useCallback((newMode: boolean) => {
    dispatch({
      type: 'SIDEBAR_MODE',
      payload: newMode,
    });
  }, [state, dispatch]);
}


export function useEventSwitchThemeWidth() {
  const [state, dispatch] = useAppStore();

  return useCallback((newMode: boolean) => {
    dispatch({
      type: 'THEME_WIDTH',
      payload: newMode,
    });
  }, [state, dispatch]);
}


export function useFormLayout() {
  const [state, dispatch] = useAppStore();

  return useCallback((newMode: boolean) => {
    dispatch({
      type: 'FORM_LAYOUT',
      payload: newMode,
    });
  }, [state, dispatch]);
}

