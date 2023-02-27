import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const LoginSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "97vh",
        backgroundColor: "#07553B",
      }}
    >
      <Link to='/login/signup' style={{ textDecoration: "none" }}>
        <Button variant='outlined' color='secondary'>
          회원가입
        </Button>
      </Link>
      <Link to='/login/findidpw' style={{ textDecoration: "none" }}>
        <Button variant='outlined' color='secondary'>
          ID / PW 찾기
        </Button>
      </Link>
    </Box>
  );
};

export default LoginSection;
