import { FunctionComponent, PropsWithChildren } from "react";

const TITLE_PUBLIC = "Unauthorized - Urbano Acceso"; 

const PublicLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const title = TITLE_PUBLIC;
  document.title = title;

  return (
    <>{children}</>
  )
};

export default PublicLayout;
