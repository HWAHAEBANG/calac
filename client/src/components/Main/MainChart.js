import React, { useState, useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import CircleIcon from '@mui/icons-material/Circle';
import { styled } from "@mui/material/styles";
import axios from "axios";


const MainChart = () => {
  const data = [
    {
      name: "식비",
      "이번달": 25,
      "저번달": 20,
    },
    {
      name: "통신비",
      "이번달": 15,
      "저번달": 15,
    },
    {
      name: "쇼핑",
      "이번달": 10,
      "저번달": 30,
    },
    {
      name: "보험비",
      "이번달": 20,
      "저번달": 20,
    },
    {
      name: "병원/약국",
      "이번달": 2.5,
      "저번달": 0,
    },
    {
      name: "간식비",
      "이번달": 5,
      "저번달": 3,
    },
    {
      name: "반려묘/견",
      "이번달": 10,
      "저번달": 7,
    },
  ];
  const [ diary, setDiary ] = useState([]);
  // Dashboard 우측 상단 ===================================
  useEffect(() => {
    axios.post(`http://localhost:5000/diary?limit=3&offset=0`)
    .then((res) => {
      setDiary(res.data);
    });
  }, []);
  //=======================================================
  return (
    <ChartWrap>
      <ChartLeftBox>
        <ChartTitle>
          <Typography
            variant='p'
            fontWeight={600}
            color='primary'
            paddingLeft='20px'
          >
            전월 비교 사용내역 (단위:만원)
          </Typography>
        </ChartTitle>
        <ResponsiveContainer width='100%' height='80%'>
          <BarChart
            data={data}
            margin={{
              top: 0,
              right: 40,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='저번달' fill='#ffc658' />
            <Bar dataKey='이번달' stackId='a' fill='#82ca9d' />
          </BarChart>
        </ResponsiveContainer>
      </ChartLeftBox>
      <ChartRightBox>
        <RightTypography>최근 게시물</RightTypography>
        {diary.map((item, idx) => {
          const isLastItem = idx === diary.length - 1;
          return (
            <EntryBox key={idx} className='test'>
              <TitleBox>
                <CircleIcon sx={{ fontSize: 5 }}/>
                <TitleTypography>{item.title}</TitleTypography>
              </TitleBox>
              <DiaryBox>
                <Typography>{item.user_name}</Typography>
                <Typography>{item.createdAt.substr(0,10)}</Typography>
              </DiaryBox>
              {isLastItem ? null : <RightDivider/>}
              {/* <RightDivider/> */}
            </EntryBox> 
          )
        })}
      </ChartRightBox>
    </ChartWrap>
  );
};
//style=================================================
const ChartWrap = styled(Box)({
  height:'calc(100% - 110px)',
  display:'flex'
});
const ChartTitle = styled(Box)({
  margin:'20px 0'
});
const ChartLeftBox = styled(Box)({
  width:'75%',
});
const ChartRightBox = styled(Box)({
  width:'25%',
  height: '85%',
  border : '1px solid #ddd',
  borderRadius:'20px',
  margin:'2.5%',
  padding:'10px'
});
const RightTypography = styled(Typography)({
  fontWeight: 'bold',
  color: '#07553B',
  fontSize: '1rem',
  height: '15%',
  paddingTop: 10,
});
const EntryBox = styled(Box)({
  height: '30%',
});
const TitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  paddingTop: 10,
});
const TitleTypography = styled(Typography)({
  paddingLeft: 5,
});
const DiaryBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  height: '30%',
});
const RightDivider = styled(Divider)({
  borderColor: '#333',
  height: '30%',
});
//======================================================
export default MainChart;
