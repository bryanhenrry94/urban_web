import React from "react";
import { Account, PutAccount } from "@/types/Account";
import { useAxios } from "@/hooks/useAxios";
import { IAccount } from "@/types";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

export const useAccountApi = () => {
  const [account, setAccount] = React.useState<Account | null>(null);
  const apiClient = useAxios();

  const handleError = async (error: unknown) => {
    let message = "An unknown error occurred";

    if (error instanceof AxiosError) {
      message = error.response?.data.message || "Unknown Axios error";
    } else if (error instanceof Error) {
      message = error.message;
    }

    await Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonColor: "#14b8a6",
    });
  };

  const handleAccount = (account: Account) => {
    setAccount(account);
  };

  const createAccount = async (account: PutAccount) => {
    try {
      const response = await apiClient.post(
        "/accounting/chart-accounts",
        account
      );

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  };

  const updateAccount = async (id: string, account: PutAccount) => {
    try {
      console.log("account", JSON.stringify(account));
      console.log("id", id);

      const response = await apiClient.put(
        `/accounting/chart-accounts/${id}`,
        account
      );

      if (!response.data) {
        throw new Error("Network response was not ok   ");
      }

      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  };

  const getAllAccounts = async () => {
    // return all data fetch
    try {
      const response = await apiClient.get("/accounting/chart-accounts");

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  };

  const getAllAccountsTree = async () => {
    // return all data fetch
    try {
      const response = await apiClient.get("/accounting/chart-accounts/tree");

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  };

  const uploadData = async (data: IAccount[]) => {
    try {
      const response = await apiClient.post(
        "/accounting/chart-accounts/upload",
        data
      );

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  };

  return {
    account,
    handleAccount,
    createAccount,
    updateAccount,
    getAllAccounts,
    getAllAccountsTree,
    uploadData,
  };
};
