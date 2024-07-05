import { Box, Container, Input, Typography, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import ButtonComp from "../common/ButtonComp";
import axios from "axios";
import { urlConfig } from "../../util/config/config";
import cookie from "js-cookie";
import ErrorBox from "../ErrorBox";
import { Spinner, Successful } from "../../modals";

const Footer = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showSucess, setShowSuccess] = useState("");
  const [showError, setShowError] = useState("");

  const token = cookie.get("token");
  const config = useMemo(() => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);

  const sendEmail = async () => {
    // if()

    setIsLoading(true);
    const body = { email: email };
    try {
      const { data } = await axios.post(
        `${urlConfig.url.PROXYURL}api/email/get-started`,
        body,
        config
      );

      if (data) {
        setShowSuccess("Email Successfully");
      }
    } catch (error) {
      // setShowError(error);
      setIsLoading(false);
      setShowError(
        error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message
      );
    }
  };

  useEffect(() => {
    let timeoutId;

    if (showError !== "") {
      timeoutId = setTimeout(() => {
        setShowError("");
      }, 6000);
    }

    return () => {
      // Clear the timeout when the component unmounts or when showError changes
      clearTimeout(timeoutId);
    };
  }, [showError]);

  const popup7 = () => {
    if (showSucess) {
      setIsLoading(false);
      setShowSuccess("");
      setEmail("");
    }
  };

  const successMessage = (
    <p>
      Hello, 🖐
      <br /> you have successfully subscribed for the Upayroll newsletter.
    </p>
  );

  return (
    <>
      {showError && <ErrorBox fixed errorMessage={showError} />}
      {isLoading && <Spinner />}
      <Successful
        isOpen7={showSucess && !showError && !isLoading}
        popup7={popup7}
        message={successMessage}
        // message="Email sent Successfully!"
      />
      <Box
        sx={{
          bgcolor: theme.palette.neutral[500],
          p: { xs: "4rem 0", lg: "10rem 0" },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: {
                xs: "block",
                lg: "flex",
              },
              "& .MuiTypography-root": {
                color: theme.palette.secondary[100],
                textAlign: "center",
              },
              "& .MuiTypography-h1": {
                fontSize: "calc(2rem + 0.5vw)",
                // fontSize: "3.5rem",
                fontWeight: "500",
                textAlign: { xs: "left", lg: "center" },
              },
              "& .MuiTypography-h4": {
                mt: "1rem",
                textAlign: "left",
                fontSize: "1.3rem",
                fontWeight: "100",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: "1",
                "& .MuiBox-root": {
                  m: "auto",
                  p: { xs: "1.5rem 0", lg: "1.5rem" },
                },
              }}
            >
              <Box>
                <Typography variant="h1">
                  Get started with UPayroll today
                </Typography>
                <Typography variant="h4">
                  Join the other 15,000+ companies managing their global teams
                  with Upayroll
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flex: "1",
                width: "100%",
                "& > .MuiBox-root": {
                  m: "auto",
                  borderRadius: ".7rem",
                  width: { xs: "100%", lg: "55%" },
                },
                "& .MuiInput-root": {
                  m: "auto",
                  width: "100%",
                  p: ".7rem 2rem",
                  "&::after": {
                    borderBottom: "none",
                  },
                  "&:focus": {
                    outline: "none",
                    borderBottom: "none",
                    borderColor: "none",
                  },
                },
              }}
            >
              <Box sx={{ bgcolor: theme.palette.secondary[500] }}>
                <Box display="flex" justifyContent="space-between">
                  <Input
                    disableUnderline={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                  />
                  <ButtonComp
                    onClick={sendEmail}
                    variant="contained"
                    size="small"
                    sx={{
                      p: ".8rem 2.2rem",
                      borderRadius: ".7rem",
                      color: theme.palette.secondary[500],
                      "&:hover": {
                        color: theme.palette.secondary[500],
                        bgcolor: theme.palette.blue[500],
                      },
                    }}
                    childern="Send"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box></Box>
      <Box
        sx={{
          bgcolor: theme.palette.blue[500],
          p: { xs: "2rem 0", lg: "2.5rem 0" },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: {
                xs: "block",
                lg: "flex",
              },
              "& .MuiTypography-root": {
                color: theme.palette.secondary[100],
                textAlign: "center",
              },
              "& .MuiTypography-h3": {
                fontWeight: "400",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: "1",
                "& .MuiBox-root": {
                  m: "auto",
                  p: "1rem",
                },
              }}
            >
              <Box>
                <Typography variant="h4">
                  © Copyright 2023. All Rights Reserved.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flex: "1",
                "& > .MuiBox-root": {
                  m: "auto",
                  //   p: "1.5rem",
                  borderRadius: "1rem",
                },
                "& .MuiTypography-root": {
                  m: "auto",
                  p: "0 1.5rem",
                },
              }}
            >
              <Box>
                <Box display="flex">
                  <Typography variant="h4">Disclaimer</Typography>
                  <Typography variant="h4">Privacy Policy</Typography>
                  <Typography variant="h4">Terms of Service</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
