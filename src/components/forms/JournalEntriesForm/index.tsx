import React, { FC, use, useEffect } from "react";
// mui material
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// react-hook-form
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { JournalEntriesSchema } from "@/validations";
import {
  CostCenters,
  IJournalEntriesForm,
  JournalEntriesFormProps,
  LedgerAccount,
} from "@/types";
import {
  MdOutlineAddCircle,
  MdOutlineRemoveCircle,
  MdOutlineSearch,
} from "react-icons/md";

import { useAccountApi } from "@/hooks/useAccountApi";
import { useCostCentersApi } from "@/hooks/useCostCentersApi";
import { useJournalEntriesApi } from "@/hooks/useJournalEntriesApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const JournalEntriesForm: FC<JournalEntriesFormProps> = ({ id }) => {
  const router = useRouter();

  const [modeEdit, setModeEdit] = React.useState<boolean>(false);

  const [ledgerAccounts, setLedgerAccounts] = React.useState<LedgerAccount[]>(
    []
  );
  const [costCenters, setCostCenters] = React.useState<CostCenters[]>([]);

  const { getAllAccounts } = useAccountApi();
  const { fetchCostCenters } = useCostCentersApi();
  const {
    saveJournalEntry,
    updateJournalEntry,
    errorAxios,
    fetchFournalEntry,
  } = useJournalEntriesApi();

  useEffect(() => {
    loadCombos();
  }, []);

  useEffect(() => {
    if (id) {
      loadData(id);
      setModeEdit(true);
    } else setModeEdit(false);
  }, [id]);

  const loadData = async (id: string) => {
    try {
      const result = await fetchFournalEntry(id);

      if (result) {
        const formatedValue = { ...result, date: dayjs(result.date) };
        reset(formatedValue);
      }

      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const loadCombos = async () => {
    try {
      const accounts = await getAllAccounts();
      setLedgerAccounts(accounts);

      const costCenters = await fetchCostCenters();
      setCostCenters(costCenters);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IJournalEntriesForm>({
    resolver: yupResolver(JournalEntriesSchema),
    defaultValues: {
      reference: "",
      description: "",
      date: dayjs().toDate(), // Fecha actual por defecto
      details: [],
    },
  });

  const onSubmit = async (data: IJournalEntriesForm) => {
    try {
      const result =
        modeEdit && id
          ? await updateJournalEntry(id, data)
          : await saveJournalEntry(data);

      if (result) {
        await Swal.fire({
          title: modeEdit ? "Actualizado" : "Guardado",
          text: `Registro ${
            modeEdit ? "actualizado" : "guardado"
          } correctamente`,
          icon: "success",
          confirmButtonColor: "#14b8a6",
          confirmButtonText: "Aceptar",
        });
        router.push(
          `/management/accounting/journal-entries/${modeEdit ? id : result._id}`
        );
      } else {
        Swal.fire({
          title: "Error!",
          text: errorAxios,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#14b8a6",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: errorAxios,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#14b8a6",
      });
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const totalDebe = fields.reduce(
    (sum, item) => sum + (Number(item.debit) || 0),
    0
  );
  const totalHaber = fields.reduce(
    (sum, item) => sum + (Number(item.credit) || 0),
    0
  );

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 6, sm: 6, lg: 3 }}>
          <Controller
            name="reference"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Referencia"
                variant="outlined"
                margin="dense"
                size="small"
                error={!!errors.reference}
                helperText={errors.reference?.message?.toString()}
                disabled={modeEdit}
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 6, lg: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Seleccionar fecha"
                  format="DD/MM/YYYY"
                  value={dayjs(field.value)} // ✅ Asegurar que sea `dayjs`
                  onChange={(date) => field.onChange(date || dayjs())} // ✅ Manejo seguro de `null`
                  slotProps={{ textField: { size: "small", margin: "dense" } }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, lg: 6 }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Glosa"
                variant="outlined"
                margin="dense"
                fullWidth
                size="small"
                error={!!errors.description}
                helperText={errors.description?.message?.toString()}
                multiline
              />
            )}
          />
        </Grid2>
      </Grid2>
      <Divider sx={{ m: 2 }} />
      <Box
        sx={{
          mt: 2,
          overflow: "auto",
          maxWidth: { xs: 350, md: "100%" },
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    width: { xs: 100, sm: 200, md: 200, lg: 500 },
                  }}
                >
                  Cuenta
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold" }}
                  width={150}
                >
                  Debe
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold" }}
                  width={150}
                >
                  Haber
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Centro Costo
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Accion
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Controller
                      name={`details.${index}.ledgerAccount`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          margin="dense"
                          fullWidth
                          size="small"
                          select
                          error={!!errors.details?.[index]?.ledgerAccount}
                          helperText={errors.details?.[
                            index
                          ]?.ledgerAccount?.message?.toString()}
                        >
                          <MenuItem value={""}>Vacio</MenuItem>
                          {ledgerAccounts.map((account) => (
                            <MenuItem key={account._id} value={account._id}>
                              {account.code} - {account.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                    <IconButton>
                      <MdOutlineSearch />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <Controller
                      name={`details.${index}.debit`}
                      control={control}
                      render={({ field }) => (
                        <OutlinedInput
                          {...field}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          size="small"
                          type="number"
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Controller
                      name={`details.${index}.credit`}
                      control={control}
                      render={({ field }) => (
                        <OutlinedInput
                          {...field}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          size="small"
                          type="number"
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`details.${index}.costCenter`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          margin="dense"
                          fullWidth
                          size="small"
                          select
                          error={!!errors.details?.[index]?.costCenter}
                          helperText={errors.details?.[
                            index
                          ]?.costCenter?.message?.toString()}
                        >
                          <MenuItem value={""}>Vacio</MenuItem>
                          {costCenters.map((costCenter) => (
                            <MenuItem
                              key={costCenter._id}
                              value={costCenter._id}
                            >
                              {costCenter.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => remove(index)} color="error">
                      <MdOutlineRemoveCircle />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Totales
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  ${totalDebe.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  ${totalHaber.toFixed(2)}
                </TableCell>
                <TableCell colSpan={3}></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Button
            type="button"
            variant="text"
            color="secondary"
            onClick={() =>
              append({
                ledgerAccount: "",
                debit: 0,
                credit: 0,
                costCenter: "",
              })
            }
            sx={{ textTransform: "none" }}
            startIcon={<MdOutlineAddCircle />}
          >
            Agregar Detalle
          </Button>
        </TableContainer>
      </Box>

      <Box display="flex" justifyContent="left" mt={2}>
        <Button type="submit" variant="contained" color="primary">
          {modeEdit ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Box>
  );
};

export default JournalEntriesForm;
