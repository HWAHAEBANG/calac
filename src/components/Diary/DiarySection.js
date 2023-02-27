import React, {useState,useEffect} from 'react';
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import DiaryCard from './DiaryCard';
import WriteDiary from './WriteDiary';
import axios from 'axios';

const FeedSection = () => {
  useEffect(()=>{
    axios.get("http://localhost:8004/")
    .then(res=>console.log(res.data))
  },[])
  return (
    <MyBox>
      <MyTypography>Diary</MyTypography>
      <WriteBox>
        <WriteDiary/>
      </WriteBox>
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
});
const MyTypography = styled(Box)({
  fontSize: 30,
  color: '#07553B',
  paddingTop: 20,
  paddingLeft: '13vh',
});
const DiaryBox = styled(Box)({
  margin: '0 auto',
  display: 'flex',
  flexWrap: 'wrap'
});
const WriteBox = styled(Box)({
  display: 'flex',
  justifyContent: 'end',
  paddingRight: '13vh',
});
//======================================================
export default FeedSection;