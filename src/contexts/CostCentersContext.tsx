"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  CostCentersContextProps,
  ICostCenters,
  ICostCentersAPI,
} from "@/types";
import { useSession } from "next-auth/react";
import { useCostCentersApi } from "@/hooks/useCostCentersApi";
import Swal from "sweetalert2";

const CostCentersContext = createContext<CostCentersContextProps | undefined>(
  undefined
);

export const CostCentersProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { status } = useSession();

  const {
    fetchCostCenters,
    saveCostCenter,
    updateCostCenter,
    deleteCostCenter,
  } = useCostCentersApi();

  const [rows, setRows] = useState<ICostCentersAPI[] | null>(null);
  const [search, setSearch] = React.useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modeEdit, setModeEdit] = useState<boolean>(false);
  const [costCenters, setCostCenters] = useState<ICostCentersAPI[] | null>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [costCenterSelected, setCostCenterSelected] =
    useState<ICostCentersAPI | null>(null);

  useEffect(() => {
    if (status == "authenticated") {
      loadCostCenters();
    }
  }, [status]);

  useEffect(() => {
    handleFilter();
  }, [search]);

  const handleFilter = () => {
    if (search) {
      const filteredRows = costCenters?.filter((costCenter) =>
        costCenter?.name?.toLowerCase().includes(search.toLowerCase())
      );
      setRows(filteredRows || []);
    }
  };

  const loadCostCenters = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCostCenters();
      setCostCenters(data);
      setRows(data);
    } catch (error) {
      console.error("Error fetching chart of costCenters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: ICostCenters) => {
    try {
      const result = modeEdit
        ? await updateCostCenter(costCenterSelected?._id as string, data)
        : await saveCostCenter(data);

      if (result) {
        setOpenModal(false);

        await Swal.fire({
          title: "Guardado",
          text: `Centro de costo ${
            modeEdit ? "actualizado" : "guardado"
          } correctamente`,
          icon: "success",
          confirmButtonColor: "#14b8a6",
        });
      }
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    });

    if (result.isConfirmed) {
      try {
        // Realiza la solicitud de autenticación a tu API
        const data = await deleteCostCenter(costCenterSelected?._id as string);

        if (data) {
          await Swal.fire({
            title: "Eliminado",
            text: `Centro de costo eliminado correctamente`,
            icon: "success",
            confirmButtonColor: "#14b8a6",
          });
          await loadCostCenters();
          setOpenModal(false);
        }
      } catch (error) {
        Swal.fire("Error", (error as Error).message, "error");
      }
    }
  };

  const handleEdit = async () => {
    try {
      setModeEdit(true);
      setOpenModal(true);
    } catch (error) {
      console.error("Error    fetching    chart    of    costCenters:", error);
    }
  };

  const contextValue = useMemo(
    () => ({
      rows,
      isLoading,
      costCenters,
      openModal,
      modeEdit,
      costCenterSelected,
      search,
      setRows,
      setOpenModal,
      setCostCenterSelected,
      loadCostCenters,
      setModeEdit,
      handleFilter,
      handleSave,
      handleDelete,
      handleEdit,
      setSearch,
    }),
    [
      rows,
      isLoading,
      costCenters,
      openModal,
      modeEdit,
      costCenterSelected,
      search,
    ]
  );

  return (
    <CostCentersContext.Provider value={contextValue}>
      {children}
    </CostCentersContext.Provider>
  );
};

export const useChartOfAccountsContext = () => {
  const context = useContext(CostCentersContext);
  if (!context) {
    throw new Error(
      "useChartOfAccountsContext must be used within an CostCentersProvider"
    );
  }
  return context;
};
