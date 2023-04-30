import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const LedgerGoalGraph = () => {
  const [open, setOpen] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [monthlyGoalData, setMonthlyGoalData] = useState({});
  const [moneyNo, setMoneyNo] = useState(false);
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [money, setMoney] = useState(0);
  const [changeGoalMoney, setChangeGoalMoney] = useState(false);
  const [totalCountData, setTotalCountData] = useState(false);
  const [noData, setNoData] = useState(false);
  //======================================================
  useEffect(() => {
    axios.get("http://calac.cafe24app.com/financialledger/goal").then((res) => {
      if (res.data.length === 0) {
        setNoData(true);
        setMonthlyGoalData(0);
        setMoney(0);
      } else {
        setMonthlyGoalData(res.data[0]);
        setMoneyNo(res.data[0]["money_no"]);
        setMoney(res.data[0]["money_count"]);
        setCreated(res.data[0]["money_createdAt"]);
        setUpdated(res.data[0]["money_updatedAt"]);
      }
    });
  }, [money, open]);
  //======================================================
  const type = "expense";
  useEffect(() => {
    axios
      .get(`http://calac.cafe24app.com/financialledger/monthly/total?type=${type}`)
      .then((res) => {
        res.data.length !== 0 && setTotalCountData(res.data[0]["sum_count"]);
      });
  }, []);
  //======================================================
  const hadleChangeGoalMoney = (e) => {
    setChangeGoalMoney(e.target.value);
  };
  //======================================================
  // + 버튼 : 모달창 열림
  const handleClick = () => {
    setOpen(true);
  };
  //======================================================
  // 모달창 닫기
  const handleClose = () => {
    setOpen(false);
    setOpenInput(false);
  };
  //======================================================
  // 모달창 저장버튼
  const handleSave = () => {
    setOpen(false);
    axios.put(`http://calac.cafe24app.com/financialledger/goal/update/${moneyNo}`, {
      count: changeGoalMoney,
      no: moneyNo,
    });
  };
  const goalPercent = Math.round((totalCountData / money) * 100);
  //======================================================
  const handleSaveMoney = () => {
    setOpen(false);
    axios.post("http://calac.cafe24app.com/financialledger/goal/insert", {
      count: changeGoalMoney,
    });
  };
  //======================================================
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let currentMonth = year + "년" + month + "월";
  //======================================================
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  //======================================================
  const state = {
    series: [goalPercent],
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
      colors: ["#3ed65d"],
      labels: [
        `예산 : ${money
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`,
      ],
    },
  };
  //=====================================================
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
      colors: ["#3ed65d"],
      labels: [`설정된 값이 없습니다.`],
    },
  };
  //======================================================
  return (
    <ChartWrap>
      <ChartTopTextBox>
        <IconButton
          aria-label='add'
          onClick={() => {
            handleClick();
          }}
        >
          <AddIcon />
        </IconButton>
        <ChartTopText>지출 목표액 달성율</ChartTopText>
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

      {/* modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ModalTitle>
            {currentMonth} 목표 지출액
            <CloseIcon onClick={handleClose} />
          </ModalTitle>
          {monthlyGoalData !== undefined ? (
            <Box>
              {!openInput ? (
                <TextField
                  id='outlined-read-only-input'
                  defaultValue={money}
                  InputProps={{ readOnly: true }}
                  sx={{ marginBottom: "10px" }}
                />
              ) : (
                <TextField
                  required
                  id='outlined-required'
                  label='수정가능합니다.'
                  defaultValue={money}
                  autoFocus={true}
                  sx={{ marginBottom: "10px" }}
                  onChange={hadleChangeGoalMoney}
                />
              )}
              {created === updated ? (
                <Typography>
                  작성일 : {(created || "").split("T")[0]}
                </Typography>
              ) : (
                <Typography>
                  마지막 수정일 : {(updated || "").split("T")[0]}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography sx={{ marginBottom: "10px" }}>
              현재 목표액을 설정하지않았습니다.
            </Typography>
          )}
          <ClickBtnBox>
            {!openInput ? (
              <ClickBtn
                variant='contained'
                onClick={() => {
                  setOpenInput(true);
                }}
              >
                수정
              </ClickBtn>
            ) : (
              <ClickBtn
                variant='contained'
                onClick={() => {
                  setOpenInput(false);
                }}
              >
                취소
              </ClickBtn>
            )}
            {noData && !openInput && (
              <ClickBtn
                variant='contained'
                onClick={() => {
                  setOpen(false);
                }}
              >
                닫기
              </ClickBtn>
            )}
            {noData && openInput && (
              <ClickBtn
                variant='contained'
                onClick={() => {
                  handleSaveMoney();
                }}
              >
                새로 입력
              </ClickBtn>
            )}
            {!noData && !openInput && (
              <ClickBtn
                variant='contained'
                onClick={() => {
                  setOpen(false);
                }}
              >
                닫기
              </ClickBtn>
            )}
            {openInput && !noData && (
              <ClickBtn
                variant='contained'
                onClick={() => {
                  handleSave();
                }}
              >
                저장
              </ClickBtn>
            )}
          </ClickBtnBox>
        </Box>
      </Modal>
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
  position: "relative",
});
const ChartTopText = styled(Typography)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
});
const ModalTitle = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
});
const ClickBtnBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
const ClickBtn = styled(Button)({
  width: "48%",
  marginTop: "30px",
});
//======================================================
export default LedgerGoalGraph;
