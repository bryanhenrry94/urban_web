"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import Swal from "sweetalert2";

import { useSession } from "next-auth/react";
import { IJournalEntries, IJournalEntriesForm } from "@/types";
import { useJournalEntriesApi } from "@/hooks/useJournalEntriesApi";

type CostCentersType = {
  rows: IJournalEntries[] | null;
  isLoading: boolean;
  modeEdit: boolean;
  journalEntries: IJournalEntries[] | null;
  openModal: boolean;
  rowSelected: IJournalEntries | null;
  search: string;
  setModeEdit: React.Dispatch<React.SetStateAction<boolean>>;
  loadJournalEntries: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRows: React.Dispatch<React.SetStateAction<IJournalEntries[] | null>>;
  setRowSelected: React.Dispatch<React.SetStateAction<IJournalEntries | null>>;
  handleFilter: (search: string) => void;
  handleSave: (data: IJournalEntriesForm) => void;
  handleDelete: () => void;
  handleEdit: () => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const JournalEntriesContext = createContext<CostCentersType | undefined>(
  undefined
);

export const JournalEntriesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { status } = useSession();

  const {
    fetchJournalEntries,
    saveJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
  } = useJournalEntriesApi();

  const [rows, setRows] = useState<IJournalEntries[] | null>(null);
  const [search, setSearch] = React.useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modeEdit, setModeEdit] = useState<boolean>(false);
  const [journalEntries, setJournalEntries] = useState<
    IJournalEntries[] | null
  >(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [rowSelected, setRowSelected] = useState<IJournalEntries | null>(null);

  useEffect(() => {
    if (status == "authenticated") {
      loadJournalEntries();
    }
  }, [status]);

  useEffect(() => {
    handleFilter();
  }, [search]);

  const handleFilter = () => {
    const filteredRows = journalEntries?.filter((costCenter) =>
      costCenter?.description?.toLowerCase().includes(search.toLowerCase())
    );

    setRows(filteredRows || []);
  };

  const loadJournalEntries = async () => {
    setIsLoading(true);
    try {
      const data = await fetchJournalEntries();
      setJournalEntries(data);
      handleFilter();
      setOpenModal(false);
    } catch (error) {
      console.error("Error fetching chart of journalEntries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: IJournalEntriesForm) => {
    try {
      if (modeEdit) {
        console.log("rowSelected?._id as string", rowSelected?._id as string);
        console.log("data", data);

        await updateJournalEntry(rowSelected?._id as string, data);
      } else {
        await saveJournalEntry(data);
      }

      await Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Asiento contable ha sido guardado correctamente",
        confirmButtonColor: "#14b8a6",
      });

      await loadJournalEntries();
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
        const data = await deleteJournalEntry(rowSelected?._id as string);

        if (data) {
          await Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: "Periodo eliminado correctamente",
            confirmButtonColor: "#14b8a6",
          });
          await loadJournalEntries();
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
      console.error(
        "Error    fetching    chart    of    journalEntries:",
        error
      );
    }
  };

  const contextValue = useMemo(
    () => ({
      rows,
      isLoading,
      journalEntries,
      openModal,
      modeEdit,
      rowSelected,
      search,
      setRows,
      setOpenModal,
      setRowSelected,
      loadJournalEntries,
      setModeEdit,
      handleFilter,
      handleSave,
      handleDelete,
      handleEdit,
      setSearch,
    }),
    [rows, isLoading, journalEntries, openModal, modeEdit, rowSelected, search]
  );

  return (
    <JournalEntriesContext.Provider value={contextValue}>
      {children}
    </JournalEntriesContext.Provider>
  );
};

export const useJournalEntriesContext = () => {
  const context = useContext(JournalEntriesContext);
  if (!context) {
    throw new Error(
      "useJournalEntriesContext must be used within an JournalEntriesProvider"
    );
  }
  return context;
};
