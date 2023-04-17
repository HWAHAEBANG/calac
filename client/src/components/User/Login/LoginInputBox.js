import React, { useState } from "react";
import {
  Box,
  Input,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  ButtonGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const LoginInputBox = () => {
  const navigate = useNavigate();
  // 비밀번호 UI =====================================
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // ===============================================
  // 아이디비번 찾기 새 창으로 띄우기 =================
  const handleFind = (e) => {
    window.open(
      `/login/find${e}`,
      "",
      "top=200, left=200, width=400, height=500"
    );
  };
  // ================================================
  // 입력값 상태관리 =================================
  const [loginInfo, setLoginInfo] = useState({ id: "", pwd: "" });
  const handleLoginInfo = (e) => {
    setLoginInfo((preLoginInfo) => ({
      ...preLoginInfo,
      [e.target.name]: e.target.value,
    }));
  };
  // ================================================
  // 로그인 ==========================================
  const handleSubmit = () => {
    axios
      .post(
        `http://calac.cafe24app.com/users/login`,
        {
          id: loginInfo.id,
          pwd: loginInfo.pwd,
        },
        { withCredentials: true }
      )
      .then((response) => {
        const { success, message, userInfo } = response.data;
        if (success) {
          alert(`${userInfo.name}님, 환영합니다.`);
          navigate("/");
        } else {
          if (message === "wrongId") {
            alert("아이디를 확인해주세요.");
          } else if (message === "wrongPw") {
            alert("비밀번호를 확인해주세요.");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ================================================
  // ################################################
  return (
    <InputBoxWrap>
      <InputInner>
        <Box>
          <TextField
            id='outlined-basic'
            label='아이디'
            variant='outlined'
            sx={{ width: "100%" }}
            name='id'
            onChange={handleLoginInfo}
          />
          <FormControl sx={{ width: "100%", mt: 2 }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>
              비밀번호
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? "text" : "password"}
              name='pwd'
              onChange={handleLoginInfo}
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
              label='Password'
            />
          </FormControl>
        </Box>
        <BtnWrap>
          <Button onClick={handleSubmit} variant='contained'>
            로그인
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant='text' aria-label='text button group'>
              <Link to='/login/signup'>
                <Button>회원가입</Button>
              </Link>
              <Button
                onClick={() => {
                  handleFind("id");
                }}
              >
                아이디 찾기
              </Button>
              <Button
                onClick={() => {
                  handleFind("pw");
                }}
              >
                비밀번호 찾기
              </Button>
            </ButtonGroup>
          </Box>
        </BtnWrap>
      </InputInner>
    </InputBoxWrap>
  );
};

//style=================================================
const InputBoxWrap = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});
const InputInner = styled(Box)({
  width: "30%",
  height: "30%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
const BtnWrap = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export default LoginInputBox;
