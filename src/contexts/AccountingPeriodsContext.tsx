"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useSession } from "next-auth/react";
import {
  AccountingPeriodContextProps,
  IAccountingPeriod,
  IAccountingPeriodAPI,
} from "@/types";
import { useAccountingPeriodsApi } from "@/hooks/useAccountingPeriodsApi";
import Swal from "sweetalert2";

const AccountingPeriodContext = createContext<
  AccountingPeriodContextProps | undefined
>(undefined);

export const AccountingPeriodProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { status } = useSession();

  const { createPeriod, updatePeriod, getPeriods, getPeriod, deletePeriod } =
    useAccountingPeriodsApi();

  const [rows, setRows] = useState<IAccountingPeriodAPI[] | null>(null);
  const [search, setSearch] = React.useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modeEdit, setModeEdit] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [rowSelected, setRowSelected] = useState<IAccountingPeriodAPI | null>(
    null
  );

  useEffect(() => {
    if (status == "authenticated") {
      loadData();
    }
  }, [status]);

  useEffect(() => {
    handleFilter();
  }, [search]);

  const handleFilter = () => {
    const filteredRows = rows?.filter((row) =>
      row?.name?.toLowerCase().includes(search.toLowerCase())
    );

    setRows(filteredRows || []);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getPeriods();
      setRows(data);
    } catch (error) {
      console.error("Error fetching chart of costCenters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: IAccountingPeriod) => {
    try {
      const result = modeEdit
        ? await updatePeriod(rowSelected?._id as string, data)
        : await createPeriod(data);

      if (!result) {
        throw new Error("Error al guardar el periodo contable");
      }

      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: `Periodo ${modeEdit ? "editado" : "registrado"} correctamente`,
        confirmButtonColor: "#14b8a6",
      });

      loadData();
      setOpenModal(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (error as Error).message,
      });
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        // Realiza la solicitud de autenticación a tu API
        await deletePeriod(rowSelected?._id as string);

        await Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "Periodo eliminado correctamente",
          confirmButtonColor: "#14b8a6",
        });

        loadData();
        setOpenModal(false);
      } catch (error) {
        Swal.fire("Error", (error as Error).message, "error");
      }
    }
  };

  const contextValue = useMemo(
    () => ({
      rows,
      isLoading,
      openModal,
      modeEdit,
      rowSelected,
      search,
      setSearch,
      handleSave,
      handleDelete,
      setOpenModal,
      setModeEdit,
      setRowSelected,
      loadData,
    }),
    [rows, isLoading, openModal, modeEdit, rowSelected, search]
  );

  return (
    <AccountingPeriodContext.Provider value={contextValue}>
      {children}
    </AccountingPeriodContext.Provider>
  );
};

export const useAccountingPeriodsContext = () => {
  const context = useContext(AccountingPeriodContext);
  if (!context) {
    throw new Error(
      "useAccountingPeriodsContext must be used within an AccountingPeriodProvider"
    );
  }
  return context;
};
