import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const ChangeUserInfo = ({ hasSidCookie }) => {
  //
  const navigate = useNavigate();

  // 세션객체에서 받아오고, 수정되는 객체 상태 관리 ===================
  const [sessionUserInfo, setSessionUserInfo] = useState({
    id: "",
    pwd: "",
    pwdCheck: "",
    name: "",
    birth: "",
    gender: "",
    phone: "",
    quiz: "",
    answer: "",
    emailId: "",
    emailDomains: "",
    no: "",
    createdAt: "",
    updatedAt: "",
  });

  const handleSessionUserInfo = (e) => {
    setSessionUserInfo({
      ...sessionUserInfo,
      [e.target.name]: e.target.value,
    });
  };
  //=================================================================
  // 브라우저에 저장된 쿠키를 받아오는 함수  =========================
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  //=================================================================
  //서버 세션객체에 저장되어 있는 정보를 가져옴 ========================
  useEffect(() => {
    if (!hasSidCookie) return;
    axios
      .get("http://calac.cafe24app.com/login/user-info", {
        // 브라우저에 저장되어있는 쿠키를 참조해서 권한 획득
        headers: {
          Authorization: `Bearer ${getCookie("sid")}`,
        },
        // 서버와 포트가 달라 CORS를 사용했기 때문에 withCredentials 명시해야함.
        //이 속성을 true로 설정하면 브라우저는 쿠키를 포함한 인증 정보를 서버에게 전달
        withCredentials: true,
      })
      .then((response) => {
        const { success, userInfo } = response.data;
        // 성공적으로 유저 정보를 받아온 경우 : 객체에 저장.
        if (success) {
          const parseEmailId = userInfo.email && userInfo.email.split("@")[0];
          const parseEmailDomains =
            "@" + (userInfo.email && userInfo.email.split("@")[1]);

          setSessionUserInfo((prev) => ({
            ...prev,
            ...userInfo,
            emailId: parseEmailId,
            emailDomains: parseEmailDomains,
          }));
        } else {
          // 유저 정보가 없는 경우
          // console.log("세션객체 Unauthorized"); //  success 아니면 error 갈듯.
        }
      })
      .catch((error) => {
        console.log(error); // 에러 발생 시 에러 메시지 출력
      });
  }, []);
  //=================================================================
  // 인증 상태값 관리 ================================================
  const [authInfo, setAuthInfo] = useState({ id: "", pwd: "" });
  const handleAuthInfo = (e) =>
    setAuthInfo((prev) => ({
      ...prev,
      id: sessionUserInfo.id,
      pwd: e.target.value,
    }));
  //=================================================================
  // 인증 요청 =======================================================
  const [unauthorized, setUnauthorized] = useState(true);
  const handleSubmitAuthInfo = () => {
    axios
      .post(
        `http://calac.cafe24app.com/login`,
        {
          id: authInfo.id,
          pwd: authInfo.pwd,
        },
        { withCredentials: true }
      )
      .then((response) => {
        const { success, message, userInfo } = response.data;
        if (success) {
          setUnauthorized(false);
          alert("인증이 완료되었습니다. 정보 수정을 진행하세요.");
        } else {
          setUnauthorized(true);
          alert("일치하지 않는 비밀번호 입니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //=================================================================
  //수정된 정보 DB에 UPDATE ==========================================
  const handleSave = () => {
    axios
      .post(
        `http://calac.cafe24app.com/login/changeUserInfo`,
        {
          id: sessionUserInfo.id,
          pwd: sessionUserInfo.pwd,
          name: sessionUserInfo.name,
          birth: sessionUserInfo.birth,
          gender: sessionUserInfo.gender,
          phone: sessionUserInfo.phone,
          quiz: sessionUserInfo.quiz,
          answer: sessionUserInfo.answer,
          emailId: sessionUserInfo.emailId,
          emailDomains: sessionUserInfo.emailDomains,
          no: sessionUserInfo.no,
          createdAt: sessionUserInfo.createdAt,
          updatedAt: sessionUserInfo.updatedAt,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (
          window.confirm(
            `변경이 완료되었습니다. 메인화면으로 이동하시겠습니까?`
          )
        ) {
          navigate("/");
          setSessionUserInfo({
            id: "",
            notDuplicated: false,
            pwd: "",
            pwdCheck: "",
            name: "",
            birth: "",
            gender: "",
            phone: "",
            quiz: "",
            answer: "",
            emailId: "",
            emailDomains: "",
            no: "",
            createdAt: "",
            updatedAt: "",
          });
        }
      })
      .catch(() => {
        alert("변경 실패 관리자에게 문의하세요.");
      })
      .finally(() => {});
  };
  //=================================================================
  // 비밀번호, 비밀번호 확인을 제외한 객체의 값중에 빈 문자열이 있는지 확인
  const allValuesNotEmptyExceptPwd = Object.entries(sessionUserInfo)
    .filter(([key]) => key !== "pwd" && key !== "pwdCheck")
    .every(([key, val]) => val !== "");
  // 회원가입 정보 DB에 INSERT ========================================
  const handleSubmit = () => {
    if (!sessionUserInfo.notDuplicated) {
      alert("아이디 중복을 확인해주세요.");
      return;
    }
    if (sessionUserInfo.pwd !== sessionUserInfo.pwdCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const {
      id,
      pwd,
      name,
      birth,
      gender,
      phone,
      quiz,
      answer,
      emailId,
      emailDomains,
    } = sessionUserInfo;
    axios
      .post("http://calac.cafe24app.com/login/insert", {
        id,
        pwd,
        name,
        birth,
        gender,
        phone,
        quiz,
        answer,
        emailId,
        emailDomains,
      })
      .then((response) => {
        if (
          window.confirm(
            `변경이 완료되었습니다. 메인화면으로 이동하시겠습니까?`
          )
        ) {
          navigate("/");
          setSessionUserInfo({
            id: "",
            pwd: "",
            pwdCheck: "",
            name: "",
            birth: "",
            gender: "",
            phone: "",
            quiz: "",
            answer: "",
            emailId: "",
            emailDomains: "",
          });
        }
      })
      .catch(() => {
        alert("가입 실패 관리자에게 문의하세요.");
      })
      .finally(() => {});
  };

  //============================================
  // 패스워드 UI 관련 ===========================
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // ==========================================
  return (
    <BoxWrap component='form' noValidate autoComplete='off'>
      <BoxInner>
        <Typography
          color='primary'
          fontWeight={700}
          fontSize='20px'
          marginBottom='10px'
        >
          회원 정보 수정
        </Typography>
        <Typography fontSize='12px' color='primary'>
          수정을 진행하시려면 먼저 "기존 비밀번호"를 통해 인증해주세요.
        </Typography>
        <TextField
          name='id'
          value={(sessionUserInfo && sessionUserInfo.id) || ""}
          id='outlined-basic'
          label='아이디'
          variant='outlined'
          fullWidth
          size='small'
          disabled
        />
        <Box display='flex' justifyContent='space-between' width='100%'>
          <FormControl variant='outlined' fullWidth size='small'>
            <InputLabel htmlFor='outlined-adornment-password'>
              기존 비밀번호 *
            </InputLabel>
            <OutlinedInput
              name='pwd'
              onChange={handleAuthInfo}
              id='outlined-adornment-password'
              type={showPassword ? "text" : "password"}
              error={unauthorized}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='기존 비밀번호 *'
            />
          </FormControl>
          <Button
            variant='outlined'
            sx={{ width: "30px", marginLeft: "10px" }}
            onClick={handleSubmitAuthInfo}
          >
            인증
          </Button>
        </Box>
        <FormControl variant='outlined' fullWidth size='small'>
          <InputLabel htmlFor='outlined-adornment-password'>
            새 비밀번호
          </InputLabel>
          <OutlinedInput
            name='pwd'
            onChange={handleSessionUserInfo}
            id='outlined-adornment-password'
            type={showPassword ? "text" : "password"}
            disabled={unauthorized}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='새 비밀번호'
          />
        </FormControl>
        <Box sx={{ width: "100%" }}>
          <FormControl
            sx={{ mb: "2px" }}
            variant='outlined'
            fullWidth
            size='small'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              새 비밀번호 확인
            </InputLabel>
            <OutlinedInput
              name='pwdCheck'
              onChange={handleSessionUserInfo}
              error={
                sessionUserInfo.pwd === sessionUserInfo.pwdCheck ? false : true
              }
              disabled={unauthorized}
              id='outlined-adornment-password'
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='새 비밀번호 확인'
            />
          </FormControl>
          <Typography
            fontSize='12px'
            width='100%'
            paddingLeft='10px'
            color={
              unauthorized
                ? "grey"
                : sessionUserInfo.pwd === sessionUserInfo.pwdCheck
                ? "green"
                : "red"
            }
          >
            {sessionUserInfo.pwd || sessionUserInfo.pwdCheck
              ? sessionUserInfo.pwd === sessionUserInfo.pwdCheck
                ? "비밀번호가 일치합니다."
                : "비밀번호가 일치하지 않습니다."
              : "새 비밀번호를 입력해주세요"}
          </Typography>
        </Box>
        <InnerInput
          name='name'
          onChange={handleSessionUserInfo}
          value={(sessionUserInfo && sessionUserInfo.name) || ""}
          id='outlined-basic'
          label='성명'
          variant='outlined'
          size='small'
          disabled={unauthorized}
        />
        <InnerInput
          name='birth'
          onChange={handleSessionUserInfo}
          value={(sessionUserInfo && sessionUserInfo.birth) || ""}
          id='outlined-basic'
          label='생년월일'
          variant='outlined'
          size='small'
          disabled={unauthorized}
        />
        <RadioBox>
          <Typography
            sx={{ width: "20%" }}
            color={unauthorized ? "#c1c1c1" : ""}
          >
            성별
          </Typography>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='gender'
            value={(sessionUserInfo && sessionUserInfo.gender) || ""}
            onChange={handleSessionUserInfo}
          >
            <FormControlLabel
              value='남성'
              control={<Radio />}
              label='남성'
              disabled={unauthorized}
            />
            <FormControlLabel
              value='여성'
              control={<Radio />}
              label='여성'
              disabled={unauthorized}
            />
          </RadioGroup>
        </RadioBox>
        <InnerInput
          name='phone'
          onChange={handleSessionUserInfo}
          value={(sessionUserInfo && sessionUserInfo.phone) || ""}
          id='outlined-basic'
          label='전화번호'
          variant='outlined'
          size='small'
          disabled={unauthorized}
        />
        <TextField
          id='outlined-select-currency'
          select
          label='질문'
          defaultValue=''
          value={(sessionUserInfo && sessionUserInfo.quiz) || ""}
          fullWidth
          name='quiz'
          onChange={handleSessionUserInfo}
          variant='outlined'
          size='small'
          disabled={unauthorized}
        >
          {SELECTQUIZ.map((option, index) => (
            <MenuItem key={index} value={option.value && option.value}>
              <Box display='flex' alignItems='center'>
                <Typography>{option.label}</Typography>
              </Box>
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id='outlined-basic'
          label='답변'
          name='answer'
          onChange={handleSessionUserInfo}
          value={(sessionUserInfo && sessionUserInfo.answer) || ""}
          variant='outlined'
          fullWidth
          size='small'
          disabled={unauthorized}
        />
        <Box display='flex' alignItems='center' sx={{ width: "100%" }}>
          <TextField
            id='outlined-basic'
            label='이메일 아이디'
            name='emailId'
            onChange={handleSessionUserInfo}
            value={sessionUserInfo && sessionUserInfo.emailId}
            variant='outlined'
            fullWidth
            size='small'
            disabled={unauthorized}
          />
          <Typography marginX='10px'>@</Typography>
          <TextField
            id='outlined-select-currency'
            select
            label='도메인'
            defaultValue=''
            value={sessionUserInfo && sessionUserInfo.emailDomains}
            fullWidth
            name='emailDomains'
            onChange={handleSessionUserInfo}
            variant='outlined'
            size='small'
            disabled={unauthorized}
          >
            {EMAIL_DOMAINS.map((option, index) => (
              <MenuItem key={index} value={option.value && option.value}>
                <Box display='flex' alignItems='center'>
                  <Typography>{option.label}</Typography>
                </Box>
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          display='flex'
          width='100%'
          flexDirection='column'
          alignItems='start'
        >
          <Typography fontSize='12px' color='grey'>
            회원 가입 일자 :{" "}
            {sessionUserInfo &&
              sessionUserInfo.createdAt &&
              sessionUserInfo.createdAt.split("T")[0]}{" "}
            {sessionUserInfo &&
              sessionUserInfo.createdAt &&
              sessionUserInfo.createdAt.split("T")[1]?.slice(0, 5)}
          </Typography>
          <Typography fontSize='12px' color='grey'>
            최근 수정 일자 :{" "}
            {sessionUserInfo &&
              sessionUserInfo.updatedAt &&
              sessionUserInfo.updatedAt.split("T")[0]}{" "}
            {sessionUserInfo &&
              sessionUserInfo.updatedAt &&
              sessionUserInfo.updatedAt.split("T")[1]?.slice(0, 5)}
          </Typography>
        </Box>
        <SignBtn
          variant='contained'
          disabled={!allValuesNotEmptyExceptPwd}
          onClick={handleSave}
        >
          저장하기
        </SignBtn>
      </BoxInner>
    </BoxWrap>
  );
};
//#####################################################
//style=================================================
const BoxWrap = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});
const BoxInner = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "40%",
  alignItems: "center",
  gap: "10px",
});
const InnerInput = styled(TextField)({
  width: "100%",
});
const RadioBox = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
});
const SignBtn = styled(Button)({
  width: "100%",
  height: "50px",
  fontSize: "20px",
});
//======================================================
//이메일 선택 옵션 ======================================
const EMAIL_DOMAINS = [
  { label: "gmail.com", value: "@gmail.com" },
  { label: "naver.com", value: "@naver.com" },
  { label: "daum.net", value: "@daum.net" },
  { label: "hanmail.net", value: "@hanmail.net" },
  { label: "hotmail.com", value: "@hotmail.com" },
  { label: "yahoo.com", value: "@yahoo.com" },
  { label: "nate.com", value: "@nate.com" },
  { label: "kakao.com", value: "@kakao.com" },
  { label: "icloud.com", value: "@icloud.com" },
  { label: "outlook.com", value: "@outlook.com" },
];
//======================================================
// 질문 선택 옵션========================================
const SELECTQUIZ = [
  {
    label: "어릴적 제일 친한 친구의 이름은?",
    value: "bestFriend",
  },
  {
    label: "나의 고향은?",
    value: "hometown",
  },
  {
    label: "아버지의 성함은?",
    value: "father",
  },
];
//======================================================
//리덕스================================================
const mapStateToProps = (state) => {
  return {
    hasSidCookie: state.hasSidCookie,
  };
};
//======================================================
export default connect(mapStateToProps)(ChangeUserInfo);
