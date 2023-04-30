import React from "react";
import ChangeUserInfo from "./ChangeUserInfo";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import NoPermissionBlock from "../common/NoPermissionBlock";
import { useSelector } from "react-redux";

const Setting = () => {
  const hasSidCookie = useSelector((state) => state.hasSidCookie);
  return (
    <FindWrap>
      {hasSidCookie ? (
        ""
      ) : (
        <NoPermissionBlock
          menu='회원정보 설정 페이지'
        />
      )}
      <ChangeUserInfo />
    </FindWrap>
  );
};
//style=================================================
const FindWrap = styled(Box)({
  width: "100%",
  height: "100vh",
  position: "relative",
});
//======================================================
export default Setting;
