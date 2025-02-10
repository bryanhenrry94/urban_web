"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { MdOutlineHome } from "react-icons/md";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

import * as XLSX from "xlsx";
import { useAccountApi } from "@/hooks/useAccountApi";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

const ChartAccountImport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);

  const { uploadData } = useAccountApi();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Se borrara la informacion existente!",
      icon: "warning",
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, subir!",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      enviarDatos();
    }
  };

  const enviarDatos = async () => {
    const response = await uploadData(data);

    if (response) {
      await Swal.fire({
        icon: "success",
        title: "Carga exitosa",
        text: "Se ha cargado el plan de cuentas correctamente",
        confirmButtonColor: "#14b8a6",
      });

      setData([]);
    }
  };

  const handleProcess = async () => {
    if (!file) {
      await Swal.fire({
        icon: "error",
        title: "Error de Carga",
        text: "Selecciona un archivo para procesar",
        confirmButtonColor: "#14b8a6",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convertir a JSON
      const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Transformar datos al formato deseado
      const formattedData = jsonData.slice(1).map((row) => ({
        code: row[0] || "", // Columna A
        name: (row[1] || "").trim(), // Columna B
        // type: row[2] || "expense", // Columna C
        type: "expense", // Columna C
        level: row[3] || 1, // Columna D
        id: row[4] || null, // Columna E
        parent: row[5] || null, // Columna F
        parent_account: null,
      }));

      setData(formattedData);
    };

    reader.readAsArrayBuffer(file);
  };

  const columns: GridColDef[] = [
    { field: "code", headerName: "Codigo" },
    { field: "name", headerName: "Nombre", width: 300 },
    { field: "type", headerName: "Tipo" },
    { field: "level", headerName: "nivel" },
    { field: "parent_account", headerName: "parent_account" },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

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
          <Link
            color="inherit"
            href="/management/accounting/chart-accounts"
            style={{ textDecoration: "none" }}
          >
            Plan de Cuentas
          </Link>
          <Typography sx={{ color: "text.primary" }}>Importar</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2 }}>
        <Box sx={{ mt: 2 }}>
          <Box>
            <Typography
              variant="h6"
              fontFamily={"monospace"}
              textAlign={"center"}
            >
              Importar Plan de Cuentas
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
                mb: 2,
              }}
            >
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
              />
              <Box>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleProcess}
                  >
                    Procesar
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleUpload}
                    disabled={data.length === 0}
                  >
                    Subir
                  </Button>
                </Stack>
              </Box>
            </Box>
            <Box
              sx={{
                height: 400,
                width: "100%",
                overflow: "auto",
              }}
            >
              <DataGrid
                rows={data || []}
                columns={columns}
                getRowId={(row) => row.code} // Usa una propiedad única existente
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ChartAccountImport;
