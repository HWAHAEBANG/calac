import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Diary from "./pages/Diary/Diary";
import FinancialLedger from "./pages/FinancialLedger/FinancialLedger";
import FindIdPw from "./pages/User/FindIdPw";
import Scheduler from "./pages/Scheduler/Scheduler";
import SignUp from "./pages/User/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/User/Login";
import Setting from "./pages/Setting/Setting";
import ProtectedRoute from "./pages/ProtectedRoute";
import LedgerGraphSection from "./pages/FinancialLedgerGraph/FinancialLedgerGraph";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
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
        path: "/financialledger/graph",
        element: <LedgerGraphSection />,
      },
      {
        path: "/login/findidpw",
        element: <FindIdPw />,
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
root.render(<RouterProvider router={router} />);

reportWebVitals();
