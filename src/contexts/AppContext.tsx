import React, { createContext, useMemo, useState } from "react";

export const AppContext = createContext({
  expanded: false,
  setExpanded: () => {},
  openDrawer: false,
  setOpenDrawer: () => {},
  toggleDrawer: () => {},
});

export const AppProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          expanded,
          setExpanded,
          openDrawer,
          setOpenDrawer,
          toggleDrawer,
        }),
        [expanded, openDrawer]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};
