import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const LedgerTotalGraph = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [noData, setNoData] = useState(false);
  //======================================================
  useEffect(() => {
    let type = "income";
    axios
      .get(`http://calac.cafe24app.com/financialledger/monthly/total?type=${type}`)
      .then((res) => {
        if (res.data.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
          setTotalIncome(res.data[0]["sum_count"]);
        }
      });
  }, []);
  // 렌더링 해결해야함.
  //======================================================
  useEffect(() => {
    let type = "expense";
    axios
      .get(`http://calac.cafe24app.com/financialledger/monthly/total?type=${type}`)
      .then((res) => {
        if (res.data.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
          setTotalExpense(res.data[0]["sum_count"]);
        }
      });
  }, []);
  // 렌더링 해결해야함.
  //======================================================
  let minusPercent = Math.round((totalExpense / totalIncome) * 100);
  //======================================================
  const state = {
    series: [minusPercent],
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
      colors: ["#164ef5"],
      labels: [
        `이번달 수입 : ${totalIncome
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`,
      ],
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
      colors: ["#164ef5"],
      labels: [`이번달 수입 : 0`],
    },
  };
  //======================================================
  return (
    <ChartWrap>
      <ChartTopTextBox>
        <Typography>수입 대비 지출 금액</Typography>
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
export default LedgerTotalGraph;
