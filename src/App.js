import React, { useEffect, useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { logoutAdmin, cookieTokenValidFunc } from "./actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faUsers,
  faBars,
  faMoneyCheck,
  faHouseUser,
  faHandHoldingUsd,
  faMoneyBillAlt,
  faArrowLeft,
  faEye,
  faEyeSlash,
  faEdit,
  faPlus,
  faTrashAlt,
  faUserTag,
  faCalendarAlt,
  faLayerGroup,
  faInfoCircle,
  faComment,
  faFileInvoiceDollar,
  faClipboardList,
  faList,
  faSearch,
  faAngleUp,
  faAngleDown,
  faFileDownload,
  faAngleRight,
  faAngleLeft,
  faCheck,
  faMoneyCheckAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import {
  Main,
  Employee,
  AddEmployee,
  Department,
  Payhead,
  Position,
  PayStructure,
  SignIn,
  ForgotPassword,
  NewPassword,
  ImportExcelfile,
  EmployeeSignIn,
  ProfileSettings,
  Voucher,
  BankSchedule,
  PageNotFound,
  Bank,
  Payroll,
  PaySlip,
  Loan,
  LoanRequest,
  Dashboard,
  SignUp,
  CreateUserRoles,
} from "./pages";
import { GlobalStyle } from "./styles/globalStyles";
import MonthlyPayhead from "./pages/MonthlyPayhead";
import { ScreenResolution } from "./components";
import { CHECK_COOKIE_TOKEN_VALID_RESET } from "./types/auth";
library.add(
  fab,
  faBars,
  faUsers,
  faMoneyCheck,
  faHouseUser,
  faUserTag,
  faHandHoldingUsd,
  faMoneyBillAlt,
  faArrowLeft,
  faEye,
  faEyeSlash,
  faEdit,
  faCalendarAlt,
  faTrashAlt,
  faPlus,
  faLayerGroup,
  faInfoCircle,
  faComment,
  faFileInvoiceDollar,
  faClipboardList,
  faList,
  faSearch,
  faAngleUp,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faFileDownload,
  faCheck,
  faMoneyCheckAlt,
  faHome
);

function App() {
  // dispatch init
  const dispatch = useDispatch();

  // redux state
  const cookieValid = useSelector((state) => state.checkCookieTokenValid);
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);

  useEffect(() => {
    dispatch(cookieTokenValidFunc());
  }, [dispatch]);

  useEffect(() => {
    if (
      cookieValid?.error === "Authorization is Invalid!" ||
      cookieValid?.error === "no token was passed"
    ) {
      dispatch(logoutAdmin("token invalid!"));
      dispatch({ type: CHECK_COOKIE_TOKEN_VALID_RESET });
    }

    if (
      cookieValid?.status &&
      !adminInfo?.isAuthenticated &&
      !adminInfo?.user?.name
    ) {
      dispatch(logoutAdmin());
      dispatch({ type: CHECK_COOKIE_TOKEN_VALID_RESET });
    }
  }, [cookieValid, dispatch, adminInfo]);

  const mode = "light";
  // const mode = useSelector((state) => state.global.mode);
  let theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  theme = responsiveFontSizes(theme);

  // process.env.CI = true;;
  process.env.CI = false;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <ScreenResolution />
        {/* <Redirect from="/" to="/signin" /> */}
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/signin" render={() => <SignIn />} />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route
            exact
            path="/create-user-roles"
            render={() => <CreateUserRoles />}
          />

          <Route
            exact
            path="/employee-signin"
            render={() => <EmployeeSignIn />}
          />

          <Route exact path="/dashboard" component={Dashboard} />

          <Route exact path="/employee" component={Employee} />

          <Route exact path="/profile-settings" component={ProfileSettings} />

          <Route exact path="/new-employee" component={AddEmployee} />

          <Route exact path="/pay-slip" component={PaySlip} />

          <Route exact path="/import-excel" component={ImportExcelfile} />

          <Route exact path="/department" component={Department} />

          <Route exact path="/pay-head" component={Payhead} />

          <Route exact path="/monthly-payhead" component={MonthlyPayhead} />

          <Route exact path="/position" component={Position} />

          <Route exact path="/pay-structure" component={PayStructure} />

          <Route exact path="/voucher" component={Voucher} />

          <Route exact path="/bank-schedule" component={BankSchedule} />

          <Route exact path="/payroll" component={Payroll} />

          <Route exact path="/loan" component={Loan} />

          <Route exact path="/loan-request" component={LoanRequest} />

          <Route exact path="/bank" component={Bank} />

          <Route exact path="/forgot-password" component={ForgotPassword} />

          <Route exact path="/new-password/:token" component={NewPassword} />

          {/* <Footer /> */}
          <PageNotFound />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
