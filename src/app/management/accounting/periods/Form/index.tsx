import React from "react";
import { Box, Modal } from "@mui/material";
import { useAccountingPeriodsContext } from "@/contexts/AccountingPeriodsContext";
import PeriodForm from "./PeriodForm";

const ModalForm = () => {
  const { setOpenModal, openModal } = useAccountingPeriodsContext();

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 1,
        }}
      >
        <PeriodForm handleCancel={handleCancel} />
      </Box>
    </Modal>
  );
};

export default ModalForm;
