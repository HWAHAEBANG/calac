import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import "../../assets/css/App.css";
import { Link, Navigate } from "react-router-dom";
import JoinRightRoundedIcon from "@mui/icons-material/JoinRightRounded";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
const Nav = () => {
  const hasSidCookie = useSelector((state) => state.hasSidCookie);
  //=================================================================================
  const [btnActive, setBtnActive] = useState("");
  //=================================================================================

  const toggleActive = () => {
    setBtnActive(true);
  };

  ///
  const [cookies, setCookie, removeCookie] = useCookies(["sid", "connect.sid"]);

  const handleLogout = () => {
    removeCookie("sid", { path: "/" });
    removeCookie("connect.sid", { path: "/" });
  };
  //=================================================================================
  useEffect(() => {
    setBtnActive(window.location.pathname.slice(1));
  });
  //=================================================================================
  return (
    <NavBar>
      <nav>
        <Box>
          <List disablePadding>
            <Link to='/'>
              <ListItem
                sx={{ height: "110px", paddingRight: "30px" }}
                onClick={() => {
                  setBtnActive("dashBoard");
                }}
              >
                <Typography
                  color='secondary'
                  fontSize='30px'
                  sx={{ margin: "Auto" }}
                >
                  <JoinRightRoundedIcon
                    sx={{ fontSize: "30px", marginX: "9px" }}
                  />
                  C A L A C
                </Typography>
              </ListItem>
            </Link>
          </List>
        </Box>
        <DividerColor />
        <nav>
          <List>
            <Link to='/'>
              <CommonListItem
                onClick={() => {
                  setBtnActive("dashBoard");
                }}
              >
                <TitleColor
                  primary='Dashboard'
                  className={btnActive === "" ? "active" : ""}
                  onClick={toggleActive}
                  disableTypography
                />
              </CommonListItem>
            </Link>
            <Link to='/scheduler'>
              <CommonListItem
                onClick={() => {
                  setBtnActive("scheduler");
                }}
              >
                <TitleColor
                  primary='Scheduler'
                  className={btnActive === "scheduler" ? "active" : ""}
                  disableTypography
                />
              </CommonListItem>
            </Link>
            <Link to='/financialledger'>
              <CommonListItem
                onClick={() => {
                  setBtnActive("financialLedger");
                }}
              >
                <TitleColor
                  primary='Financial Ledger'
                  className={btnActive === "financialledger" ? "active" : ""}
                  disableTypography
                />
              </CommonListItem>
            </Link>
            <Link to='/diary'>
              <CommonListItem
                onClick={() => {
                  setBtnActive("diary");
                }}
              >
                <TitleColor
                  primary='Diary'
                  className={btnActive === "diary" ? "active" : ""}
                  disableTypography
                />
              </CommonListItem>
            </Link>
          </List>
        </nav>
        <DividerColor />
        <nav>
          <List sx={{ boxSize: "border-box" }}>
            <Link to='/setting'>
              <CommonListItem
                onClick={() => {
                  setBtnActive("setting");
                }}
              >
                <TitleColor
                  primary='Setting'
                  className={btnActive === "setting" ? "active" : ""}
                  disableTypography
                />
              </CommonListItem>
            </Link>
          </List>
        </nav>
      </nav>
      <Box marginBottom={10} fontSize={30}>
        <nav>
          {hasSidCookie ? (
            <List>
              <Link to='/'>
                <ListItem onClick={handleLogout}>
                  <TitleColor
                    primary='Logout'
                    disableTypography
                    sx={{ fontSize: "30px", cursor: "pointer" }}
                  />
                </ListItem>
              </Link>
            </List>
          ) : (
            <List>
              <Link to='/login'>
                <ListItem
                  onClick={() => {
                    setBtnActive("login");
                  }}
                >
                  <TitleColor
                    primary='Login'
                    disableTypography
                    sx={{ fontSize: "30px" }}
                  />
                </ListItem>
              </Link>
            </List>
          )}

          {!hasSidCookie && (
            <Link to='/login/signup'>
              <Typography
                sx={{ color: "#c1c1c1", textDecoration: "underline" }}
              >
                Sign up
              </Typography>
            </Link>
          )}
        </nav>
      </Box>
    </NavBar>
  );
};
//style=================================================
const NavBar = styled(Box)({
  backgroundColor: `#07553B`,
  textAlign: `center`,
  height: `100vh`,
  width: `100%`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
const DividerColor = styled(Divider)({
  width: `80%`,
  backgroundColor: `#fff`,
  margin: `auto`,
});
const TitleColor = styled(ListItemText)({
  color: `#fff`,
  textAlign: `center`,
  fontSize: `20px`,
  margin: `10px`,
});
const CommonListItem = styled(ListItem)({
  height: "70px",
  boxSize: "border-box",
});
//======================================================
// export default function StyledComponents() {
//   return <Nav>StyledComponents</Nav>;
// }

export default Nav;
