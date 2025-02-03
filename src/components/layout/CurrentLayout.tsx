"use client";
import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";
import { useRouter } from "next/navigation";
import { AppLoading } from "../common";

/**
 * Returns the current Layout component depending on different circumstances.
 * @layout CurrentLayout
 */
const CurrentLayout: FunctionComponent<PropsWithChildren> = (props) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
    }
    // if (session && isAuthenticated) {
    //   router.push("/dashboard");
    // }
  }, [session, status, router]);

  if (status === "loading") return <AppLoading />;

  return isAuthenticated ? (
    <PrivateLayout {...props} />
  ) : (
    <PublicLayout {...props} />
  );
};

export default CurrentLayout;
