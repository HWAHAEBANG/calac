import React from 'react';
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import FindIdBox from './FindIdBox';
import FindPwBox from './FindPwBox';

const FindIdPwSection = () => {
  const pathname = window.location.pathname;
  return (
    <FindWrap>
      {pathname === '/login/findid' && (
        <FindIdBox />
      )}
      {pathname === '/login/findpw' && (
        <FindPwBox />
      )}
    </FindWrap>
  );
};
//style=================================================
const FindWrap = styled(Box)({
  width: "100%",
  height: "100vh",
});
//======================================================
export default FindIdPwSection;