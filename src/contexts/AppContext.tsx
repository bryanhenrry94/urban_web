import React, { createContext, useMemo, useState, ReactNode } from "react";

export const AppContext = createContext<{
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: () => void;
}>({
  expanded: false,
  setExpanded: () => {},
  openDrawer: false,
  setOpenDrawer: () => {},
  toggleDrawer: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
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
