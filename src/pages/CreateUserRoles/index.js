import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  useTheme,
  // InputAdornment,
  // IconButton,
  // FormControl,
  // InputLabel,
  // Input,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  // getNotCreatedRolesFunc,
  registerCompanyAdminFunc,
} from "../../actions/auth";
import { ErrorBox } from "../../components";
import { Spinner, Successful } from "../../modals";
import bgImg from "../../resources/signinBg.jpg";
import {
  CHECK_COOKIE_TOKEN_VALID_RESET,
  REGISTER_COMPANY_ADMIN_RESET,
} from "../../types/auth";

const Createroles = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const registerCompanyAdmin = useSelector(
    (state) => state.registerCompanyAdmin
  );
  // const { notCreatedRoles } = useSelector((state) => state.getNotCreatedRoles);

  const {
    adminInfo,
    isLoading: isLoadingToken,
    error: tokenError,
  } = useSelector((state) => state.adminLoginStatus);
  const cookieValid = useSelector((state) => state.checkCookieTokenValid);
  const history = useHistory();

  const [userRole] = useState(adminInfo?.user?.role || "");
  const [showPassword, setShowPassword] = React.useState(false);
  const [page, setPage] = useState(1);

  const [formData1, setFormData1] = useState({
    name: "",
    email: "",
    role: "HR",
    // password: "",
  });
  const [formData2, setFormData2] = useState({
    name: "",
    email: "",
    role: "Internal Auditor",
    // password: "",
  });
  const [formData3, setFormData3] = useState({
    name: "",
    email: "",
    role: "CEO",
    // password: "",
  });
  const [formData4, setFormData4] = useState({
    name: "",
    email: "",
    role: "Accountant",
    // password: "",
  });

  // console.log(notCreatedRoles);

  useEffect(() => {
    // dispatch(getNotCreatedRolesFunc());
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    }

    if (userRole === "Internal Auditor" || userRole === "Accountant") {
      history.push("dashboard");
    } else if (userRole === "Employee") {
      history.push("dashboard");
    }

    if (!registerCompanyAdmin?.isLoading && !registerCompanyAdmin?.error) {
      if (page === 1) {
        setFormData1({
          name: "",
          email: "",
          role: "HR",
          // password: "",
        });
      } else if (page === 2) {
        setFormData2({
          name: "",
          email: "",
          role: "Internal Auditor",
          // password: "",
        });
      } else if (page === 3) {
        setFormData3({
          name: "",
          email: "",
          role: "CEO",
          // password: "",
        });
      } else if (page === 4) {
        setFormData4({
          name: "",
          email: "",
          role: "Accountant",
          // password: "",
        });
      }
    }
  }, [registerCompanyAdmin, history, adminInfo, userRole, dispatch, page]);
  const popup7 = () => {
    if (registerCompanyAdmin?.success) {
      dispatch({ type: REGISTER_COMPANY_ADMIN_RESET });
      setPage(page + 1);
      if (page === 4) {
        history.push("/profile-settings");
      }
    }
  };

  useEffect(() => {
    if (userRole === "HR") {
      cookie.set("hr", true);
      if (page === 1) {
        setPage(page + 1);
      }
    } else if (userRole === "CEO") {
      cookie.set("ceo", true);
      if (page === 3) {
        setPage(page + 1);
      }
    }

    const cookieHR = cookie.get("hr");
    const cookieIA = cookie.get("ia");
    const cookieCEO = cookie.get("ceo");
    const cookieACCT = cookie.get("acct");
    if (
      JSON.parse(cookieHR ? cookieHR : false) &&
      JSON.parse(cookieIA ? cookieIA : false) &&
      JSON.parse(cookieCEO ? cookieCEO : false) &&
      JSON.parse(cookieACCT ? cookieACCT : false)
    ) {
      history.push("dashboard");
    }
  }, [userRole, page, history]);

  useEffect(() => {
    if (cookieValid.status) {
      history.push("dashboard");
      dispatch({ type: CHECK_COOKIE_TOKEN_VALID_RESET });
    }
  }, [dispatch, history, cookieValid]);

  const handleChange = (form) => (e) => {
    if (form === "form1") {
      setFormData1({ ...formData1, [e.target.name]: e.target.value });
    } else if (form === "form2") {
      setFormData2({ ...formData2, [e.target.name]: e.target.value });
    } else if (form === "form3") {
      setFormData3({ ...formData3, [e.target.name]: e.target.value });
    } else if (form === "form4") {
      setFormData4({ ...formData4, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (form) => (e) => {
    e.preventDefault();
    if (form === "form1") {
      dispatch(registerCompanyAdminFunc(formData1));
      cookie.set("hr", true);
    } else if (form === "form2") {
      dispatch(registerCompanyAdminFunc(formData2));
      cookie.set("ia", true);
    } else if (form === "form3") {
      dispatch(registerCompanyAdminFunc(formData3));
      cookie.set("ceo", true);
    } else if (form === "form4") {
      dispatch(registerCompanyAdminFunc(formData4));
      cookie.set("acct", true);
    }
  };

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  return (
    <>
      {registerCompanyAdmin?.isLoading && <Spinner />}

      <Successful
        popup7={popup7}
        isOpen7={registerCompanyAdmin?.success && !registerCompanyAdmin?.error}
        message="Created Successfully"
      />
      <Box>
        <Box
          sx={{
            display: "flex",
            position: "fixed",
            height: "100%",
            bgcolor: theme.palette.secondary[500],
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              width: "50%",
              // mr: "4rem",
              height: "100vh",
              overflow: "hidden",
              "& img": {
                width: "100%",
              },

              backgroundImage: `url(${bgImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></Box>
          <Box sx={{ width: { xs: "100%", lg: "50%" } }}>
            <Box display="flex" sx={{ m: "auto" }} height="100%">
              <Box sx={{ m: "auto", width: { xs: "100%", lg: "40rem" } }}>
                {!registerCompanyAdmin?.isLoading &&
                  registerCompanyAdmin?.error && (
                    <ErrorBox
                      errorMessage={
                        registerCompanyAdmin?.error ===
                        "Request failed with status code 500"
                          ? "Please Check Your Internet Connection"
                          : registerCompanyAdmin?.error
                      }
                    />
                  )}
                {page === 1 && (
                  // {}
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        m: "auto",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{ fontWeight: "500" }}
                        color={theme.palette.secondary[1000]}
                      >
                        Create HR Profile
                      </Typography>
                      <Box
                        sx={{
                          color: theme.palette.secondary[1000],
                          "& .MuiTextField-root, .MuiFormControl-root": {
                            m: "1.3rem 0",
                            width: "100%",
                            borderBottom: "none !important",
                          },
                          "& .MuiFormLabel-root": {
                            color: theme.palette.grey[700],
                          },
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: theme.palette.grey[800],
                          },
                          "& .MuiInput-root:before": {
                            borderBottom: `1px solid ${theme.palette.grey[900]}`,
                          },
                          "& .MuiInput-root:after": {
                            borderBottom: `1px solid ${theme.palette.grey[600]}`,
                          },
                          "& input:focus": {
                            outline: "none !important",
                            border: "none !important",
                          },
                        }}
                        onSubmit={handleSubmit("form1")}
                        component="form"
                        noValidate
                      >
                        <Stack direction="column">
                          <TextField
                            variant="standard"
                            label="Name"
                            name="name"
                            type="text"
                            required
                            inputProps={{
                              autoComplete: "new-password",
                              form: {
                                autoComplete: "off",
                              },
                            }}
                            value={formData1?.name}
                            onChange={handleChange("form1")}
                          />
                          <TextField
                            variant="standard"
                            type="email"
                            name="email"
                            required
                            inputProps={{
                              autoComplete: "new-password",
                              form: {
                                autoComplete: "off",
                              },
                            }}
                            label="Email Address"
                            value={formData1?.email}
                            onChange={handleChange("form1")}
                          />
                          {/* <FormControl
                            sx={{ width: "100%" }}
                            variant="standard"
                          >
                            <InputLabel
                              required
                              htmlFor="standard-adornment-password"
                            >
                              Password
                            </InputLabel>
                            <Input
                              id="standard-adornment-password"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData1?.password}
                              onChange={handleChange("form1")}
                              inputProps={{
                                autoComplete: "new-password",
                                form: {
                                  autoComplete: "off",
                                },
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl> */}
                        </Stack>
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={
                            formData1?.name === "" ||
                            formData1?.email === "" ||
                            formData1?.password === ""
                          }
                          sx={{
                            m: "4rem auto",
                            p: "1.5rem 6rem",
                            borderRadius: "0",
                            width: "100%",
                            bgcolor: theme.palette.grey[900],
                            color: theme.palette.secondary[100],
                            "&:hover": {
                              bgcolor: theme.palette.grey[900],
                              color: theme.palette.secondary[100],
                            },
                          }}
                          size="large"
                        >
                          Create
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )}
                {page === 2 && (
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        m: "auto",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{ fontWeight: "500" }}
                        color={theme.palette.secondary[1000]}
                      >
                        Create Internal Auditor Profile
                      </Typography>
                      <Box
                        sx={{
                          color: theme.palette.secondary[1000],
                          "& .MuiTextField-root, .MuiFormControl-root": {
                            m: "1.3rem 0",
                            width: "100%",
                            borderBottom: "none !important",
                          },
                          "& .MuiFormLabel-root": {
                            color: theme.palette.grey[700],
                          },
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: theme.palette.grey[800],
                          },
                          "& .MuiInput-root:before": {
                            borderBottom: `1px solid ${theme.palette.grey[900]}`,
                          },
                          "& .MuiInput-root:after": {
                            borderBottom: `1px solid ${theme.palette.grey[600]}`,
                          },
                          "& input:focus": {
                            outline: "none !important",
                            border: "none !important",
                          },
                        }}
                        onSubmit={handleSubmit("form2")}
                        component="form"
                        noValidate
                      >
                        <Stack direction="column">
                          <TextField
                            variant="standard"
                            label="Name"
                            name="name"
                            type="text"
                            required
                            inputProps={{
                              autoComplete: "new-password",
                              form: {
                                autoComplete: "off",
                              },
                            }}
                            value={formData2?.name}
                            onChange={handleChange("form2")}
                          />
                          <TextField
                            variant="standard"
                            label="Email Address"
                            type="email"
                            name="email"
                            required
                            inputProps={{
                              autoComplete: "new-password",
                              form: {
                                autoComplete: "off",
                              },
                            }}
                            value={formData2?.email}
                            onChange={handleChange("form2")}
                          />
                          {/* <FormControl
                            sx={{ width: "100%" }}
                            variant="standard"
                          >
                            <InputLabel
                              required
                              htmlFor="standard-adornment-password"
                            >
                              Password
                            </InputLabel>
                            <Input
                              id="standard-adornment-password"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData2?.password}
                              onChange={handleChange("form2")}
                              inputProps={{
                                autoComplete: "new-password",
                                form: {
                                  autoComplete: "off",
                                },
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl> */}
                        </Stack>
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={
                            formData2?.name === "" ||
                            formData2?.email === "" ||
                            formData2?.password === ""
                          }
                          sx={{
                            m: "4rem auto",
                            p: "1.5rem 6rem",
                            borderRadius: "0",
                            width: "100%",
                            bgcolor: theme.palette.grey[900],
                            color: theme.palette.secondary[100],
                            "&:hover": {
                              bgcolor: theme.palette.grey[900],
                              color: theme.palette.secondary[100],
                            },
                          }}
                          size="large"
                        >
                          Create
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )}
                {page === 3 && (
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        m: "auto",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{ fontWeight: "500" }}
                        color={theme.palette.secondary[1000]}
                      >
                        Create CEO Profile
                      </Typography>
                      <Box
                        sx={{
                          color: theme.palette.secondary[1000],
                          "& .MuiTextField-root, .MuiFormControl-root": {
                            m: "1.3rem 0",
                            width: "100%",
                            borderBottom: "none !important",
                          },
                          "& .MuiFormLabel-root": {
                            color: theme.palette.grey[700],
                          },
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: theme.palette.grey[800],
                          },
                          "& .MuiInput-root:before": {
                            borderBottom: `1px solid ${theme.palette.grey[900]}`,
                          },
                          "& .MuiInput-root:after": {
                            borderBottom: `1px solid ${theme.palette.grey[600]}`,
                          },
                          "& input:focus": {
                            outline: "none !important",
                            border: "none !important",
                          },
                        }}
                        onSubmit={handleSubmit("form3")}
                        component="form"
                        noValidate
                      >
                        <Stack direction="column">
                          <TextField
                            variant="standard"
                            label="Name"
                            name="name"
                            type="text"
                            required
                            inputProps={{
                              autoComplete: "new-password",
                              form: {
                                autoComplete: "off",
                              },
                            }}
                            value={formData3?.name}
                            onChange={handleChange("form3")}
                          />
                          <TextField
                            variant="standard"
                            type="email"
                            name="email"
                            required
                            inputProps={{
                              autoComplete: "new-password",
                              form: {
                                autoComplete: "off",
                              },
                            }}
                            label="Email Address"
                            value={formData3?.email}
                            onChange={handleChange("form3")}
                          />
                          {/* <FormControl
                            sx={{ width: "100%" }}
                            variant="standard"
                          >
                            <InputLabel
                              required
                              htmlFor="standard-adornment-password"
                            >
                              Password
                            </InputLabel>
                            <Input
                              id="standard-adornment-password"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData3?.password}
                              onChange={handleChange("form3")}
                              inputProps={{
                                autoComplete: "new-password",
                                form: {
                                  autoComplete: "off",
                                },
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl> */}
                        </Stack>
                        <Button
                          variant="contained"
                          disabled={
                            formData3?.name === "" ||
                            formData3?.email === "" ||
                            formData3?.password === ""
                          }
                          type="submit"
                          sx={{
                            m: "4rem auto",
                            p: "1.5rem 6rem",
                            borderRadius: "0",
                            width: "100%",
                            bgcolor: theme.palette.grey[900],
                            color: theme.palette.secondary[100],
                            "&:hover": {
                              bgcolor: theme.palette.grey[900],
                              color: theme.palette.secondary[100],
                            },
                          }}
                          size="large"
                        >
                          Create
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )}
                {page === 4 && (
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        m: "auto",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{ fontWeight: "500" }}
                        color={theme.palette.secondary[1000]}
                      >
                        Create Accountant Profile
                      </Typography>
                      <Box
                        sx={{
                          color: theme.palette.secondary[1000],
                          "& .MuiTextField-root, .MuiFormControl-root": {
                            m: "1.3rem 0",
                            width: "100%",
                            borderBottom: "none !important",
                          },
                          "& .MuiFormLabel-root": {
                            color: theme.palette.grey[700],
                          },
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: theme.palette.grey[800],
                          },
                          "& .MuiInput-root:before": {
                            borderBottom: `1px solid ${theme.palette.grey[900]}`,
                          },
                          "& .MuiInput-root:after": {
                            borderBottom: `1px solid ${theme.palette.grey[600]}`,
                          },
                          "& input:focus": {
                            outline: "none !important",
                            border: "none !important",
                          },
                        }}
                        onSubmit={handleSubmit("form4")}
                        component="form"
                        noValidate
                      >
                        <Stack direction="column">
                          <TextField
                            variant="standard"
                            label="Name"
                            name="name"
                            type="text"
                            value={formData4?.name}
                            required
                            inputProps={{
                              autoComplete: "new-password",
                              form: {
                                autoComplete: "off",
                              },
                            }}
                            onChange={handleChange("form4")}
                          />
                          <TextField
                            variant="standard"
                            type="email"
                            name="email"
                            value={formData4?.email}
                            required
                            inputProps={{
                              autoComplete: "new-password",
                              form: {
                                autoComplete: "off",
                              },
                            }}
                            label="Email Address"
                            onChange={handleChange("form4")}
                          />
                          {/* <FormControl
                            sx={{ width: "100%" }}
                            variant="standard"
                          >
                            <InputLabel
                              required
                              htmlFor="standard-adornment-password"
                            >
                              Password
                            </InputLabel>
                            <Input
                              id="standard-adornment-password"
                              value={formData4?.password}
                              name="password"
                              onChange={handleChange("form4")}
                              type={showPassword ? "text" : "password"}
                              inputProps={{
                                autoComplete: "new-password",
                                form: {
                                  autoComplete: "off",
                                },
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl> */}
                        </Stack>
                        <Button
                          variant="contained"
                          disabled={
                            formData4?.name === "" ||
                            formData4?.email === "" ||
                            formData4?.password === ""
                          }
                          type="submit"
                          sx={{
                            m: "4rem auto",
                            p: "1.5rem 6rem",
                            borderRadius: "0",
                            width: "100%",
                            bgcolor: theme.palette.grey[900],
                            color: theme.palette.secondary[100],
                            "&:hover": {
                              bgcolor: theme.palette.grey[900],
                              color: theme.palette.secondary[100],
                            },
                          }}
                          size="large"
                        >
                          Create
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )}

                <Box
                  sx={{
                    display: { xs: "block", lg: "flex" },
                  }}
                >
                  <Box
                    sx={{
                      display: { xs: "flex", lg: "flex" },
                      width: "100%",
                      m: "auto",
                    }}
                  >
                    <Button
                      sx={{
                        m: "2rem 2rem auto auto",
                        p: "1.5rem 6rem",
                        borderRadius: "0",
                        width: "50%",
                        bgcolor: theme.palette.grey[900],
                        color: theme.palette.secondary[100],
                        "&:hover": {
                          bgcolor: theme.palette.grey[900],
                          color: theme.palette.secondary[100],
                        },
                      }}
                      variant="contained"
                      size="large"
                      disabled={page === 1 || (userRole === "HR" && page === 2)}
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      sx={{
                        m: "2rem auto",
                        p: "1.5rem 6rem",
                        borderRadius: "0",
                        width: "50%",
                        bgcolor: theme.palette.grey[900],
                        color: theme.palette.secondary[100],
                        "&:hover": {
                          bgcolor: theme.palette.grey[900],
                          color: theme.palette.secondary[100],
                        },
                      }}
                      variant="contained"
                      size="large"
                      disabled={page === 4}
                      onClick={() => {
                        if (userRole === "CEO" && page === 3) {
                          setPage(4);
                        } else {
                          setPage(page + 1);
                        }
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Createroles;
