import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Divider } from "@mui/material";
import DashboardChart from "./DashboardChart";
import DashboardCalendar from "./DashboardCalendar";
import DashboardMonthGoal from "./DashboardMonthGoal";
import TopStateBar from "../common/TopBar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getSession } from "../../redux/user/actions";
// import { useCookies } from "react-cookie";

const DashboardSection = () => {
  const dispatch = useDispatch();
  const hasSidCookie = useSelector((state) => state.hasSidCookie);
  const session = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(getSession());
  }, [hasSidCookie]);

  return (
    <SectionWrap container>
      <SectionUpGrid item xs={12}>
        <TopStateBar hasSidCookie={hasSidCookie} session={session} />
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
export default DashboardSection;
