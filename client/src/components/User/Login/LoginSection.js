import React from "react";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import LoginInputBox from './LoginInputBox';

const LoginSection = () => {
  return (
    <LoginWrap>
      <LoginInputBox/>
    </LoginWrap>
  );
};
//style=================================================
const LoginWrap = styled(Box)({
  width: "100%",
  height: "100vh",
});
//======================================================
export default LoginSection;
