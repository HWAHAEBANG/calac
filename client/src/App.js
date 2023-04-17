import "./assets/css/App.css";
import Home from "./components/common/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  // 로그아웃을 하지 않는 채 창을 닫으면, 현재 있는 세션의 기한을 바꿔 만료시켜버린다.=======
  // window.addEventListener("beforeunload", () => {
  //   document.cookie = "sid=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //   document.cookie =
  //     "connect.sid=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // });
  //===================================================================================

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1600,
      xl: 1920,
    },
  },
  smallfont: "skew(-0.05deg)",
  palette: {
    primary: {
      main: "#07553B",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: [
      "Pretendard",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Apple SD Gothic Neo"',
      '"Helvetica"',
      "Arial",
      '"Noto Sans KR"',
      "sans-serif",
    ].join(","),
  },
  overrides: {},
});
