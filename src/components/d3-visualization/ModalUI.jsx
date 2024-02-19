import * as React from "react";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function TransitionsModal({ open, setOpen, data }) {
  const scroll = "paper";
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data.json, null, 2));
    toast.success("Payload copied!");
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="xl"
      >
        <DialogTitle id="scroll-dialog-title">{data.title}</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <code>
              <pre style={{ overflow: "visible", fontSize: "18px" }}>
                {JSON.stringify(data.json, null, "\t")}
              </pre>
            </code>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleCopy}>Copy</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
