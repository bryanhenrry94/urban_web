"use client";
import { FunctionComponent, PropsWithChildren } from "react";
import { Viewport } from "next";
import { SimplePaletteColorOptions } from "@mui/material";
import { AppStoreProvider } from "@/store";
import { SessionProvider } from "next-auth/react";
import defaultTheme, { ThemeProvider } from "@/theme";
import CurrentLayout from "@/components/layout";
import "@/styles/globals.css";

const THEME_COLOR =
  (defaultTheme.palette?.primary as SimplePaletteColorOptions)?.main ||
  "#FFFFFF";

// export const viewport: Viewport = {
//   themeColor: THEME_COLOR,
// };

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AppStoreProvider>
          <ThemeProvider>
            <SessionProvider>
              <CurrentLayout>{children}</CurrentLayout>
            </SessionProvider>
          </ThemeProvider>
        </AppStoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
