"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Container,
  Breadcrumbs,
  IconButton,
} from "@mui/material";
import { LuFilter } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlinePrint } from "react-icons/md";
import { MdOutlineDownload } from "react-icons/md";
import { useUserApi } from "@/hooks/useUserApi";
import { useRouter } from "next/navigation";
import Table from "./Table";

const SettingUsersPage = () => {
  const { users, fetchUsers, forgotPassword } = useUserApi();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetchUsers();
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 1,
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <IconButton color="primary">
            <MdOutlineHome size={20} />
          </IconButton>
          {/* <Link
            color="inherit"
            href="/material-ui/getting-started/installation/"
            style={{ textDecoration: "none" }}
          >
            Configuración
          </Link> */}
          <Typography sx={{ color: "text.primary" }}>Usuarios</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Buscar"
            onChange={handleSearchChange}
            size="small"
          />
          <Box>
            <IconButton>
              <MdOutlineDownload />
            </IconButton>
            <IconButton>
              <MdOutlinePrint />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => router.push("/settings/users/create")}
            >
              <LuPlus />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            overflow: "auto",
            maxWidth: { xs: 350, md: "100%" },
          }}
        >
          <Table rows={filteredUsers} />
        </Box>
      </Box>
    </Container>
  );
};

export default SettingUsersPage;
