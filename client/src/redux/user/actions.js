import { SET_HAS_SID_COOKIE, SET_SESSION } from "./types";
import axios from "axios";

export const setHasSidCookie = (hasSidCookie) => ({
  type: SET_HAS_SID_COOKIE,
  payload: hasSidCookie,
});

// 세션객체를 받아오는 액션
export const getSession = () => (dispatch) => {
  if (!getCookie("sid")) return;
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
    .then((res) => {
      dispatch({ type: SET_SESSION, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

// 브라우저에 저장된 쿠키를 받아오는 함수  =========================
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
//=================================================================
