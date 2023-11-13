import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Box, Grid, Typography, ButtonGroup, Button } from "@mui/material";

import bg from "../assets/mj3.1rs2.png";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Buttons from "./Buttons";

import { gsap } from "gsap";

function Landing() {
  const landing = useSelector((state) => state.landing.value);
  const textRef = useRef();
  const stateRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    gsap.from(textRef.current, {
      opacity: 0,
    });
    gsap.from(stateRef.current, {
      opacity: 0,
    });
    gsap.from(formRef.current, {
      opacity: 0,
    });
    gsap.to(textRef.current, {
      opacity: 1,
      delay: .5,
      duration: 3,
    });
    gsap.to(stateRef.current, {
      opacity: 1,
      delay: 1.5,
      duration: 3,
    });
    gsap.to(formRef.current, {
      opacity: 1,
      delay: 2.5,
      duration: 3,
    });
  }, []);

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          height: { xs: "100dvh", sm: "75dvh" },
          width: {
            xs: "100vw",
            sm: "65vw",
            md: "50vw",
            lg: "40vw",
            xl: "30vw",
          },
          borderRadius: { xs: 0, sm: 10 },
          background: "rgba(250, 215, 179,1)",
          boxShadow: "inset 0px 0px 25px black",
          border: { xs: 0, sm: "1px solid rgba(255, 255, 255,.1)" },
        }}
      >
        <Typography
          ref={textRef}
          variant="h2"
          sx={{
            opacity: 0,
            mt: 10,
            textAlign: "center",
            color: "rgb(10, 50, 50)",
            fontFamily: "Turret Road",
          }}
        >
          Todo App
        </Typography>
        <Grid
          ref={stateRef}
          sx={{
            opacity: 0,
            width: "100%",
            height: "5dvh",
            mt: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
          }}
        >
          <Buttons />
        </Grid>
        <Grid ref={formRef}>
          {landing === 0 ? <Login/> : <Register/>}
        </Grid>
      </Box>
    </Grid>
  );
}

export default Landing;
