import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";

import { useDispatch, useSelector } from "react-redux";
import { modal } from "../../modal/modal";
import Modal from "../../components/modal/Modal";
import { logout as logoutHandle } from "../../features/auth/authSlice";
import { logout } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function TodoLayout() {
  const { todos } = useSelector((state) => state.todos);
  const { open, data } = useSelector((state) => state.modal);
  const [completed, setCompleted] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const completedTodo = () => {
    const completedTodo = todos.filter((todo) => todo.done === true);
    setCompleted(completedTodo.length);
  };

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/", {
      replace: true,
    });
  };

  useEffect(() => {
    completedTodo();
  }, [todos]);

  return (
    <>
      {open && <Modal name={open} data={data}/>}
      <Box
        sx={{
          width: "100vw",
          height: "15dvh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Box
          sx={{
            background: "rgba(250, 215, 179,.5)",
            width: "12.5rem",
            height: "10dvh",
            borderRadius: 2.5,
            border: "1px solid rgba(250, 215, 179,.75)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography variant="p" sx={{ color: "rgb(10, 50, 50)" }}>
            Total Todo
          </Typography>
          <Typography variant="h5" sx={{ color: "rgb(10, 50, 50)" }}>
            {todos.length}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "rgba(250, 215, 179,.5)",
            width: "12.5rem",
            height: "10dvh",
            borderRadius: 2.5,
            border: "1px solid rgba(250, 215, 179,.75)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography variant="p" sx={{ color: "rgb(10, 50, 50)" }}>
            Completed Todo
          </Typography>
          <Typography variant="h5" sx={{ color: "rgb(10, 50, 50)" }}>
            {completed}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "rgba(250, 215, 179,.5)",
            width: "12.5rem",
            height: "10dvh",
            borderRadius: 2.5,
            border: "1px solid rgba(250, 215, 179,.75)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{ width: "100%", height: "100%", background: "transparent" }}
          >
            <CardActionArea
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 0.5,
              }}
              onClick={() => modal("add-todo-modal")}
            >
              <Typography variant="body1" sx={{ color: "rgb(10, 50, 50)" }}>
                Add New Todo
              </Typography>
              <AddIcon
                fontSize="large"
                sx={{ color: "rgb(10, 50, 50)" }}
              ></AddIcon>
            </CardActionArea>
          </Card>
        </Box>
        <Box
          sx={{
            background: "rgba(250, 215, 179,.5)",
            width: "12.5rem",
            height: "10dvh",
            borderRadius: 2.5,
            border: "1px solid rgba(250, 215, 179,.75)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{ width: "100%", height: "100%", background: "transparent" }}
          >
            <CardActionArea
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
              onClick={handleLogout}
            >
              <Typography variant="body1" sx={{ color: "rgb(10, 50, 50)" }}>
                Logout
              </Typography>
              <LogoutIcon
                fontSize="medium"
                sx={{ color: "rgb(10, 50, 50)" }}
              ></LogoutIcon>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default TodoLayout;
