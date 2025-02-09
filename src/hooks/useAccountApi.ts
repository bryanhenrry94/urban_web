import React from "react";
import { Account, PutAccount } from "@/types/Account";
import { useSession } from "next-auth/react";
import { useAxios } from "@/hooks/useAxios";

export const useAccountApi = () => {
  const [account, setAccount] = React.useState<Account | null>(null);
  const { data: session } = useSession();
  const apiClient = useAxios();

  const handleAccount = (account: Account) => {
    setAccount(account);
  };

  const createAccount = async (account: PutAccount) => {
    try {
      const response = await apiClient.post(
        "/accounting/ledger-accounts",
        account
      );

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const updateAccount = async (id: string, account: PutAccount) => {
    try {
      console.log("account", JSON.stringify(account));
      console.log("id", id);

      const response = await apiClient.put(
        `/accounting/ledger-accounts/${id}`,
        account
      );

      if (!response.data) {
        throw new Error("Network response was not ok   ");
      }

      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAccounts = async () => {
    // return all data fetch
    try {
      const response = await apiClient.get("/accounting/ledger-accounts");

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const getAllAccountsTree = async () => {
    // return all data fetch
    try {
      const response = await apiClient.get("/accounting/ledger-accounts/tree");

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return {
    account,
    handleAccount,
    createAccount,
    updateAccount,
    getAllAccounts,
    getAllAccountsTree,
  };
};
