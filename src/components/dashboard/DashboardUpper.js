import React from 'react';
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Weather from "./Weather";

const DashboardUpper = () => {
  return (
    <UpperWrap
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Weather />
      <Box>
        <Typography
          variant='body1'
          fontWeight={700}
          color='primary'
          textAlign='right'
        >
          로그인을<br/>
          진행해주세요
        </Typography>
      </Box>
    </UpperWrap>
  );
};
//style=================================================
const UpperWrap = styled(Box)({
  height:'25%'
});
//======================================================
export default DashboardUpper;