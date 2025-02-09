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
  journalEntrySelected: IJournalEntries | null;
  search: string;
  setModeEdit: React.Dispatch<React.SetStateAction<boolean>>;
  loadJournalEntries: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRows: React.Dispatch<React.SetStateAction<IJournalEntries[] | null>>;
  setJournalEntrySelected: React.Dispatch<
    React.SetStateAction<IJournalEntries | null>
  >;
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
  const [journalEntrySelected, setJournalEntrySelected] =
    useState<IJournalEntries | null>(null);

  useEffect(() => {
    if (status == "authenticated") {
      loadJournalEntries();
    }
  }, [status]);

  useEffect(() => {
    handleFilter();
  }, [search]);

  const handleFilter = () => {
    const filteredRows = journalEntries?.filter(
      (costCenter) =>
        costCenter?.reference.toLowerCase().includes(search.toLowerCase()) ||
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
    } catch (error) {
      console.error("Error fetching chart of journalEntries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: IJournalEntriesForm) => {
    try {
      if (modeEdit) {
        console.log(
          "journalEntrySelected?._id as string",
          journalEntrySelected?._id as string
        );
        console.log("data", data);

        await updateJournalEntry(journalEntrySelected?._id as string, data);
      } else {
        await saveJournalEntry(data);
      }
      Swal.fire(
        "Guardado",
        "Centro de costo ha sido guardado correctamente",
        "success"
      );
      loadJournalEntries();
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
        await deleteJournalEntry(journalEntrySelected?._id as string);
        Swal.fire(
          "Eliminado!",
          "Centro de costo ha sido eliminada.",
          "success"
        );
        loadJournalEntries();
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
      journalEntrySelected,
      search,
      setRows,
      setOpenModal,
      setJournalEntrySelected,
      loadJournalEntries,
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
      journalEntries,
      openModal,
      modeEdit,
      journalEntrySelected,
      search,
    ]
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
