import React from 'react';
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import SignUpBox from './SignUpBox';

const SignUpSection = () => {
  return (
    <SignUpWrap>
      <SignUpBox/>
    </SignUpWrap>
  );
};
//style=================================================
const SignUpWrap = styled(Box)({
  width: "100%",
  height: "100vh",
});
//======================================================
export default SignUpSection;