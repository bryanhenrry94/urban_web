import { FunctionComponent, PropsWithChildren } from "react";
import TopBarAndSideBarLayout from "./TopBarAndSideBarLayout";

const TITLE_PRIVATE = "UrbanoAcceso";

const PrivateLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const title = TITLE_PRIVATE;
  document.title = title;

  return (
    <TopBarAndSideBarLayout
      title={title}
      variant="sidebarPersistentOnDesktop"
    >
      {children}
    </TopBarAndSideBarLayout>
  );
};

export default PrivateLayout;
