import React from "react";
import { Grid } from "@mui/material";
import TodoList from "./TodoList";
import TodoLayout from "./TodoLayout";
import { Toaster } from "react-hot-toast";

function Todo() {
  return (
    <Grid
      sx={{
        width: "100vw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgb(10, 50, 50)",
        gap: 5,
      }}
    >
      <Toaster />
      <TodoLayout></TodoLayout>
      <TodoList></TodoList>
    </Grid>
  );
}

export default Todo;
