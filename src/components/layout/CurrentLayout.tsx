"use client";
import React, { FunctionComponent, PropsWithChildren } from "react";
import { useSession } from "next-auth/react";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";

/**
 * Returns the current Layout component depending on different circumstances.
 * @layout CurrentLayout
 */
const CurrentLayout: FunctionComponent<PropsWithChildren> = (props) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return isAuthenticated ? (
    <PrivateLayout {...props} />
  ) : (
    <PublicLayout {...props} />
  );
};

export default CurrentLayout;
