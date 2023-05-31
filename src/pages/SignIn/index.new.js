import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ButtonComp, NavbarComp } from "../../components";
import {
  Box,
  Grid,
  useTheme,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  Link,
} from "@mui/material";
import screenShot from "../../assets/img/screenshot.png";
import upayrollLogo from "../../assets/img/u-payLogo2.png";
import { useState } from "react";

const SignIn = () => {
  const theme = useTheme();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <NavbarComp />
      <Box
        sx={{
          height: "100vh",
          bgcolor: theme.palette.secondary[100],
          "& .MuiTypography-root": {
            // p: "0 .5rem",
          },
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, sm: 3, md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
          // direction={rowReverse}
        >
          <Grid item xs={12} sm={6} md={6}>
            <Box
              sx={{
                position: "fixed",
                height: "100%",
                width: "50%",
              }}
            >
              <Box
                sx={{
                  bgcolor: theme.palette.primary[500],
                  margin: "1rem 0 1rem 1rem",
                  borderRadius: "1rem",
                  position: "fixed",
                  height: "96%",
                  width: "50%",
                  padding: "10rem 6rem 6rem 6rem",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h2"
                  color={theme.palette.secondary[100]}
                  sx={{ width: "30rem" }}
                >
                  The simplest way to pay your workforce
                </Typography>
                <Typography
                  variant="h5"
                  color={theme.palette.secondary[100]}
                  sx={{ mt: "1.5rem", fontWeight: "300" }}
                >
                  Enter your credentials to access your account
                </Typography>
                <Box
                  sx={{
                    // bgcolor: "green !important",
                    mt: "1.5rem",
                    display: "flex",
                    "& img": {
                      m: "1.5rem auto 0 auto",
                      width: "100%",
                    },
                  }}
                >
                  <img src={screenShot} alt="screenshoot" />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              sx={{
                display: "flex",
                overflow: "hidden",
                position: "fixed",
                height: "100%",
                width: "50%",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  m: "auto",
                  width: { sx: "80%", sm: "70%", md: "50", lg: "47%" },
                  "& .MuiTextField-root": {
                    width: "100%",
                    "&:focus": {
                      border: "none",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: ".8rem",
                    borderRadius: ".5rem",
                    p: "0 .4rem",
                    "&:focus": {
                      border: "none",
                    },
                  },
                  "& .MuiFormLabel-root": {
                    fontSize: ".8rem",
                    mb: ".5rem",
                    fontWeight: "500",
                    color: theme.palette.secondary[1000],
                  },
                }}
              >
                <Box
                  sx={{
                    mb: "1.5rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      "& .MuiTypography-root": {
                        fontWeight: "700",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        mb: ".5rem",
                        "& img": {
                          width: "2.5rem",
                          m: "auto 0",
                        },
                      }}
                    >
                      <img src={upayrollLogo} alt="logo" />
                    </Box>
                    <Typography
                      variant="h3"
                      color="initial"
                      sx={{ m: "auto 0 auto .8rem" }}
                    >
                      Payroll
                    </Typography>
                    <Typography
                      variant="h3"
                      color={theme.palette.primary[500]}
                      sx={{ m: "auto 0 auto .4rem" }}
                    >
                      System
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: ".8rem",
                      fontWeight: "500",
                      color: theme.palette.secondary[800],
                      mb: "1rem",
                    }}
                  >
                    Enter your email and password to sign in
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={{ xs: 3, sm: 1.5, md: 1.5 }}
                  columns={{ xs: 12, sm: 12, md: 12 }}
                >
                  <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Email</FormLabel>
                    <TextField
                      variant="outlined"
                      // sx={{}}
                      placeholder="Your email address"
                      id=""
                      label=""
                      // value={}
                      // onChange={}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    {/* <FormControl> */}
                    <FormLabel required>Password</FormLabel>
                    <TextField
                      variant="outlined"
                      // sx={{}}
                      placeholder="Your password"
                      id=""
                      label=""
                      // value={}
                      // onChange={}
                    />
                    {/* </FormControl> */}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          p: "0 0 1rem 0",
                          "& .MuiTypography-root": {
                            fontWeight: "500",
                            fontSize: ".7rem",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          <Box
                            sx={{
                              display: "flex",
                              width: "2.1rem",
                              height: "1.1rem",
                              borderRadius: " 1rem",
                              cursor: "pointer",
                              bgcolor: toggle
                                ? theme.palette.primary[500]
                                : theme.palette.secondary[700],
                              transition: "all 250ms ease-in-out",
                            }}
                            onClick={handleToggle}
                          >
                            <Box
                              sx={{
                                width: ".7rem",
                                height: ".7rem",
                                borderRadius: " 1rem",
                                bgcolor: theme.palette.secondary[100],
                                m: toggle
                                  ? "auto .2rem auto auto"
                                  : "auto auto auto .2rem",
                                transition: "all 250ms ease-in-out",
                              }}
                            ></Box>
                          </Box>
                          <Typography
                            variant="h6"
                            color="initial"
                            sx={{ m: "auto auto auto .3rem" }}
                          >
                            Remember me
                          </Typography>
                        </Box>
                        <Link
                          to="/forgot-password"
                          component={RouterLink}
                          underline="none"
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: theme.palette.primary[500] }}
                          >
                            Forgot password?
                          </Typography>
                        </Link>
                      </Box>

                      <ButtonComp
                        variant="contained"
                        size="small"
                        sx={{
                          textTransform: "uppercase",
                          fontSize: ".7rem !important",
                          width: "100%",
                          p: ".7rem 0",
                          borderRadius: ".5rem",
                          color: theme.palette.secondary[100],
                          "&:hover": {
                            color: theme.palette.secondary[100],
                            bgcolor: theme.palette.primary.main,
                          },
                        }}
                        childern="Sign in"
                        // value={}
                        // onChange={}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          p: ".6rem 0",
                          "& .MuiTypography-root": {
                            fontWeight: "500",
                            fontSize: ".8rem",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", m: "auto" }}>
                          <Typography variant="h6" color="initial">
                            Don't have an account?
                          </Typography>
                          <Link
                            to="/signup"
                            component={RouterLink}
                            underline="none"
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: theme.palette.primary[500],
                                m: "auto auto auto .4rem",
                              }}
                            >
                              Sign up
                            </Typography>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignIn;
