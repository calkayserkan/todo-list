import { Box } from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { switchLogin } from "../../features/landing/landingSlice";
import { register } from "../../firebase/firebase";
import { toast } from "react-hot-toast";

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

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
    if(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      const user = await register(email, password);
      if (user) {
        dispatch(switchLogin());
      }
    }else {
      toast.error("Email is not valid");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormGroup
        id="loginForm"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          alignItems: "center",
          mt: 7.5,
        }}
      >
        <CssTextField
          label="Mail"
          variant="outlined"
          type="email"
          name="email"
          required
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
          required
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
        >
          Register
        </Button>
      </FormGroup>
    </Box>
  );
}

export default Register;
