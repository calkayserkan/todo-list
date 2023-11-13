import React, { useState } from "react";
import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { isOpenFalse } from "../../features/modal/modal";
import { addTodo } from "../../firebase/firebase";
import styled from "styled-components";
import { toast } from "react-hot-toast";

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'rgba(250, 215, 179,1)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'rgba(250, 215, 179,1)',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'rgba(250, 215, 179,.1)',
  },
  '& .MuiInput-input': {
    color: 'rgba(250, 215, 179,.75)',
  },
  '& .MuiInput-input:hover': {
    color: 'rgba(250, 215, 179,1)',
  },
});

function AddTodoModal() {
  const [todo, setTodo] = useState("");
  const [done, setDone] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo({
      todo,
      uid: user.uid,
      done,
    });
    setTodo("");
    dispatch(isOpenFalse());
  };

  const handleClose = () => {
    dispatch(isOpenFalse());
  };

  return (
    <>
      <DialogTitle sx={{ textAlign: "center", color: "rgba(250, 215, 179,.75)" }}>
        Add New Todo
      </DialogTitle>
      <DialogContent>
        <CssTextField
          autoFocus
          margin="dense"
          id="todo"
          label="Write Todo"
          type="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          fullWidth
          variant="standard"
        />
        <FormControlLabel control={<Checkbox onChange={(e)=> setDone(e.target.checked)}/>} label="Completed" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "rgba(250, 215, 179,1)" }}>
          Close
        </Button>
        <Button onClick={handleSubmit} sx={{ color: "rgba(250, 215, 179,1)" }}>
          Add
        </Button>
      </DialogActions>
    </>
  );
}

export default AddTodoModal;
