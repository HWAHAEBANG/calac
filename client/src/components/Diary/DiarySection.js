import React, {useState,useEffect} from 'react';
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import DiaryCard from './DiaryCard';
import WriteDiary from './WriteDiary';

const FeedSection = ({ hasSidCookie }) => {
  return (
    <MyBox>
      <Title>
        <MyTypography>Diary</MyTypography>
        <WriteBox>
          <WriteDiary/>
        </WriteBox>
      </Title>
      <DiaryBox>
        <DiaryCard/>
      </DiaryBox>
    </MyBox>
  );
};
//style=================================================
const MyBox = styled(Box)({
  height: '100vh',
  margin: '0 auto',
  // overflow:'auto'
});
const Title = styled(Box)({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  height:'7%',
  padding:'0 13vh'
})
const MyTypography = styled(Box)({
  fontSize: 30,
  color: '#07553B'
});
const WriteBox = styled(Box)({});
const DiaryBox = styled(Box)({
  margin: '0 auto',
  display: 'flex',
  flexWrap: 'wrap',
  height:'93%'
});
//======================================================
export default FeedSection;