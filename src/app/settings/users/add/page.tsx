import UserForm from "@/components/forms/UserForm";
import { Container, Paper } from "@mui/material";
import React from "react";

const AddUserPage = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <UserForm />
      </Paper>
    </Container>
  );
};

export default AddUserPage;
