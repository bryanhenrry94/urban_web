"use client";
import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";
import { useRouter } from "next/navigation";

/**
 * Returns the current Layout component depending on different circumstances.
 * @layout CurrentLayout
 */
const CurrentLayout: FunctionComponent<PropsWithChildren> = (props) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const router = useRouter();

  useEffect(() => {
    console.log("CurrentLayout: ", session?.user);

    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return isAuthenticated ? (
    <PrivateLayout {...props} />
  ) : (
    <PublicLayout {...props} />
  );
};

export default CurrentLayout;
