import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NoPermissionBlock = ({ menu, comment }) => {
  return (
    <BlockBox>
      {comment ? <Typography>{comment}</Typography> : ""}
      <Typography fontSize={30} fontWeight={700} color='primary'>
        {menu} 는 회원전용 서비스입니다.
      </Typography>
      <Typography>로그인 후 이용바랍니다.</Typography>
      <Link to='/login'>
        <Button variant='contained'>로그인 바로가기</Button>
      </Link>
    </BlockBox>
  );
};

// style ======================================
const BlockBox = styled(Box)({
  zIndex: 100,
  position: "absolute",
  top: "0",
  left: "0",
  backgroundColor: "rgba(193, 193, 193, .25)",
  backdropFilter: "blur(2px)",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px",
});
// ============================================
export default NoPermissionBlock;
