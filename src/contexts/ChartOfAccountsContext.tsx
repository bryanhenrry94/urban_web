"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

import { Account } from "@/types/Account";
import { useAccountApi } from "@/hooks/useAccountApi";
import { useSession } from "next-auth/react";

type ChartOfAccountsType = {
  isLoading: boolean;
  modeEdit: boolean;
  setModeEdit: React.Dispatch<React.SetStateAction<boolean>>;
  accounts: Account[] | null;
  accountsTree: Account[] | null;
  loadAccounts: () => void;
  loadAccountsTree: () => void;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  anchorEl: HTMLElement | null;
  openMenu: boolean;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  accountSelected: Account | null;
  setAccountSelected: React.Dispatch<React.SetStateAction<Account | null>>;
};

const ChartOfAccountsContext = createContext<ChartOfAccountsType | undefined>(
  undefined
);

export const ChartOfAccountsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { status } = useSession();
  const { getAllAccounts, getAllAccountsTree } = useAccountApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modeEdit, setModeEdit] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [accountsTree, setAccountsTree] = useState<Account[] | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [accountSelected, setAccountSelected] = useState<Account | null>(null);
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    if (status == "authenticated") {
      loadAccounts();
      loadAccountsTree();
    }
  }, [status]);

  const loadAccounts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAccounts();
      console.log("data", data);
      setAccounts(data);
    } catch (error) {
      console.error("Error fetching chart of accounts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAccountsTree = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAccountsTree();
      console.log("data tree", data);

      setAccountsTree(data);
    } catch (error) {
      console.error("Error fetching chart of accounts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      isLoading,
      accounts,
      accountsTree,
      loadAccounts,
      loadAccountsTree,
      anchorEl,
      setAnchorEl,
      openMenu,
      openModal,
      setOpenModal,
      accountSelected,
      setAccountSelected,
      modeEdit,
      setModeEdit,
    }),
    [
      isLoading,
      accounts,
      accountsTree,
      anchorEl,
      openMenu,
      openModal,
      accountSelected,
      modeEdit,
    ]
  );

  return (
    <ChartOfAccountsContext.Provider value={contextValue}>
      {children}
    </ChartOfAccountsContext.Provider>
  );
};

export const useChartOfAccountsContext = () => {
  const context = useContext(ChartOfAccountsContext);
  if (!context) {
    throw new Error(
      "useChartOfAccountsContext must be used within an ChartOfAccountsProvider"
    );
  }
  return context;
};
