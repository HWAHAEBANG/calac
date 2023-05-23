import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles"; 
import TopBar from '../common/TopBar';
import LedgerTotalList from './LedgerTotalList'
import OpenModalBtn from '../common/OpenModalBtn';

const LedgerTotalSection = () => {
  return (
    <LedgerTotalWrap>
      <TopBarWrap>
        <TopBar />
      </TopBarWrap>
      <LedgerTotalList/>
    </LedgerTotalWrap>
  );
};
//style=================================================
const LedgerTotalWrap = styled(Box)({
  position:'relative',
  width:'100%',
  height:'100vh',
});
const TopBarWrap = styled(Box)({});
//======================================================
export default LedgerTotalSection;