import React from 'react';
import { Typography, Box } from "@mui/material";
import TestMonthGoal from "./TestMonthGoal";
import { styled } from "@mui/material/styles";

const DashboardMonthGoal = () => {
  return (
  <MonthGoalWrap>
    <Typography
      variant='h5'
      fontWeight={700}
      color='primary'
    >
      이번달 목표
    </Typography>
    <TestMonthGoal />
  </MonthGoalWrap>
  );
};
//style=================================================
const MonthGoalWrap = styled(Box)({
  height:'100%',
  paddingLeft:'10px'
});
//======================================================
export default DashboardMonthGoal;