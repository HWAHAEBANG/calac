import React, {useEffect, useState} from 'react';
import { Typography, Box, FormGroup, Checkbox, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from 'axios';

const DashboardMonthGoal = () => {
  //======================================================
  // const [checked, setChecked] = useState([0]);
  const [goalList, setGoalList] = useState(false);
  const [num,setNum] = useState('');
  //======================================================
  const handleCkeck = (idx) => {
    console.log('ddd', idx)
    setNum(idx);
  };
  //======================================================
  useEffect(() => {
    axios.get('http://localhost:5000/dashboard/goal')
    .then((res) => {
      console.log('res', res.data);
      setGoalList(res.data);
    })
  }, []);
  //======================================================
  return (
  <MonthGoalWrap>
    <Typography
      variant='h5'
      fontWeight={700}
      color='primary'
    >
      이번달 목표
    </Typography>
    <FormGroup>
      {goalList && goalList.map((list) =>(
        <FormControlLabel 
          key={list.goal_no}
          control={
            <Checkbox value={list.goal_achieve}/>
          }
          label={list.goal_title}
          onClick={()=>handleCkeck(list.goal_no)}/>
      )
      )}
    </FormGroup>
  </MonthGoalWrap>
  );
};
//style=================================================
const MonthGoalWrap = styled(Box)({
  height:'100%',
  paddingLeft:'10px'
});
//======================================================
export default DashboardMonthGoal;