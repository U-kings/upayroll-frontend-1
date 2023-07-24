import React, { useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  logoutAdmin,
  //  cookieTokenValidFunc
} from "./actions/auth";
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
  ComfirmPage,
  Home,
} from "./pages";
import { GlobalStyle } from "./styles/globalStyles";
import MonthlyPayhead from "./pages/MonthlyPayhead";
import { config } from "./util/config/config";
import { CHECK_COOKIE_TOKEN_VALID_RESET } from "./types/auth";
import { useIdleTimer } from "react-idle-timer";
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
  const [remaining, setRemaining] = useState(0);
  const [state, setState] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const toggleMobileMenu = () => {
    setMobileToggle(!mobileToggle);
  };

  // useEffect(() => {
  //   dispatch(cookieTokenValidFunc());
  // }, [dispatch]);

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

  const onPresenceChange = (presence) => {
    // Handle state changes in one function
    const isIdle = presence.type === "idle";
    const isPrompted = presence.type === "active" && presence.prompted;
    const isActive = presence.type === "active" && !presence.prompted;

    if (isIdle) {
      // setState("Idle");
    } else if (isPrompted) {
      // setState("Prompted");
    } else if (isActive) {
      // setState("Active");
    }
  };

  const onIdle = () => {
    // Close Modal Prompt
    // Do some idle action like log out your user
    // setState(true);

    //logout user out after idle timeout
    dispatch(logoutAdmin("no token was passed"));
    // dispatch(logoutAdmin());
  };

  // const idleTimer = useIdleTimer({ onPresenceChange });

  const {
    start,
    reset,
    activate,
    pause,
    resume,
    isIdle,
    isPrompted,
    isLeader,
    isLastActiveTab,
    getTabId,
    getRemainingTime,
    getElapsedTime,
    getLastIdleTime,
    getLastActiveTime,
    getIdleTime,
    getTotalIdleTime,
    getActiveTime,
    getTotalActiveTime,
  } = useIdleTimer({
    onPresenceChange,
    // onPrompt,
    onIdle,
    // onActive,
    // onAction,
    timeout: 1000 * 60 * 5,
    promptBeforeIdle: 0,
    events: [
      "mousemove",
      "keydown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
      "touchstart",
      "touchmove",
      "MSPointerDown",
      "MSPointerMove",
      "visibilitychange",
      "focus",
    ],
    immediateEvents: [],
    debounce: 0,
    throttle: 0,
    eventsThrottle: 200,
    element: document,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    name: "idle-timer",
    syncTimers: 0,
    leaderElection: false,
  });

  useEffect(() => {
    if (adminInfo?.isAuthenticated && adminInfo?.user?.name) {
      const interval = setInterval(() => {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  });

  // useEffect(() => {
  //   const sessionKey = sessionStorage.getItem("item_key");
  //   if (sessionKey === null) {
  //     dispatch(logoutAdmin("no token was passed"));
  //   }
  // }, [dispatch]);

  return (
    // <Router basename="/upayroll.web">
    <Router basename={config.url.BASENAME}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CssBaseline />
        {/* <Redirect from="/" to="/signin" /> */}
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/home" component={() => <Home />} />
          <Route exact path="/signin" render={() => <SignIn />} />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route
            exact
            path="/confirm-email"
            // path="/confirm-email/:resetToken"
            render={() => <ComfirmPage />}
          />
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
          <Route
            exact
            path="/dashboard"
            render={() => (
              <Dashboard
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/employee"
            render={() => (
              <Employee
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/profile-settings"
            render={() => (
              <ProfileSettings
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/new-employee"
            render={() => (
              <AddEmployee
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/pay-slip"
            render={() => (
              <PaySlip
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/import-excel"
            render={() => (
              <ImportExcelfile
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/department"
            render={() => (
              <Department
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/pay-head"
            render={() => (
              <Payhead
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/monthly-payhead"
            render={() => (
              <MonthlyPayhead
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/position"
            render={() => (
              <Position
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/pay-structure"
            render={() => (
              <PayStructure
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/voucher"
            render={() => (
              <Voucher
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/bank-schedule"
            render={() => (
              <BankSchedule
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/payroll"
            render={() => (
              <Payroll
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/loan"
            render={() => (
              <Loan
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/loan-request"
            render={() => (
              <LoanRequest
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/bank"
            render={() => (
              <Bank
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/forgot-password"
            render={() => (
              <ForgotPassword
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          <Route
            exact
            path="/new-password"
            render={() => (
              <NewPassword
                toggle={toggle}
                toggleMenu={toggleMenu}
                mobileToggle={mobileToggle}
                toggleMobileMenu={toggleMobileMenu}
              />
            )}
          />
          {/* <Footer /> */}
          <PageNotFound />
        </Switch>
      </ThemeProvider>
    </Router>
    // </Router>
  );
}

export default App;
