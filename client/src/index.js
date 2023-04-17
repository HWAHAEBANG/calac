import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound/NotFound";
import Diary from "./pages/Diary/Diary";
import FinancialLedger from "./pages/FinancialLedger/FinancialLedger";
import FindId from "./pages/User/FindIdPw";
import FindPw from "./pages/User/FindIdPw";
import Scheduler from "./pages/Scheduler/Scheduler";
import SignUp from "./pages/User/SignUp";
import Login from "./pages/User/Login";
import Setting from "./pages/Setting/Setting";
import ProtectedRoute from "./pages/ProtectedRoute";
import LedgerTotalSection from "./pages/FinancialLedgerTotal/FinancialLedgerTotal.js";
import { Provider } from 'react-redux';
import store from './redux/store'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/diary",
        element: <Diary />,
      },
      {
        path: "/financialledger",
        element: <FinancialLedger />,
      },
      {
        path: "/financialledger/total",
        element: <LedgerTotalSection />,
      },
      {
        path: "/login/findid",
        element: <FindId />,
      },
      {
        path: "/login/findpw",
        element: <FindPw />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/scheduler",
        element: <Scheduler />,
      },
      {
        path: "/setting",
        element: (
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login/signup",
        element: <SignUp />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} store={store}/>);

reportWebVitals();
