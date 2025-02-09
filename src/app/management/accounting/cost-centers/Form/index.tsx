import { Box, Modal } from "@mui/material";
import React from "react";
import FormCostCenter from "./FormCostCenter";
import { useChartOfAccountsContext } from "@/contexts/CostCentersContext";

const ModalForm = () => {
  const { setOpenModal, openModal } = useChartOfAccountsContext();

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
        <FormCostCenter handleCancel={handleCancel} />
      </Box>
    </Modal>
  );
};

export default ModalForm;
