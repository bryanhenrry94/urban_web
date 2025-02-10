"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import MenuComponent from "./Menu";
import FormAccount from "./FormAccount";

import { useChartOfAccountsContext } from "@/contexts/ChartOfAccountsContext";

import { Account } from "@/types/Account";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 1,
};

const TreeViewTable: React.FC = () => {
  const {
    accountsTree,
    setAnchorEl,
    openModal,
    setOpenModal,
    setAccountSelected,
  } = useChartOfAccountsContext();

  const handleAccountClick = (
    event: React.MouseEvent<HTMLSpanElement>,
    account: Account
  ) => {
    setAnchorEl(event.currentTarget);
    setAccountSelected(account);
  };

  const renderRow = (
    account: Account,
    openStates: { [key: string]: boolean },
    setOpenStates: React.Dispatch<
      React.SetStateAction<{ [key: string]: boolean }>
    >
  ) => {
    const isOpen = openStates[account.code] || false;

    return (
      <React.Fragment key={account.code}>
        <TableRow sx={{ height: "auto" }}>
          <TableCell sx={{ padding: "4px" }}>
            {account?.children?.length > 0 && (
              <IconButton
                onClick={() =>
                  setOpenStates((prev) => ({
                    ...prev,
                    [account.code]: !isOpen,
                  }))
                }
                size="small"
                color="primary"
              >
                {isOpen ? <FiMinus /> : <FiPlus />}
              </IconButton>
            )}
          </TableCell>
          <TableCell
            sx={{
              pl: `${account.level * 30}px`,
              pt: "4px",
              pb: "4px",
              textAlign: "left",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: account?.children?.length > 0 ? "bold" : "normal",
              }}
              onClick={(event) => handleAccountClick(event, account)}
            >{`${account.code} ${account.name}`}</Typography>
          </TableCell>
          <TableCell sx={{ textAlign: "right", padding: "4px" }}>
            {account.balance}
          </TableCell>
        </TableRow>
        {isOpen &&
          account.children.map((subAccount) =>
            renderRow(subAccount, openStates, setOpenStates)
          )}
      </React.Fragment>
    );
  };

  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

  return (
    <Box sx={{ p: 1, bgcolor: "background.default", borderRadius: 2 }}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 15 }}></TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Cuenta
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accountsTree &&
              accountsTree.map((account) =>
                renderRow(account, openStates, setOpenStates)
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <MenuComponent />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormAccount />
        </Box>
      </Modal>
    </Box>
  );
};

export default TreeViewTable;
