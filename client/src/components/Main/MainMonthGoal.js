import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const MainMonthGoal = () => {
  //======================================================
  const [goalList, setGoalList] = useState(false);
  const [num, setNum] = useState("");
  //======================================================
  const handleCkeck = (idx) => {
    setNum(idx);
  };
  //======================================================
  useEffect(() => {
    axios.get("http://calac.cafe24app.com/dashboard/goal").then((res) => {
      setGoalList(res.data);
    });
  }, []);
  //======================================================
  return (
    <MonthGoalWrap>
      <Typography variant='h5' fontWeight={700} color='primary'>
        이번달 목표
      </Typography>
      <FormGroup>
        {goalList &&
          goalList.map((list) => (
            <FormControlLabel
              key={list.goal_no}
              control={<Checkbox value={list.goal_achieve} />}
              label={list.goal_title}
              onClick={() => handleCkeck(list.goal_no)}
            />
          ))}
      </FormGroup>
    </MonthGoalWrap>
  );
};
//style=================================================
const MonthGoalWrap = styled(Box)({
  height: "100%",
  paddingLeft: "10px",
});
//======================================================
export default MainMonthGoal;
