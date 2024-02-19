import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { SendButton } from "../../styled/requestExecuter.style";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "90%",
  overflow: "Scroll",
  overflowX: "Scroll",
  bgcolor: "#e6e6e6",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ open, setOpen, data }) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data.json, null, 2));
    toast.success("Payload copied!");
  };

  const handleClose = () => setOpen(false);
  //{ open, setOpen, data }
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h4" component="h2">
              {data.title}
              <SendButton style={{ marginLeft: "10px" }} onClick={handleCopy}>
                Copy Json
              </SendButton>
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              variant="h5"
            >
              <code style={{ overflow: "auto" }}>
                <pre>{data.info}</pre>
              </code>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
