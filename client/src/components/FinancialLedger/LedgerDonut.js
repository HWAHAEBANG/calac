import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { styled } from "@mui/material/styles";
import axios from "axios";

const LedgerDonut = () => {
  const [monthlyDonutData, setMonthlyDountData] = useState([]);
  //======================================================
  useEffect(() => {
    axios.get("http://calac.cafe24app.com/financialledger").then((res) => {
      setMonthlyDountData(res.data);
    });
  }, [monthlyDonutData]);
  //=====================================================
  return (
    <DountWrap className='donut'>
      <DountGraph>
        <DountTitle>이번달 지출 현황</DountTitle>
        {monthlyDonutData.length !== 0 ? (
          <Box style={{ width: "100%", height: "90%", margin: "0 auto" }}>
            <ResponsivePie
              data={
                monthlyDonutData &&
                monthlyDonutData.map((data) => ({
                  id: data.ledger_category,
                  value: data.sum_count,
                }))
              }
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
              innerRadius={0.65}
              padAngle={1}
              cornerRadius={3}
              sortByValue={true} // 큰순서대로 정리
              activeOuterRadiusOffset={8}
              colors={{ scheme: "paired" }}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", "0.3"]],
              }}
              enableArcLinkLabels={false}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor='#333333'
              arcLinkLabelsOffset={24}
              arcLinkLabelsDiagonalLength={10}
              arcLinkLabelsStraightLength={10}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", "5"]],
              }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: "쇼핑",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "반려묘/견",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "통신비",
                  },
                  id: "lines",
                },
              ]}
              legends={[
                {
                  anchor: "right",
                  direction: "column",
                  justify: false,
                  translateX: 10,
                  translateY: 0,
                  itemWidth: 100,
                  itemHeight: 40,
                  itemsSpacing: 10,
                  symbolSize: 20,
                  itemDirection: "left-to-right",
                },
              ]}
            />
          </Box>
        ) : (
          <Box style={{ width: "100%", height: "90%", margin: "0 auto" }}>
            값이 없습니다.
          </Box>
        )}
      </DountGraph>
    </DountWrap>
  );
};
//style=================================================
const DountWrap = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "67%",
  position: "relative",
  border: "1px solid #ddd",
  padding: "5px",
  height: "450px",
  borderRadius: "10px",
});
const DountGraph = styled(Box)({
  width: "100%",
  height: "100%",
});
const DountTitle = styled(Typography)({
  marginBottom: "20px",
});
//======================================================
export default LedgerDonut;
