import { Box } from "@mui/material";
import React, { useState } from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { login } from "../../firebase/firebase";
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "rgb(24, 71, 72)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0,0,0,.25)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0,0,0,.75)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(10, 50, 50)",
    },
  },
  width: "75%",
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      navigate("/todo", {
        replace: true,
      });
    }
  };
  return (
    <Box component="form" onSubmit={handleLogin}>
      <FormGroup
        id="loginForm"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 7.5,
          alignItems: "center",
          mt: 7.5,
        }}
      >
        <CssTextField
          label="Mail"
          variant="outlined"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
        />
        <CssTextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "15rem",
              borderRadius: "2rem",
              fontSize: "1.2rem",
              background: "rgb(24, 71, 72)",
              boxShadow: "0px 20px 25px rgba(0, 0, 0,.3)",
              transition: "all .5s ease-in-out",
              "&:hover": {
                background: "rgb(10, 50, 50)",
              },
            }}
            // onClick={(e) => handleLogin(e)}
          >
            Login
          </Button>
        </Box>
      </FormGroup>
    </Box>
  );
}

export default Login;
