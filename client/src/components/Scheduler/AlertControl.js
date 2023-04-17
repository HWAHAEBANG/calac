import React, { useState } from "react";
import {
  Box,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
  Switch,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AlarmIcon from "@mui/icons-material/Alarm";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import RefreshIcon from "@mui/icons-material/Refresh";
import OutputIcon from "@mui/icons-material/Output";
import QuizIcon from "@mui/icons-material/Quiz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function AlertControl({ alertEvents }) {
  const actions = [
    // { icon: <AlarmIcon />, name: "알림", value: "alert" },
    { icon: <QuestionMarkIcon />, name: "도움말", value: "help" },
  ];

  const [openHelp, setOpenHelp] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChoiceModal = (event) => {
    setOpenAlert((prev) => !prev);
    // setCount(false);
    // setDescription("");
    // setChoiceModal(event);
  };

  const [pageCount, setPageCount] = useState(1);

  return (
    <Box>
      <Box
        overflow='hidden'
        zIndex={99}
        padding={4}
        position='fixed'
        top='100px'
        right='-350px'
        bgcolor='rgba(193, 193, 193, .25)'
        boxShadow='0 6px 20px -15px #000'
        borderRadius='30px'
        width='350px'
        height='75%'
        borderColor='#fff'
        display='flex'
        flexDirection='column'
        gap='10px'
        sx={
          openAlert
            ? {
                backdropFilter: "blur(2px)",
                borderWidth: "1px 1px 0 0",
                borderStyle: "solid",
                transform: "translate(-370px, 0)",
                transitionDuration: "0.5s",
                transitionProperty: "all",
              }
            : {
                backdropFilter: "blur(2px)",
                borderWidth: "1px 1px 0 0",
                borderStyle: "solid",
                transitionDuration: "0.5s",
                transitionProperty: "all",
              }
        }
      >
        <Box display='flex' justifyContent='space-between'>
          <Typography fontSize='20px' color='primary' fontWeight={700}>
            스케줄러 이용 방법
          </Typography>
          <OutputIcon
            sx={{
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={() => {
              setOpenAlert(false);
            }}
          />
        </Box>
        <Box
          position='absolute'
          top='70px'
          left={pageCount === 1 ? "30px" : "-385px"}
          display='flex'
          justifyContent='space-between'
          // bgcolor='grey'
          width='700px'
          // className='mapScrollBar'
          height='80%'
          sx={{ transitionDuration: "0.5s", transitionProperty: "all" }}
        >
          <Box
            /* bgcolor='red' */ width='280px'
            marginRight='20px'
            className='mapScrollBar'
            height='100%'
          >
            <BoxSubject>일정</BoxSubject>
            <TypoTitle>일정 추가하기</TypoTitle>
            <TypoContent>
              캘린더에서 원하시는 기간을 마우스로 드래그하여 선택하시면 일정
              입력창이 나타납니다.
            </TypoContent>
            <TypoTitle>일정 상세보기</TypoTitle>
            <TypoContent>
              캘린더의 생성된 이벤트를 클릭 하시면 상세 내용을 볼 수 있습니다.
            </TypoContent>
            <TypoTitle>날짜 변경</TypoTitle>
            <TypoContent>
              변경하고자하는 이벤트를 원하시는 날짜로 하는 날짜로 드래그 & 드롭
              합니다.
              <br />
              또한, 이벤트의 끝을 잡고 늘이면 기간을 연장하실 수 있습니다.
            </TypoContent>
            <TypoTitle>일정 내용 수정</TypoTitle>
            <TypoContent>
              상세보기에서 <EditIcon /> 버튼을 클릭하시면 일정 내용을 수정하실
              수 있습니다.
            </TypoContent>
            <TypoTitle>일정 삭제</TypoTitle>
            <TypoContent>
              상세보기에서 <DeleteIcon /> 버튼을 클릭하시면 일정을 삭제하실 수
              있습니다.
            </TypoContent>
            <TypoTitle>시간 단위 일정 추가</TypoTitle>
            <TypoContent>
              우측 상단의 WEEK, DAY 메뉴를 통해 시간 단위의 일정을 추가하실 수
              있습니다.
            </TypoContent>
            <TypoTitle>모든 일정 목록으로 확인하기</TypoTitle>
            <TypoContent>
              우측 상단의 LIST 메뉴를 통해 모든 일정을 목록 형태으로 보실 수
              있습니다.
            </TypoContent>
            <TypoTitle> 다른 달로 이동하기</TypoTitle>
            <TypoContent>
              좌측 상단의 &lt;, &gt; 버튼을 통해서 메뉴에 따라 월,주,일 단위로
              캘린더를 이동하실 수 있습니다.
            </TypoContent>
            <TypoTitle> 오늘 날짜로 돌아오기</TypoTitle>
            <TypoContent>
              좌측 상단의 TODAY버튼을 눌러, 다른 달로 이동하였을 경우 오늘
              날짜로 빠르게 돌아오실 수 있습니다.
            </TypoContent>
          </Box>
          <Box
            /* bgcolor='blue' */ width='280px'
            marginLeft='40px'
            className='mapScrollBar'
            height='100%'
          >
            <BoxSubject>카테고리</BoxSubject>
            <TypoTitle>카테고리별 일정 확인</TypoTitle>

            <TypoTitle>카테고리 편집</TypoTitle>
            <TypoTitle>새로운 카테고리 추가</TypoTitle>
            <Typography>
              원하시는 기간을 드래그하면 일정 입력창이 나타납니다.
            </Typography>
            <TypoTitle>색상변경</TypoTitle>
            <Typography>
              생성된 이벤트를 클릭하면 상세 내용을 볼 수 있습니다.
            </Typography>
            <TypoTitle>삭제</TypoTitle>
          </Box>
        </Box>
        <Box
          position='fixed'
          bottom='30px'
          right='30px'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <ArrowBackIosNewIcon
            sx={{
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={() =>
              setPageCount((prev) => (prev === 2 ? prev - 1 : prev))
            }
          />
          <Typography>&nbsp;{pageCount} / 2&nbsp;</Typography>
          <ArrowForwardIosIcon
            sx={{
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={() =>
              setPageCount((prev) => (prev === 1 ? prev + 1 : prev))
            }
          />
        </Box>
      </Box>
      <SpeedDial
        ariaLabel='Add count'
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 50 }}
        icon={<QuizIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              handleChoiceModal(action.value);
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

// style ==========================================

const BoxSubject = styled(Box)({
  borderTop: "1px solid #07553b",
  borderBottom: "1px solid #07553b",
  padding: "5px",
  color: "#07553b",
  backgroundColor: "rgba(193, 193, 193, .25)",
  fontWeight: "700",
  textAlign: "center",
});
const TypoTitle = styled(Paper)({
  borderRadius: "20px",
  padding: "0 10px",
  fontSize: "16px",
  color: "#fff",
  backgroundColor: "#07553b",
  fontWeight: "400",
  marginTop: "20px",
  marginBottom: "5px",
  width: "fit-content",
});
const TypoContent = styled(Typography)({
  fontSize: "14px",
  paddingLeft: "10px",
  paddingRight: "10px",
  // color: "#07553b",
  // fontWeight: "700",
  // marginTop: "20px",
});

// ================================================
