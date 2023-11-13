import { useEffect, useState } from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { switchLogin , switchRegister } from "../features/landing/landingSlice";
import { useNavigate } from "react-router-dom";

function Buttons() {
  const landing = useSelector((state)=> state.landing.value)
  const dispatch = useDispatch()
  return (
    <ButtonGroup variant="standard">
      <Button
        sx={{
          color: landing === 0 ? "black" : "rgba(0,0,0,.2)",
          background: landing === 0 ? "rgba(0,0,0,.1)" : "rgba(0,0,0,0)",
          fontFamily:"Turret Road",
        }}
        onClick={() => dispatch(switchLogin())}
      >
        Login
      </Button>
      <Button
        sx={{
          color: landing === 1 ? "black" : "rgba(0,0,0,.2)",
          background: landing === 1 ? "rgba(0,0,0,.1)" : "rgba(0,0,0,0)",
          fontFamily:"Turret Road",
        }}
        onClick={() => dispatch(switchRegister())}
      >
        Register
      </Button>
    </ButtonGroup>
  );
}

export default Buttons;
