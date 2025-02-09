"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

import { CostCenters } from "@/types/costCenters";
import { useSession } from "next-auth/react";
import { useCostCentersApi } from "@/hooks/useCostCentersApi";
import Swal from "sweetalert2";

type CostCentersType = {
  rows: CostCenters[] | null;
  isLoading: boolean;
  modeEdit: boolean;
  costCenters: CostCenters[] | null;
  openModal: boolean;
  costCenterSelected: CostCenters | null;
  search: string;
  setModeEdit: React.Dispatch<React.SetStateAction<boolean>>;
  loadCostCenters: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRows: React.Dispatch<React.SetStateAction<CostCenters[] | null>>;
  setCostCenterSelected: React.Dispatch<
    React.SetStateAction<CostCenters | null>
  >;
  handleFilter: (search: string) => void;
  handleSave: (data: CostCenters) => void;
  handleDelete: () => void;
  handleEdit: () => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const CostCentersContext = createContext<CostCentersType | undefined>(
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

  const [rows, setRows] = useState<CostCenters[] | null>(null);
  const [search, setSearch] = React.useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modeEdit, setModeEdit] = useState<boolean>(false);
  const [costCenters, setCostCenters] = useState<CostCenters[] | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [costCenterSelected, setCostCenterSelected] =
    useState<CostCenters | null>(null);

  useEffect(() => {
    if (status == "authenticated") {
      loadCostCenters();
    }
  }, [status]);

  useEffect(() => {
    handleFilter();
  }, [search]);

  const handleFilter = () => {
    const filteredRows = costCenters?.filter(
      (costCenter) =>
        costCenter?.name?.toLowerCase().includes(search.toLowerCase()) ||
        costCenter?.description?.toLowerCase().includes(search.toLowerCase())
    );

    setRows(filteredRows || []);
  };

  const loadCostCenters = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCostCenters();
      setCostCenters(data);

      handleFilter();
    } catch (error) {
      console.error("Error fetching chart of costCenters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: CostCenters) => {
    try {
      if (modeEdit) {
        console.log(
          "costCenterSelected?._id as string",
          costCenterSelected?._id as string
        );
        console.log("data", data);

        await updateCostCenter(costCenterSelected?._id as string, data);
      } else {
        await saveCostCenter(data);
      }
      Swal.fire(
        "Guardado",
        "Centro de costo ha sido guardado correctamente",
        "success"
      );
      loadCostCenters();
      setOpenModal(false);
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
        await deleteCostCenter(costCenterSelected?._id as string);
        Swal.fire(
          "Eliminado!",
          "Centro de costo ha sido eliminada.",
          "success"
        );
        loadCostCenters();
        setOpenModal(false);
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
