import React, { useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useChartOfAccountsContext } from "@/contexts/ChartOfAccountsContext";
import { Save, Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { useAccountApi } from "@/hooks/useAccountApi";
import { Account } from "@/types/Account";

const FormAccount: React.FC = () => {
  const { createAccount, updateAccount } = useAccountApi();
  const {
    accounts,
    accountsTree,
    accountSelected,
    setOpenModal,
    modeEdit,
    setModeEdit,
    loadAccounts,
    loadAccountsTree,
  } = useChartOfAccountsContext();

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<Account>({
    defaultValues: {
      code: "",
      name: "",
      type: "expense",
      balance: 0,
      level: 0,
      parentAccount: "",
      children: [],
    },
  });

  useEffect(() => {
    if (modeEdit) {
      if (accountSelected) {
        console.log("accountSelected: ", accountSelected);
        reset(accountSelected);
        // setValue("code", accountSelected?.code);
        // setValue("name", accountSelected?.name);
        // setValue("type", accountSelected?.type);
      }
    } else {
      setValue("parentAccount", accountSelected?._id || "");
    }
  }, [modeEdit]);

  const onSubmit: SubmitHandler<Account> = async (data) => {
    try {
      if (accountSelected == null) return;

      if (modeEdit) {
        const account = {
          code: accountSelected?.code,
          name: data.name,
          type: data.type,
          balance: accountSelected?.balance,
          level: accountSelected?.level,
          parentAccount: data.parentAccount,
          children: [],
        };

        const response = await updateAccount(accountSelected?._id, account);

        if (response) {
          loadAccounts();
          loadAccountsTree();
          setOpenModal(false);
          setModeEdit(false);
        }
      } else {
        const newAccount = {
          code: data.code,
          name: data.name,
          type: data.type,
          balance: 0,
          level: accountSelected ? accountSelected?.level + 1 : 1,
          parentAccount: data.parentAccount,
          children: [],
        };

        const response = await createAccount(newAccount);

        // if (response && response.ok) {
        if (response) {
          loadAccounts();
          loadAccountsTree();
          setOpenModal(false);
          setModeEdit(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const accountTypes = ["asset", "liability", "equity", "income", "expense"];

  return (
    <Box
      component="form"
      sx={{
        padding: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        borderRadius: 1,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        {modeEdit ? "Modificar Cuenta" : "Agregar Cuenta"}
      </Typography>
      <Controller
        name={"parentAccount"}
        control={control}
        render={({ field }) => (
          <Autocomplete
            disablePortal
            options={accounts || []}
            getOptionLabel={(option) => `${option?.code} ${option?.name}`}
            renderInput={(params) => (
              <TextField {...params} label="Cuenta Padre" />
            )}
            size="small"
            fullWidth
            onChange={(_, value) => field.onChange(value?._id || "")}
            value={
              accounts?.find((account) => account?._id === field.value) || null
            }
            disabled
          />
        )}
      />
      <Controller
        name={"code"}
        control={control}
        render={({ field }) => (
          <TextField
            id="code"
            {...field}
            label="Código"
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Código"
            disabled={modeEdit}
            error={errors.code ? true : false}
            helperText={errors.code ? "Campo requerido" : ""}
          />
        )}
      />
      <Controller
        name={"name"}
        control={control}
        render={({ field }) => (
          <TextField
            id="name"
            {...field}
            label="Cuenta"
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Nombre de la cuenta"
            error={errors.name ? true : false}
            helperText={errors.name ? "Campo requerido" : ""}
          />
        )}
      />
      <Controller
        name={"type"}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            disablePortal
            options={accountTypes || []}
            // getOptionLabel={(option) => option?._id}
            renderInput={(params) => (
              <TextField {...params} label="Tipo Cuenta" />
            )}
            size="small"
            fullWidth
            onChange={(_, value) => field.onChange(value)}
            // value={
            //   accountTypes?.find((account) => account?._id === field.value) || null
            // }
          />
        )}
      />
      <Stack
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        sx={{ marginTop: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          type="submit"
        >
          Guardar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenModal(false)}
          startIcon={<Close />}
        >
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
};

export default FormAccount;
