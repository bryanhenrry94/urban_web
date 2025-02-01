"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumbs,
  Typography,
  Box,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NextLink from "next/link";
import { useAppStore } from "@/store";

function DynamicBreadcrumbs() {
  const [state] = useAppStore();
  const pathname = usePathname();

  // Divide la ruta actual en segmentos
  const pathnames = pathname.split("/").filter((x) => x);

  // Obtener el nombre de la página actual (último segmento)
  const pageName =
    pathnames.length > 0 ? pathnames[pathnames.length - 1] : "Home";

  if (state.formLayout) {
    return <></>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 2, boxShadow: "none" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Nombre de la página */}
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
        </Typography>

        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink
            component={NextLink}
            color="info"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {/* Home */}
          </MuiLink>

          {pathnames.map((value, index) => {
            const href = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Typography key={href} color="text.primary">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Typography>
            ) : (
              <MuiLink
                component={NextLink}
                key={href}
                color="info"
                href={href}
                sx={{ textDecoration: "none" }}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </MuiLink>
            );
          })}
        </Breadcrumbs>
      </Box>
    </Paper>
  );
}

export default DynamicBreadcrumbs;
