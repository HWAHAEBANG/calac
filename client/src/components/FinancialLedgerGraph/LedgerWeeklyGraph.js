import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import { CategoryOutlined } from "@mui/icons-material";

const LedgerWeeklyGraph = () => {
  //======================================================
  const [weeklyList, setWeeklyList] = useState([]);
  const [weeklyTopData, setWeeklyTopData] = useState({});
  const [noData, setNoData] = useState(false);
  //======================================================
  const today = new Date();
  // 저번 주의 시작일 생성
  const lastWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() - 5
  );
  // 저번 주의 종료일 생성
  const lastWeekEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1
  );
  //======================================================
  // 시작일부터 종료일까지의 날짜 배열 생성
  const dateArray = [];
  let currentDate = new Date(lastWeekStart);
  while (currentDate <= lastWeekEnd) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  // 배열의 날짜를 원하는 형식으로 변환
  const formattedDateArray = dateArray.map((date) => {
    return date.toISOString().slice(0, 10);
  });
  //======================================================
  useEffect(() => {
    axios
      .get(
        `http://calac.cafe24app.com/financialledger/weekly?weeklyStartDay=${formattedDateArray[0]}&weeklyLastDay=${formattedDateArray[6]}`
      )
      .then((res) => {
        if (res.data.length !== 0) {
          setNoData(false);
          setWeeklyList(res.data);
          setWeeklyTopData(res.data[0]);
        } else {
          setNoData(true);
        }
      });
  }, []);
  //======================================================
  // 지난주 값들 있을 때 전체 지출금액
  let sumsum = 0;
  weeklyList.map((data) => {
    sumsum += data.weekly_sum_count;
  });
  //======================================================
  // 제일 지출이 많은 카테고리 퍼센트
  let categoryPercent = Math.round(
    (weeklyTopData["weekly_sum_count"] / sumsum) * 100
  );
  //======================================================
  const state = {
    series: [categoryPercent],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      colors: ["#cd2ff5"],
      labels: [`소비많은 카테고리: ${weeklyTopData["ledger_category"]}`],
    },
  };
  //======================================================
  const noState = {
    series: [0],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      colors: ["#cd2ff5"],
      labels: [`입력된 값이 없습니다.`],
    },
  };
  //======================================================
  return (
    <ChartWrap>
      <ChartTopTextBox>
        <Typography>지난주에 제일 많은 지출</Typography>
      </ChartTopTextBox>
      {noData ? (
        <ApexCharts
          options={noState.options}
          series={noState.series}
          type='radialBar'
          height='300px'
          width='100%'
        />
      ) : (
        <ApexCharts
          options={state.options}
          series={state.series}
          type='radialBar'
          height='300px'
          width='100%'
        />
      )}
    </ChartWrap>
  );
};
//style=================================================
const ChartWrap = styled(Box)({
  position: "relative",
  width: "30%",
  border: "1px solid #ddd",
  position: "relative",
  borderRadius: "10px",
});
const ChartTopTextBox = styled(Box)({
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
//======================================================
export default LedgerWeeklyGraph;
