import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box,List,ListItem,ListItemText,Divider,Typography } from "@mui/material";
import "../../assets/css/App.css";
import { Link } from "react-router-dom";
import JoinRightRoundedIcon from "@mui/icons-material/JoinRightRounded";

const Nav = () => {
  // 첫 페이지 오픈 시 dashboard에 동그라미가 없어서 넣어줌
  // 추후에 redux를 이용해서 시작은 dashboard에 다른 페이지에서 새로고침했을 때
  // 열려있는 페이지의 목록에 동그라미 유지되있도록 작업해야함.
  // ㄴ확인했습니다 - hhb
  //=================================================================================
  const [btnActive, setBtnActive] = useState("dashBoard");
  //=================================================================================
  const toggleActive = () => {
    setBtnActive(true);
  };
  //=================================================================================

  return (
    <NavBar>
      <Box>
        <nav>
          <List disablePadding>
            <Link to='/' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{height:"110px", paddingRight:"30px"}}
                onClick={() => {
                  setBtnActive("dashBoard");
                }}
              >
                <Typography color="secondary" fontSize="30px" sx={{margin:"Auto"}}>
                  <JoinRightRoundedIcon sx={{fontSize: "30px", marginX:"9px"}} />
                  C A L A C
                </Typography>
              </ListItem>
            </Link>
          </List>
        </nav>
        <DividerColor />
        <nav>
          <List>
            <Link to='/' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{ height: "70px", boxSize: "border-box" }}
                onClick={() => {
                  setBtnActive("dashBoard");
                }}
              >
                <TitleColor
                  primary='Dashboard'
                  className={btnActive === "dashBoard" ? "active" : ""}
                  onClick={toggleActive}
                  disableTypography
                />
              </ListItem>
            </Link>
            <Link to='/scheduler' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{ height: "70px", boxSize: "border-box" }}
                onClick={() => {
                  setBtnActive("scheduler");
                }}
              >
                <TitleColor
                  primary='Scheduler'
                  className={btnActive === "scheduler" ? "active" : ""}
                  disableTypography
                />
              </ListItem>
            </Link>
            <Link to='/financialledger' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{ height: "70px", boxSize: "border-box" }}
                onClick={() => {
                  setBtnActive("financialLedger");
                }}
              >
                <TitleColor
                  primary='Financial Ledger'
                  className={btnActive === "financialLedger" ? "active" : ""}
                  disableTypography
                />
              </ListItem>
            </Link>
            <Link to='/diary' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{ height: "70px", boxSize: "border-box" }}
                onClick={() => {
                  setBtnActive("feed");
                }}
              >
                <TitleColor
                  primary='Diary'
                  className={btnActive === "diary" ? "active" : ""}
                  disableTypography
                />
              </ListItem>
            </Link>
          </List>
        </nav>
        <DividerColor />
        <nav>
          <List sx={{ boxSize: "border-box" }}>
            <Link to='/setting' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{ height: "70px", boxSize: "border-box" }}
                onClick={() => {
                  setBtnActive("setting");
                }}
              >
                <TitleColor
                  primary='Setting'
                  className={btnActive === "setting" ? "active" : ""}
                  disableTypography
                />
              </ListItem>
            </Link>
          </List>
        </nav>
      </Box>
      <Box marginBottom={10} fontSize={30}>
        <nav>
          <List>
            <Link to='/login' style={{ textDecoration: "none" }}>
              <ListItem
                onClick={() => {
                  setBtnActive("login");
                }}
              >
                <TitleColor
                  primary='Login'
                  disableTypography
                  // className={btnActive === "login" ? "active" : ""}
                  // 로그인은 배경 안들어오는게 예쁜 것 같은데,
                  // 달리 생각하실 수 있어서 주석으로 남겨놓겠습니다.
                  // 검토 후 삭제 바랍니다 - hhb // 확인 했으나 어떤 디자인인지
                  // 가늠이 안가 회의때 여쭤보도록 하겠습니다! 
                  sx={{ fontSize: "30px" }}
                />
              </ListItem>
            </Link>
          </List>
          <Link to='/login/signup' style={{ textDecoration: "none" }}>
            <Typography sx={{ color: "#c1c1c1", textDecoration: "underline" }}>
              Sign up
            </Typography>
          </Link>
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
//======================================================
export default function StyledComponents() {
  return <Nav>StyledComponents</Nav>;
}
