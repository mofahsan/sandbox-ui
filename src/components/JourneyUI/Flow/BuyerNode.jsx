import React, { useState } from "react";
import { Handle } from "reactflow";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import RequestExecuter from "../../requestExecuter";

export default function BuyerNode({ id, data }) {
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
    data.getSession();
    // data.getSession();
  };
  return (
    <div className="UpperDiv">
      <div className="NodeName">BuyerNode</div>
      <label className="NodeLabel">
        <div className="NodeP1">bap_id</div>
        <div className="NodeP2">{data?.bap_id}</div>
      </label>
      {/* <hr className="NodeHr" /> */}
      {GetCurrentStep(data.protocolCalls) === data.config && (
        <Button
          onClick={() => setOpenModal(true)}
          variant="outlined"
          size="small"
          sx={{ width: "100%" }}
        >
          Send {data.config}
        </Button>
      )}
      <Handle className="handle" type="source" position="bottom" />
      <Handle className="handle" type="target" position="top" />
      <TransitionsModal
        open={openModal}
        setOpen={setOpenModal}
        data={{
          title: data.config,
          transactionId: data.transactionId,
          handleClose: handleClose,
        }}
      />
    </div>
  );
}
function GetCurrentStep(protocolCalls) {
  for (let key in protocolCalls) {
    if (key.startsWith("on_")) continue;
    if (protocolCalls[key].executed) continue;
    else {
      return key;
    }
  }
  //   console.log(step);
  return "";
}
// data = { trasactionId: , config}
function TransitionsModal({ open, setOpen, data }) {
  const scroll = "paper";
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={data.handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="scroll-dialog-title">{data.title}</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <RequestExecuter
              transactionId={data.transactionId}
              handleBack={() => {
                setOpen(false);
              }}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
