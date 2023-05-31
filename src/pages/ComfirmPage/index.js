import { Box, Container, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { confirmEmailFunc } from "../../actions/auth";
import { ErrorBox } from "../../components";
import { Successful } from "../../modals";
import { CONFIRM_EMAIL_RESET } from "../../types/auth";

const ComfirmationPage = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  const theme = useTheme();

  const location = useLocation();
  const url = location.search;
  // const { resetToken } = useParams();
  const resetToken = new URLSearchParams(url).get("token");
  // const resetToken = this.props.match.params.resetToken;

  const dispatch = useDispatch();
  const confirmEmail = useSelector((state) => state.confirmEmail);
  const {
    adminInfo,
    isLoading: isLoadingToken,
    error: tokenError,
  } = useSelector((state) => state.adminLoginStatus);
  const cookieValid = useSelector((state) => state.checkCookieTokenValid);
  const history = useHistory();

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (adminInfo?.isAuthenticated && adminInfo?.user?.name) {
      history.push("dashboard");
      history.push("/");
    }

    // if (!adminRegister?.isLoading && !adminRegister?.error) {
    //   // setFormData({
    //   //   name: "",
    //   //   logo: "",
    //   //   contactPersonfirstName: "",
    //   //   contactPersonlastName: "",
    //   //   contactPersonEmail: "",
    //   //   contactPersonMobile: "",
    //   //   createdBy: "",
    //   //   authType: "",
    //   // });
    // }
  }, [history, adminInfo, dispatch]);

  useEffect(() => {
    dispatch(confirmEmailFunc(resetToken));
  }, [dispatch, resetToken]);

  useEffect(() => {
    if (confirmEmail?.success)
      setTimeout(() => {
        setShowSuccess(true);
      }, 3000);
  }, [confirmEmail]);

  const popup7 = () => {
    if (confirmEmail?.success) {
      dispatch({ type: CONFIRM_EMAIL_RESET });
      history.push("/");
    }
  };

  return (
    <>
      <Box>
        <Successful
          isOpen7={showSuccess}
          message="Successfully confirmed"
          popup7={popup7}
        />
        <Container maxWidth="lg" sx={{}}>
          <Box display="flex" sx={{ width: "100%", height: "100vh" }}>
            <Box sx={{ m: "auto" }}>
              {confirmEmail?.error && (
                <>
                  <Typography
                    sx={{
                      p: "0",
                      mb: 1,
                      textAlign: "center",
                      fontWeight: "400",
                    }}
                    variant="h2"
                    color={theme.palette.secondary[1000]}
                  >
                    {confirmEmail?.error}
                  </Typography>
                </>
              )}
              {confirmEmail?.success && (
                <>
                  <Typography
                    sx={{
                      p: "0",
                      mb: 1,
                      textAlign: "center",
                      fontWeight: "400",
                    }}
                    variant="h2"
                    color={theme.palette.secondary[1000]}
                  >
                    Please wait while we verify your email...
                  </Typography>
                  <Typography
                    sx={{ p: "0", textAlign: "center", fontWeight: "400" }}
                    variant="h2"
                    color={theme.palette.secondary[1000]}
                  >
                    we will redirect you to the login page shortly.
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ComfirmationPage;
