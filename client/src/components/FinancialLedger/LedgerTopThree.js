import React, { useState, useEffect } from "react";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  ListItem,
  ListItemText,
  tabClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const LedgerTopThree = () => {
  const [tabValue, setTabValue] = useState("expense");
  const [totalCountData, setTotalCountData] = useState({});
  const [recentThreeList, setRecentThreeList] = useState(false);
  const [recentNum, setRecentNum] = useState("");
  //======================================================
  let type = "expense";
  const handleTabValue = (event, value) => {
    if (value !== null) {
      setTabValue(value);
    }
  };
  type = tabValue;
  const CHANGE_TOTAL = totalCountData
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  //======================================================
  useEffect(() => {
    axios
      .get(`http://calac.cafe24app.com/financialledger/monthly/total?type=${type}`)
      .then((res) => {
        setTotalCountData(res.data[0]["sum_count"]);
      });
  }, [tabValue]);
  //======================================================
  useEffect(() => {
    axios
      .get(`http://calac.cafe24app.com/financialledger/monthly/recent?type=${type}`)
      .then((res) => {
        setRecentThreeList(res.data);
        setRecentNum(res.data[0]["ledger_no"]);
      });
  }, [tabValue]);
  // 렌더링만 해결하면 됨.
  // 최근순 3개를 뽑아내기 때문에 그중 첫번째의 ledger_no이 변경되면
  // 리렌더링되도록 수정해봤으나 적용되지않음.
  //======================================================
  return (
    <AddInfoArea>
      <UpperText>
        <ToggleButtonGroup
          value={tabValue}
          exclusive
          onChange={handleTabValue}
          aria-label='text alignment'
          sx={{ width: "100%" }}
        >
          <ToggleButton
            value='expense'
            aria-label='left aligned'
            sx={{ width: "50%" }}
          >
            지출
          </ToggleButton>
          <ToggleButton
            value='income'
            aria-label='centered'
            sx={{ width: "50%" }}
          >
            수입
          </ToggleButton>
        </ToggleButtonGroup>
      </UpperText>
      <TabBox>
        <ShowTotal>
          {tabValue === "expense" ? (
            <TotalText>지출 전액</TotalText>
          ) : (
            <TotalText>수입 전액</TotalText>
          )}
          <TotalCount>{CHANGE_TOTAL}</TotalCount>
        </ShowTotal>
        <ShowRecent>
          {recentThreeList &&
            recentThreeList.map((list, index) => {
              return (
                <RecentList key={index}>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        {list.ledger_description}
                        <CategoryText variant='body1' component='span'>
                          {list.ledger_category}
                        </CategoryText>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <RecentPrice
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          {list.ledger_count}
                        </RecentPrice>
                      </React.Fragment>
                    }
                  />
                </RecentList>
              );
            })}
        </ShowRecent>
      </TabBox>
    </AddInfoArea>
  );
};

//style=================================================
const AddInfoArea = styled(Box)({
  border: "1px solid #ddd",
  width: "30%",
  padding: "20px",
  position: "relative",
  borderRadius: "10px",
});
const UpperText = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  height: "15%",
});
const TabBox = styled(Box)({
  height: "85%",
});
const ShowTotal = styled(Box)({
  height: "25%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "right",
  borderBottom: "1px solid #ddd",
});
const TotalText = styled(Typography)({
  fontSize: "14px",
});
const TotalCount = styled(Typography)({
  fontSize: "25px",
});
const ShowRecent = styled(Box)({
  height: "75%",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});
const RecentList = styled(ListItem)({
  textAlign: "right",
  padding: 0,
  height: "33.3333%",
});
const CategoryText = styled(Typography)({
  fontSize: "10px",
  color: "#7d7d7d",
  marginLeft: "10px",
});
const RecentPrice = styled(Typography)({
  fontSize: "20px",
});
//======================================================
export default LedgerTopThree;
