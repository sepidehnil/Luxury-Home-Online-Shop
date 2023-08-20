import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "antd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, onClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="font-secondary"
          >
            ایا مطمئن به حذف این کالا هستید؟
          </Typography>
          <div className="text-center">
            <Button className="font-secondary">بله</Button>
            <Button className="font-secondary">خیر</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
