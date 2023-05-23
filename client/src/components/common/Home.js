import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Box } from "@mui/material";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

const Home = () => {
  const pathname = window.location.pathname;
  return (
    <HomeWrap>
      { !pathname.includes('/login/find') ? (
      <MyGrid container>
        <Grid item xs={2} sx={{ display: "fixed" }}>
          <Nav />
        </Grid>
        <DashboardGrid item xs={10}>
          <Outlet />
        </DashboardGrid>
      </MyGrid>
      ) : (
        <MyGrid container>
        <DashboardGrid item xs={12}>
          <Outlet />
        </DashboardGrid>
        </MyGrid>
      )}
    </HomeWrap>
  );
};
//style=================================================
const HomeWrap = styled(Box)({
  backgroundColor: '#07553B',
  height: '100vh',
});
const MyGrid = styled(Grid)({
  height: "100%",
  background: "#07553B",
  display: "flex",
  alignItems: "center",
});
const DashboardGrid = styled(Grid)({
  background: "#fff",
  height: "100%",
  width: "100%",
  boxSizing: "border-box",
});
//======================================================
export default Home;
