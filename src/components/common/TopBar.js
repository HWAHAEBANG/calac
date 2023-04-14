import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import Weather from '../Dashboard/Weather';
import { Link } from "react-router-dom";
import axios from 'axios'; 

const DashboardTopStateBar = () => {
  const pathname = window.location.pathname;
  const [money, setMoney] = useState(0);
  const [totalCountData, setTotalCountData] = useState(false);
  //======================================================
  useEffect(() => {
    axios.get('http://localhost:5000/ledger/goal')
    .then((res) => {
      console.log('aaa', res.data)
      setMoney(res.data[0]['money_count']);
    })
  }, []);
  // 리렌더링 조건
  //======================================================
  useEffect(() => {
    axios.get(`http://localhost:5000/ledger/total?type=expense`)
    .then((res) => {
      res.data[0][0]['sum_count'] !== null && (
        setTotalCountData(res.data[0][0]['sum_count'])
      );
    })
  }, []);
  //======================================================
  const change_money = money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  const minusGoal = money-totalCountData;
  //======================================================
  return (
    <TopStateBarWrap>
      { pathname === '/' && (
        <CommonTopState>
          <Weather />
          <Box>
            <Typography
              variant='body1'
              fontWeight={700}
              color='primary'
              textAlign='right'
            >
              로그인을<br/>
              진행해주세요
            </Typography>
          </Box>
        </CommonTopState>
      )}
      { pathname.includes('/financialledger') && (
        <CommonTopState>
          <Box>
            <Text>이번달 지출 목표 금액</Text>
            <Text>
              {change_money} 
              {minusGoal >= 0 ? (
                <GoalCount sx={{color:'blue'}}>
                  (-{minusGoal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")})
                </GoalCount>
              ) : (
                <GoalCount sx={{color:'red'}}>
                  (+{minusGoal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",").replace('-', '')})
                </GoalCount>
              )}
            </Text>
          </Box>
          {!pathname.includes('total') ? (
            <Box>
              <Link to="/financialledger/total">
                내역 전체보기
              </Link>
            </Box>
          ) : (
            <Box>
              <Link to="/financialledger">
                이전 페이지로
              </Link>
            </Box>
          )}
        </CommonTopState>
      )}
    </TopStateBarWrap>
  );
};
//style=================================================
const TopStateBarWrap = styled(Box)({
  height:'110px',
  borderBottom:'1px solid #ddd',
  padding:'0 20px',
});
const CommonTopState = styled(Box)({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center', 
  height:'100%',
})
const GoalCount = styled('span')({
  fontSize:'14px',
  marginLeft:'5px',
})
const Text = styled('p')({
  fontSize:'16px'
})
//======================================================
export default DashboardTopStateBar;