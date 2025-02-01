import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const DashboardPage = () => {
  return (
    // <h1>Hola Mundo</h1>
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        {/* <Breadcrumbs aria-label="breadcrumb">
          <Link href="/secure/dashboard">Dashboard</Link>
        </Breadcrumbs> */}
      </Box>
    </Paper>
  );
};

export default DashboardPage;
