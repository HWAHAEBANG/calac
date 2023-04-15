import React, {useState} from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction, Modal, Tab, Typography, Button, FormControl, Input, InputAdornment, TextField } from '@mui/material';
import { styled } from "@mui/material/styles"; 
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PaymentsIcon from '@mui/icons-material/Payments';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const BottomLedgerButton = () => {
  const modalData = [];
  const [open, setOpen] = useState(false);
  const [choiceModal, setChoiceModal] = useState(false);
  const [count, setCount] = useState(false);
  const [description, setDescription] = useState('');
  //=================================================================================
  // 지출과 수입의 카테고리 구분함
  const [expenseCategory, setExpenseCategory] = useState('식비');
  const [incomeCategory, setIncomeCategory] = useState('월급');
  //=================================================================================
  const actions = [
    { icon: <PaymentsIcon />, name: '지출', value:'expense' },
    { icon: <AddCircleOutlineIcon />, name: '수입', value:'income' }
  ];
  //=================================================================================
  // 모달창 닫기
  const handleClose = () => setOpen(false);
  //=================================================================================
  // 카테고리 고르기
  const handleChange = (e, value) => { 
    if (choiceModal === 'expense') { setExpenseCategory(value) }
    if (choiceModal === 'income') { setIncomeCategory(value) }
  };
  //=================================================================================
  // 지출/수입 모달 고른 후 클릭했을 때
  const handleChoiceModal = event => {
    setOpen(true);
    setCount(false);
    setDescription('');
    setChoiceModal(event);
  };
  //=================================================================================
  // 설명 입력창 (빈값 허용)
  const handleDescription = (e) => {
    const descriptionValue = e.target.value;
    setDescription(descriptionValue) 
    // if (choiceModal === 'expense') { setDescription(descriptionValue) }
    // if (choiceModal === 'income') { setDescription(descriptionValue) }
  };
  //=================================================================================
  // 금액 입력창
  const hadleCount = (e) => {
    const countValue = e.target.value;
    setCount(countValue);
    const checkNum =  /^[0-9]*$/;
    if (!checkNum.test(countValue)){
      alert('숫자만 입력해주세요.');
      setCount(false);
      console.log(count)
    } else {
      setCount(countValue);
    }
  };
  //=================================================================================
  // 저장 버튼 클릭 시
  const handleSave = () => {
    if (choiceModal === 'expense') {
      modalData.push({choiceModal, expenseCategory, count, description});
      // console.log('expe', expenseCategory)
      axios.post('http://localhost:5000/ledger/insert', {
        category : modalData[0].expenseCategory,
        type : modalData[0].choiceModal,
        description : modalData[0].description,
        count : modalData[0].count
      })
    } else {
      modalData.push({choiceModal, incomeCategory, count, description});
      // console.log('inc', incomeCategory)
      axios.post('http://localhost:5000/ledger/insert', {
        category : modalData[0].incomeCategory,
        type : modalData[0].choiceModal,
        description : modalData[0].description,
        count : modalData[0].count
      })
    }
    setOpen(false);
    // console.log('modal', modalData)
  };
  //=================================================================================
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  //=================================================================================
  return (
    <BtnWrap>
      <SpeedDial
        ariaLabel="Add count"
        sx={{ position: 'fixed', bottom: 30, right: 30}}
        icon={<SpeedDialIcon openIcon={<ArrowUpwardIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={()=> {handleChoiceModal(action.value)}}
          />
        ))}
      </SpeedDial>
      
      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <ModalTitle>
            {choiceModal === 'expense' ?
              (
                <Typography id="expense" variant="h6" component="h2">
                  지출
                </Typography>
              ):
              (
                <Typography id="income" variant="h6" component="h2">
                  수입
                </Typography>
              )
            }
            
            <CloseIcon onClick={() => setOpen(false)}/>
          </ModalTitle>
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: { xs: 320, sm: 480 },
              bgcolor: 'background.paper',
            }}
          >
            {choiceModal === 'expense' ? (
              <Tabs
                value={expenseCategory}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    '&.Mui-disabled': { opacity: 0.3 },
                  },
                }}
              >
                <Tab sx={{padding:'0px'}} label="식비" value='식비'/>
                <Tab sx={{padding:'0px'}} label="통신비" value='통신비'/>
                <Tab sx={{padding:'0px'}} label="쇼핑" value='쇼핑'/>
                <Tab sx={{padding:'0px'}} label="보험비" value='보험비'/>
                <Tab sx={{padding:'0px'}} label="병원/약국" value='병원/약국'/>
                <Tab sx={{padding:'0px'}} label="간식비" value='간식비'/>
                <Tab sx={{padding:'0px'}} label="반려묘/견" value='반려묘/견'/>
              </Tabs>
            ) : (
              <Tabs
                value={incomeCategory}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    '&.Mui-disabled': { opacity: 0.3 },
                  },
                }}
              >
                <Tab sx={{padding:'0px'}} label="월급" value='월급'/>
                <Tab sx={{padding:'0px'}} label="기타" value='기타'/>
              </Tabs>
            ) }
          </Box>
          <Box sx={{mt:3, textAlign:'right'}}>
            <Input 
              sx={{mt:3}}
              id="description"
              startAdornment={<InputAdornment position="start">설명</InputAdornment>}
              aria-describedby="description"
              inputProps={{
                'aria-label': 'description',
              }}
              onChange={handleDescription}
            />
            <FormControl variant="standard" sx={{ mt:3, width:'100px'}}>
              <Input
                id="money"
                endAdornment={<InputAdornment position="end">원</InputAdornment>}
                aria-describedby="money"
                inputProps={{
                  'aria-label': 'money',
                }}
                onChange={hadleCount}
              />
            </FormControl>
          </Box>
          <Button 
            variant="contained"
            sx={{width:'100%', marginTop:'30px'}}
            onClick={() => {handleSave()}}
          >
            저장
          </Button>
        </Box>
      </Modal>
    </BtnWrap>
  );
};
//style=================================================
const BtnWrap = styled(Box)({
  position:'relative'
});
const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  backgroundColor: 'white',
  border: '2px solid #000',
  padding: '30px'
});
const ModalTitle = styled(Box)({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  marginBottom:'20px'
})
//======================================================
export default BottomLedgerButton;