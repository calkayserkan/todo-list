import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { isOpenFalse } from "../../features/modal/modal";
import { updateTodo } from "../../firebase/firebase";
import styled from "styled-components";

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


function TodoModal({data}) {
  const dispatch = useDispatch();
  const [todo,setTodo] = useState(data.todo)

  const handleClose = () => {
    dispatch(isOpenFalse());
  };
  const updateHandle = async ()=>{
    await updateTodo(data.id,{
      todo
    })
    dispatch(isOpenFalse());
  }
  useEffect(()=>{
  },[])
  return (
    <>
      <DialogTitle sx={{ textAlign: "center" , color:"rgba(250, 215, 179,.75)"}}>Update Todo</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{color:"rgba(250, 215, 179,.75)"}}>Current Todo: {data.todo}</DialogContentText>
        <CssTextField
          autoFocus
          margin="dense"
          id="todo"
          label="Update Todo"
          type="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}  sx={{color:"rgba(250, 215, 179,1)"}}>Close</Button>
        <Button onClick={updateHandle} sx={{color:"rgba(250, 215, 179,1)"}}>Save</Button>
      </DialogActions>
    </>
  );
}

export default TodoModal;
