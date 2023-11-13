import React, { forwardRef, useState } from "react";
import modals from "./modals";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { modalClose } from "../../modal/modal";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { Paper } from "@mui/material";

const StyledModal = styled(Dialog)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: inherit;
`;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Modal({ name, data }) {
  const currentModal = modals.find((m) => m.name === name);

  const { isOpen } = useSelector((state) => state.modal);
  // const [fullWidth, setFullWidth] = useState(false);

  const handleClose = () => {
    modalClose();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth={name === "update-todo-modal" ? "sm" : "xs"}
        fullWidth
        TransitionComponent={Transition}
      >
        <Paper elevation={0} sx={{background:"rgba(10, 50, 50,0.4)",color:"rgba(250, 215, 179,1)"}}>
          <currentModal.element data={data} />
        </Paper>
      </Dialog>
    </ThemeProvider>
  );
}

export default Modal;
