"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { LuFilter } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { useUserApi } from "@/hooks/useUserApi";
import { useRouter } from "next/navigation";

const SettingUsersPage = () => {
  const { users, fetchUsers } = useUserApi();
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
    <div>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Administración de Usuarios
      </Typography>
      <Typography variant="caption">
        Aquí puedes administrar los usuarios de la aplicación.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          mt: 2,
        }}
      >
        <Typography variant="body2" gutterBottom>
          Todos los usuarios: {users.length}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            margin="dense"
            size="small"
            sx={{ display: { xs: "none", sm: "block" } }}
            value={search}
            onChange={handleSearchChange}
          />
          <Button
            variant="outlined"
            size="small"
            sx={{ textTransform: "none" }}
            startIcon={<LuFilter />}
          >
            Filtro
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "none" }}
            startIcon={<LuPlus />}
            onClick={() => router.push("/settings/users/add")}
          >
            Usuario
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SettingUsersPage;
