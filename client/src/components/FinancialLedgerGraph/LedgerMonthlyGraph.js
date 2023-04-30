import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const LedgerGraphChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  //======================================================
  useEffect(() => {
    axios.get("http://calac.cafe24app.com/financialledger/monthly/category").then((res) => {
      setMonthlyData(res.data);
    });
  }, []);
  //======================================================
  const outputArray = [];

  // 카테고리별로 데이터 묶기
  const groupedByCategory = monthlyData.reduce((acc, item) => {
    if (!acc[item.ledger_category]) {
      acc[item.ledger_category] = [];
    }
    acc[item.ledger_category].push(item);
    return acc;
  }, {});

  // 각 카테고리 데이터를 월별로 묶어 합계 계산
  Object.keys(groupedByCategory).forEach((category) => {
    const data = groupedByCategory[category].reduce(
      (acc, item) => {
        const dateIndex = acc.date.indexOf(item.current_month);
        if (dateIndex === -1) {
          acc.date.push(item.current_month);
          acc.data.push(item.monthly_sum_count);
        } else {
          acc.data[dateIndex] += item.monthly_sum_count;
        }
        return acc;
      },
      { data: [], date: [] }
    );
    outputArray.push({ name: category, data: data.data, date: data.date });
  });
  // console.log('dddddddddd', outputArray)
  //======================================================
  // outputArray.map(list => {
  //   return( console.log(list.date) )
  // })
  //======================================================
  let today = new Date();
  let year = today.getFullYear();
  //======================================================
  const monthlyState = {
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: `${year}년도 월별 정산`,
        align: "left",
        style: {
          color: "black", //컬러변경가능
          //fontSize, fontWeight도 되는데 적용안됨 (공식 홈페이지에서도 이렇게 적용)
        },
      },
      grid: {
        row: {
          colors: ["#f3f3f3f3", "transparent"],
          opacity: 0.3,
        },
      },
      xaxis: {
        categories: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ],
      },
    },
  };
  //======================================================
  return (
    <ChartWrap>
      <ApexCharts
        options={monthlyState.options}
        series={outputArray}
        typs='line'
        width={"100%"}
        height={"100%"}
      />
    </ChartWrap>
  );
};
//style=================================================
const ChartWrap = styled(Box)({
  width: "100%",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "10px",
  height: "450px",
  borderRadius: "10px",
});
//======================================================
export default LedgerGraphChart;
