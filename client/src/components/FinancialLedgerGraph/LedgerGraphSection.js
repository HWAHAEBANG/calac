import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import LedgerTotalGraph from './LedgerTotalGraph';
import LedgerGoalGraph from './LedgerGoalGraph';
import LedgerWeeklyGraph from './LedgerWeeklyGraph';

const LedgerGraphSection = () => {
  return (
    <LedgerGraphWrap>
      <LedgerGoalGraph/>
      <LedgerTotalGraph/>
      <LedgerWeeklyGraph/>
    </LedgerGraphWrap>
  );
};
//style=================================================
const LedgerGraphWrap = styled(Box)({
  display:'flex',
  width:'100%',
  justifyContent:'space-between',
  height:'350px'
})
//======================================================
export default LedgerGraphSection;