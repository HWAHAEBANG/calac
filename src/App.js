import "./assets/css/App.css";
import Home from "./components/common/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Provider} from 'react-redux';
import store from './redux/store';

function App() {
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
