"use client";

import { useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

export default function LayoutAdmin({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="rgba(0, 0, 0, 0.2)"
        position="fixed"
        top={0}
        left={0}
        width="100%"
        zIndex={50}
        p={2}
      >
        <div className="loader" />
        <Box component="p" fontSize="1.125rem" mt={2}>
          Validando Accesos
        </Box>
      </Box>
    );
  }

  return status === "authenticated" && <Box>{children}</Box>;
}
