import * as React from "react";
import { green, grey } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Drawer, ListSubheader } from "@mui/material";
import { JourneyDisplay } from "./JourneyDisplay";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function JourneyDialog({ open, setOpen, transcations }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [selectedID, setSelectedID] = useState("");
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", bgcolor: green[600] }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Existing Sessions
            </Typography>
          </Toolbar>
        </AppBar>
        <SessionHolder
          children={
            <IdList transcations={transcations} setSelectedID={setSelectedID} />
          }
        />
        <JourneyDisplay selectedID={selectedID} />
      </Dialog>
    </React.Fragment>
  );
}

function SessionHolder({ children }) {
  return (
    <Drawer
      anchor="left"
      //   onClose={onClose}
      open={true}
      PaperProps={{
        sx: {
          backgroundColor: grey[900],
          color: "common.white",
          width: 280,
          marginTop: 8,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="permanent"
    >
      {children}
    </Drawer>
  );
}

function IdList({ transcations, setSelectedID }) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <List component="nav" aria-label="main mailbox folders">
      <ListSubheader>
        <ListItemText primary={"Transaction Ids"} />
      </ListSubheader>
      {Object.entries(transcations).map((data, i) => {
        const [key, value] = data;
        const transactionId = value.substring(3);
        if (value.startsWith("jm_"))
          return (
            <ListItemButton
              selected={selectedIndex === i}
              sx={{
                "&:hover": { backgroundColor: grey[600] },
                "&.Mui-selected": { backgroundColor: grey[700] },
                "&.Mui-selected:hover": { backgroundColor: grey[700] },
              }}
              onClick={(event) => {
                handleListItemClick(event, i);
                setSelectedID(transactionId);
              }}
            >
              <ListItemText primary={transactionId} />
            </ListItemButton>
          );
      })}
    </List>
  );
}
