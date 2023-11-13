import React, { useEffect, useRef, useState } from "react";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../../firebase/firebase";
import { Tooltip } from "@mui/material";
import Modal from "../../components/modal/Modal";
import { modal } from "../../modal/modal";
import { toast } from "react-hot-toast";


const toastStyle = {
  style: {
    border: "1px solid rgba(250, 215, 179,1)",
    padding: "8px",
    color: "rgba(250, 215, 179,1)",
    background: "rgba(10, 50, 50,1)",
  },
  iconTheme:{
    primary: "rgba(250, 215, 179,1)",
    secondary: "rgba(10, 50, 50,1)",
  }
};

function TodoList() {
  const [animationParent] = useAutoAnimate();
  const { todos } = useSelector((state) => state.todos);
  const { open, data } = useSelector((state) => state.modal);
  const [sortedTodo, setSortedTodo] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const todoSort = () => {
    const completedTodo = todos.filter((todo) => todo.done === true);
    const incompletedTodo = todos.filter((todo) => todo.done === false);
    setSortedTodo([...incompletedTodo, ...completedTodo]);
    setCompleted(completedTodo.length);
  };

  const handleDelete = async (id, todo) => {
    await deleteTodo(id);
    toast.success(`Todo Deleted: ${todo}`, {
      style: toastStyle.style,
      iconTheme: toastStyle.iconTheme,
    });
  };
  const handleUpdate = async (todo) => {
    await updateTodo(todo.id, {
      done: !todo.done,
    });
    if (!todo.done) {
      toast.success(`Todo completed: ${todo.todo}`, {
        style: toastStyle.style,
        iconTheme: toastStyle.iconTheme,
      });
    } else {
      toast.success(`Todo incompleted: ${todo.todo}`, {
        style: toastStyle.style,
        iconTheme: toastStyle.iconTheme,
      });
    }
  };

  const loadingHandle = () => {
    if (loading) {
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };
  useEffect(() => {
    loadingHandle();
    todoSort();
  }, [todos]);
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", overflowX: "hidden" }}
      >
        {open && <Modal name={open} data={data} />}
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              mt: 4,
              mb: 2,
              textAlign: "center",
              color: "rgba(250, 215, 179,.75)",
            }}
            variant="h6"
            component="div"
          >
            Todolar
          </Typography>
          {loading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress color="success" sx={{ borderRadius: 5 }} />
            </Box>
          ) : (
            <List ref={animationParent}>
              {sortedTodo.map((todo) => (
                <ListItem
                  sx={{
                    backgroundColor: todo.done
                      ? "rgba(250, 215, 179,.1)"
                      : "rgba(250, 215, 179,.5)",
                    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
                    my: 2,
                    borderRadius: "15px",
                    border: "1px solid rgba(250, 215, 179,.5)",
                    textDecoration: todo.done ? "line-through" : "none",
                  }}
                  key={todo.id}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ background: "transparent" }}>
                      <KeyboardArrowRightIcon
                        sx={{
                          color: todo.done
                            ? "rgba(250, 215, 179,.5)"
                            : "rgba(10, 50, 50,.75)",
                        }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      color: todo.done
                        ? "rgba(250, 215, 179,.2)"
                        : "rgba(10, 50, 50,.75)",
                    }}
                    primary={todo.todo}
                  />
                  <ListItemAvatar>
                    {todo.done ? (
                      <Avatar
                        sx={{
                          boxShadow: "0px 0px 15px rgba(0,0,0,0)",
                          backgroundColor: "transparent",
                        }}
                      >
                        <Tooltip title="incomplete">
                          <Button
                            onClick={() => handleUpdate(todo)}
                            sx={{
                              color: todo.done
                                ? "rgba(250, 215, 179,.5)"
                                : "rgba(10, 50, 50,.75)",
                            }}
                          >
                            <ClearIcon />
                          </Button>
                        </Tooltip>
                      </Avatar>
                    ) : (
                      <Avatar
                        sx={{
                          boxShadow: "0px 0px 15px rgba(0,0,0,0)",
                          backgroundColor: "transparent",
                        }}
                      >
                        <Tooltip title="complete">
                          <Button
                            onClick={() => handleUpdate(todo)}
                            sx={{
                              color: todo.done
                                ? "rgba(250, 215, 179,.5)"
                                : "rgba(10, 50, 50,.75)",
                            }}
                          >
                            <CheckIcon />
                          </Button>
                        </Tooltip>
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        boxShadow: "0px 0px 15px rgba(0,0,0,0)",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Button
                        onClick={() => modal("update-todo-modal", todo)}
                        sx={{
                          color: todo.done
                            ? "rgba(250, 215, 179,.5)"
                            : "rgba(10, 50, 50,.75)",
                        }}
                      >
                        <Tooltip title="edit">
                          <EditIcon />
                        </Tooltip>
                      </Button>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        boxShadow: "0px 0px 15px rgba(0,0,0,0)",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Button
                        onClick={() => handleDelete(todo.id, todo.todo)}
                        sx={{
                          color: todo.done
                            ? "rgba(250, 215, 179,.5)"
                            : "rgba(10, 50, 50,.75)",
                        }}
                      >
                        <Tooltip title="delete">
                          <DeleteIcon />
                        </Tooltip>
                      </Button>
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
              ))}
              {todos.length === 0 && (
                <ListItem
                  sx={{
                    backgroundColor: "rgba(250, 215, 179,.5)",
                    textAlign: "center",
                  }}
                >
                  <ListItemText
                    sx={{ color: "rgba(10, 50, 50,.75)" }}
                    primary="Hiç Todo Yok"
                  />
                </ListItem>
              )}
            </List>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default TodoList;
