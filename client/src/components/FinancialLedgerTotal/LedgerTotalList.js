import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Modal,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const LedgerTotalList = () => {
  const [tabValue, setTabValue] = useState("expense");
  const [monthlyData, setMonthlyData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(false);
  const [clickListData, setClickListData] = useState({});
  const [category, setCategory] = useState(clickListData.ledger_category);
  const [description, setDescription] = useState(
    clickListData.ledger_description
  );
  const [count, setCount] = useState(clickListData.ledger_count);
  const modalData = [];
  //======================================================
  let type = "expense";
  const handleTabValue = (event, value) => {
    if (value !== null) {
      setTabValue(value);
    }
  };
  type = tabValue;
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
  // 모달창 닫기
  const handleClose = () => {
    setOpen(false);
    setClickListData({});
  };
  //======================================================
  useEffect(() => {
    axios.get(`http://calac.cafe24app.com/financialledger/total?type=${type}`).then((res) => {
      setMonthlyData(res.data);
    });
  }, [tabValue, monthlyData]);
  //======================================================
  const handleDelete = (index) => {
    if (window.confirm(`해당 데이터를 완전히 삭제하시겠습니까?`) == true) {
      axios.delete(`http://calac.cafe24app.com/financialledger/delete/${index}`);
    } else {
      alert("취소하셨습니다.");
    }
  };
  //=====================================================
  const handleEdit = (id) => {
    setId(id);
    axios.get(`http://calac.cafe24app.com/financialledger/total/select/${id}`).then((res) => {
      setClickListData(res.data[0]);
      setCategory(res.data[0]["ledger_category"]);
      setDescription(res.data[0]["ledger_description"]);
      setCount(res.data[0]["ledger_count"]);
      setOpen(true);
    });
  };
  //=====================================================
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeCount = (event) => {
    setCount(event.target.value);
  };
  //=====================================================
  const handleEditModal = () => {
    modalData.push({ category, description, count });
    if (window.confirm(`수정하시겠습니까?`) == true) {
      alert("수정완료되었습니다.");
      axios.put(`http://calac.cafe24app.com/financialledger/total/update/${id}`, {
        category: modalData[0].category,
        count: modalData[0].count,
        description: modalData[0].description,
      });
      setOpen(false);
    } else {
      alert("취소하셨습니다.");
    }
  };
  //=====================================================
  return (
    <LedgerTotalWrap>
      <ToggleButtonGroup
        value={tabValue}
        exclusive
        onChange={handleTabValue}
        aria-label='text alignment'
        sx={{ width: "100%", height: "50px" }}
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
      <ListBox>
        <ListTableTop>
          <Typography sx={{ width: "20%", textAlign: "center" }}>
            카테고리
          </Typography>
          <Typography sx={{ width: "20%", textAlign: "center" }}>
            설명
          </Typography>
          <Typography sx={{ width: "15%", textAlign: "center" }}>
            가격
          </Typography>
          <Typography sx={{ width: "20%", textAlign: "center" }}>
            작성일
          </Typography>
          <Typography sx={{ width: "25%", textAlign: "center" }}>
            기능
          </Typography>
        </ListTableTop>
        <ListTableWrap>
          {monthlyData &&
            monthlyData.map((data) => (
              <ListTableBox key={data.ledger_no}>
                <ListTableText sx={{ width: "20%" }}>
                  {data.ledger_category}
                </ListTableText>
                <ListTableText sx={{ width: "20%" }}>
                  {data.ledger_description}
                </ListTableText>
                <ListTableText sx={{ width: "15%" }}>
                  {data.ledger_count}
                </ListTableText>
                <ListTableText sx={{ width: "20%" }}>
                  {data.ledger_createdAt.split("T")[0]}
                </ListTableText>
                <Box sx={{ width: "25%" }}>
                  <Button
                    sx={{ width: "50%" }}
                    onClick={() => handleEdit(data.ledger_no)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    sx={{ width: "50%" }}
                    onClick={() => handleDelete(data.ledger_no)}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </ListTableBox>
            ))}
        </ListTableWrap>
      </ListBox>

      {/* modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ModalTitle>
            수정창입니다.
            <CloseIcon onClick={handleClose} />
          </ModalTitle>
          <Box>
            <AlignCenterBox>
              <Typography>카테고리 :</Typography>
              {tabValue === "expense" ? (
                <FormControl sx={{ width: "200px", marginLeft: "10px" }}>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={category}
                    onChange={handleChangeCategory}
                  >
                    <MenuItem value={"식비"}>식비</MenuItem>
                    <MenuItem value={"통신비"}>통신비</MenuItem>
                    <MenuItem value={"쇼핑"}>쇼핑</MenuItem>
                    <MenuItem value={"보험비"}>보험비</MenuItem>
                    <MenuItem value={"병원/약국"}>병원/약국</MenuItem>
                    <MenuItem value={"간식비"}>간식비</MenuItem>
                    <MenuItem value={"반려묘/견"}>반려묘/견</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControl sx={{ width: "200px", marginLeft: "10px" }}>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={category}
                    onChange={handleChangeCategory}
                  >
                    <MenuItem value={"월급"}>월급</MenuItem>
                  </Select>
                </FormControl>
              )}
            </AlignCenterBox>
            <AlignCenterBox>
              <Typography>설명 :</Typography>
              <TextField
                id='standard-basic'
                variant='standard'
                sx={{ width: "200px", marginLeft: "10px" }}
                defaultValue={description}
                onChange={handleChangeDescription}
              />
            </AlignCenterBox>
            <AlignCenterBox>
              <Typography>가격 :</Typography>
              <TextField
                id='standard-basic'
                variant='standard'
                sx={{ width: "200px", marginLeft: "10px" }}
                defaultValue={count}
                onChange={handleChangeCount}
              />
            </AlignCenterBox>
            <ClickBtnBox>
              <ClickBtn variant='contained' onClick={handleEditModal}>
                수정
              </ClickBtn>
              <ClickBtn variant='contained' onClick={handleClose}>
                취소
              </ClickBtn>
            </ClickBtnBox>
          </Box>
        </Box>
      </Modal>
    </LedgerTotalWrap>
  );
};
//style=================================================
const LedgerTotalWrap = styled(Box)({
  height: "calc(100vh - 110px)",
  padding: "50px",
});
const ListBox = styled(Box)({
  border: "1px solid #ddd",
  marginTop: "10px",
  height: "calc(100% - 50px)",
});
const ListTableTop = styled(Box)({
  height: "50px",
  width: "100%",
  borderBottom: "1px solid #ddd",
  display: "flex",
  alignItems: "center",
  padding: "20px",
});
const ListTableWrap = styled(Box)({
  height: "calc(100% - 50px)",
  overflowY: "scroll",
  padding: "5px",
});
const ListTableBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "70px",
});
const ListTableText = styled(Typography)({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
});
const ModalTitle = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
});
const AlignCenterBox = styled(Box)({
  display: "flex",
  alignItems: "center",
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
export default LedgerTotalList;
