import React, {useEffect} from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Divider } from "@mui/material";
import DashboardChart from "./DashboardChart";
import DashboardCalendar from "./DashboardCalendar";
import DashboardMonthGoal from "./DashboardMonthGoal";
import TopStateBar from "../common/TopBar";
import axios from 'axios';

const DashboardSection = () => {

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api')
  //   .then((res) => {
  //     console.log('res', res);
  //   })
  // }, []);

  return (
    <SectionWrap container>
      <SectionUpGrid item xs={12}>
        <TopStateBar />
        <DashboardChart />
      </SectionUpGrid>
      <FlexBox>
        <Grid item xs={6.5}>
          <DashboardCalendar />
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs={5.5}>
          <DashboardMonthGoal />
        </Grid>
      </FlexBox>
    </SectionWrap>
  );
};
//style=================================================
const SectionWrap = styled(Grid)({
  height:'100vh',
  width:'100%',
  display:'flex',
  justifyContent:'center'
});
const SectionUpGrid = styled(Grid)({
  height:'55%',
  borderBottom:'1px solid #ddd'
});
const FlexBox = styled(Box)({
  height:'45%',
  display:'flex',
  width:'100%',
  alignItems:'center',
});
//======================================================
export default DashboardSection;
