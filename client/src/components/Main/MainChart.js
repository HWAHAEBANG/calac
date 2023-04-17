import React from "react";
import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { styled } from "@mui/material/styles";

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

const MainChart = () => {
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
        내용
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
  border : '1px solid #ddd',
  borderRadius:'20px',
  margin:'2.5%',
  padding:'10px'
});
//======================================================
export default MainChart;
