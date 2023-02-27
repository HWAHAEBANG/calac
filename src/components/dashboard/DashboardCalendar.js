import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Divider, Typography, List, ListItem} from "@mui/material";
import Calendar from "react-calendar";
import "../../assets/css/Calendar.css";
import moment from "moment";

const DashboardCalendar = () => {
  const [value, onChange] = useState(new Date());
  //======================================================
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const today = `${year}년 ${month}월 ${date}일 `;

  return (
    <SectionCalendar container>
      <CalendarLeft item xs={8}>
        <CalendarWrap>
          <Calendar
            onChange={onChange}
            value={value}
            calendarType='US'
            formatDay={(locale, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
          />
          <CalendarText>
            {/* 클릭이 없을 시엔 today, 클릭 시 선택한 날짜만 하단에 나타나도록 작업 */}
            <Box> {moment(value).format("YYYY년 MM월 DD일")} </Box>
          </CalendarText>
        </CalendarWrap>
      </CalendarLeft>  
      <Grid item xs={4}>  
        <TodayScheduleBox>
          <Typography
            variant='p'
            fontWeight={600}
            color='primary'
          >
            2023.02.16 (today 날짜)
          </Typography>
          <List>
            <ListItem>05:00 수강신청</ListItem>
            <ListItem>12:00 점심 약속</ListItem>
            <ListItem>17:00 미용실 예약</ListItem>
          </List>
        </TodayScheduleBox>
      </Grid>  
    </SectionCalendar>
  );
};
//style=================================================
const SectionCalendar = styled(Grid)({
  maxHeight:'100%',
  minHeight:'100%',
  width:'100%'
});
const CalendarLeft = styled(Grid)({
  maxHeight:'100%'
});
const CalendarWrap = styled(Box)({
  padding: `0 30px`,
  height:'100%',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center'
});
const CalendarText = styled(Box)({
  marginTop:'10px',
  color:'#171717',
  fontSize:'14px'
});
const TodayScheduleBox = styled(Box)({
  height:'100%',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
});
//======================================================
export default DashboardCalendar;
