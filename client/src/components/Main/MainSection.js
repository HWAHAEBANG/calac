import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Divider } from "@mui/material";
import MainChart from "./MainChart";
import MainCalendar from "./MainCalendar";
import MainMonthGoal from "./MainMonthGoal";
import TopStateBar from "../common/TopBar";
import { useSelector } from "react-redux";

const MainSection = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <SectionWrap container>
      <SectionUpGrid item xs={12}>
        <TopStateBar isLoggedIn={isLoggedIn} userInfo={userInfo} />
        <MainChart />
      </SectionUpGrid>
      <FlexBox>
        <Grid item xs={6.5}>
          <MainCalendar isLoggedIn={isLoggedIn} userInfo={userInfo} />
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs={5.5}>
          {/* <MainMonthGoal /> */}
        </Grid>
      </FlexBox>
    </SectionWrap>
  );
};
//style=================================================
const SectionWrap = styled(Grid)({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
});
const SectionUpGrid = styled(Grid)({
  height: "55%",
  borderBottom: "1px solid #ddd",
});
const FlexBox = styled(Box)({
  height: "45%",
  display: "flex",
  width: "100%",
  alignItems: "center",
});
//======================================================
export default MainSection;
