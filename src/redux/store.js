import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import sidCookieReducer from "./user/reducer";
import { setHasSidCookie, getSession } from "./user/actions";

const store = createStore(sidCookieReducer, applyMiddleware(thunk));

// 초기 상태 설정 시 세션객체를 받아오는 함수 호출
store.dispatch(getSession());

const checkSidCookie = () => {
  // 브라우저에 저장된 쿠키를 받아오는 함수
  const sidCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const hasSidCookie = Boolean(sidCookie("sid"));
  store.dispatch(setHasSidCookie(hasSidCookie));
};

// 1초마다 checkSidCookie 함수 호출
setInterval(checkSidCookie, 1000);

export default store;
