import React, { useEffect, useState } from "react";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  TextField,
  useTheme,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import {
  CHECK_COOKIE_TOKEN_VALID_RESET,
  REGISTER_COMPANY_RESET,
} from "../../types/auth";
import bgImg from "../../resources/signinBg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { registerFunc } from "../../actions/auth";
import { ErrorBox } from "../../components";
import { Spinner, Successful } from "../../modals";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { urlConfig } from "../../util/config/config";
import { passwordStrength } from "check-password-strength";

const SignUp = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const adminRegister = useSelector(
    (state) => state.adminRegisterCompanyReducer
  );
  const {
    adminInfo,
    isLoading: isLoadingToken,
    error: tokenError,
  } = useSelector((state) => state.adminLoginStatus);
  const cookieValid = useSelector((state) => state.checkCookieTokenValid);
  const history = useHistory();

  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [showError, setShowError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    contactPersonfirstName: "",
    contactPersonlastName: "",
    contactPersonEmail: "",
    contactPersonMobile: "",
    companyAddress: "",
    createdBy: "",
    role: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrengthText, setPasswordStrengthText] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    name,
    logo,
    contactPersonfirstName,
    contactPersonlastName,
    contactPersonEmail,
    contactPersonMobile,
    companyAddress,
    createdBy,
    role,
    password,
  } = formData;

  useEffect(() => {
    if (adminInfo?.isAuthenticated && adminInfo?.user?.name) {
      history.push("dashboard");
    }

    if (!adminRegister?.isLoading && adminRegister?.error) {
      setFormData({
        name: "",
        logo: "",
        contactPersonfirstName: "",
        contactPersonlastName: "",
        contactPersonEmail: "",
        contactPersonMobile: "",
        companyAddress: "",
        createdBy: "",
        // authType: "",
        password: "",
      });
    }
  }, [adminRegister, history, adminInfo, dispatch]);

  const popup7 = () => {
    if (adminRegister?.success) {
      dispatch({ type: REGISTER_COMPANY_RESET });
      history.push("signin");
    }
  };
  useEffect(() => {
    if (cookieValid.status) {
      history.push("dashboard");
      dispatch({ type: CHECK_COOKIE_TOKEN_VALID_RESET });
    }
    setShowError("");
    return () => {};
  }, [dispatch, history, cookieValid]);

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  function validatePhone(phone) {
    const regex = /^[0-9]+$/;
    return regex.test(phone);
  }

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

  const handleKeyup = (e) => {
    if (e.target.name === "contactPersonEmail") {
      if (!validateEmail(e.target.value)) {
        setShowError("Invalid email");
      } else if (validateEmail(e.target.value)) {
        setShowError("");
      }
      // setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (e.target.name === "contactPersonMobile") {
      if (e.target.value !== "" && !validatePhone(e.target.value)) {
        console.log(e.target.value);
        setShowError("Not a number");
      } else if (e.target.value !== "" && validatePhone(e.target.value)) {
        setShowError("");
      }
    }
  };

  const validateNumber = (event) => {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];
    if (
      !(
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      )
    ) {
      event.preventDefault();
    }
  };

  const handleChange = (e) => {
    // const emailRegex =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // if (validatePhone(e.target.value)) {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    // }

    if (
      e.target.value?.length < 21 &&
      e.target.name === "contactPersonMobile"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    if (e.target.name === "contactPersonEmail") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    if (
      e.target.name !== "contactPersonMobile" &&
      e.target.name !== "contactPersonEmail"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (e.target.name === "password") {
      console.log(passwordStrength(e.target.value?.trim()).value);
      const passwordText = passwordStrength(e.target.value?.trim()).value;
      setPasswordStrengthText(passwordText);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(contactPersonEmail)) {
      setShowError("Invalid email");
      return;
    }
    if (!validatePhone(contactPersonMobile)) {
      setShowError("Invalid phone number");
      return;
    }
    if (password?.length < 8) {
      setShowError("Your Password is too short");
      return;
    }

    if (passwordStrengthText === "Too Weak") {
      setShowError("Your password is too weak");
      return;
    } else if (passwordStrengthText === "Weak") {
      setShowError("Your password is weak");
      return;
    } else if (passwordStrengthText === "Medium") {
      setShowError("Your password strength is medium");
      return;
    }
    // else if (passwordStrengthText === "Strong") {
    //   // setShowError("Your password is strong");
    // }

    // const formData = new FormData();
    // formData.append("logo", file);
    // formData.append("name", name);
    // formData.append("contactPersonfirstName", contactPersonfirstName);
    // formData.append("contactPersonlastName", contactPersonlastName);
    // formData.append("contactPersonEmail", contactPersonEmail);
    // formData.append("contactPersonMobile", contactPersonMobile);
    // formData.append("companyAddress", companyAddress);
    // formData.append("role", role);
    // formData.append("password", password);

    // formData.append("authType", authType);
    dispatch(registerFunc(formData));
    // dispatch(registerFunc(formData));
  };

  const getCloudinaryKeys = async () => {
    const { data } = await axios.get(
      `${urlConfig.url.PROXYURL}api/cloudinary/keys`
    );
    return data;
  };

  // const onUploadCompanyLogo = async (selectedFile) => {
  //   //do whatever you want to do
  //   try {
  //     const cloudinaryRes = await getCloudinaryKeys();
  //     const imageData = new FormData();
  //     imageData.append("file", selectedFile);
  //     imageData.append("upload_preset", "upayroll");
  //     imageData.append("cloud_name", cloudinaryRes.cloudinaryKeyName);

  //     const res = await fetch(
  //       `https://api.cloudinary.com/v1_1/${cloudinaryRes.cloudinaryKeyName}/image/upload`,
  //       {
  //         method: "post",
  //         body: imageData,
  //       }
  //     );
  //     const data = await res.json();
  //     setFormData({ ...formData, logo: data.secure_url });
  //     // setFormData({ ...formData, logo: data.secure_url });

  //     // dispatch(ceoUploadSignatureFunc(data.secure_url));
  //   } catch (error) {
  //     setShowError(error.message);
  //   }
  // };
  const onUploadCompanyLogo = async (selectedFile) => {
    //do whatever you want to do
    try {
      const imageData = new FormData();
      imageData.append("imageFile", selectedFile);

      const { data } = await axios.post(
        `${urlConfig.url.PROXYURL}api/upload/image`,
        imageData
      );

      setFormData({ ...formData, logo: data.url });
    } catch (error) {
      // setShowError(error.message);
      setShowError(
        error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message
      );
      setFormData({ ...formData, logo: "" });
    }
  };

  // handle File
  const handleFile = async (e) => {
    let selectedFile = e.target.files[0];
    setFileName(selectedFile?.name);
    const idxDot = selectedFile?.name.lastIndexOf(".") + 1;
    const extFile = selectedFile?.name
      .substr(idxDot, selectedFile?.name.length)
      .toLowerCase();
    if (selectedFile) {
      if (
        extFile === "jpg" ||
        extFile === "jpeg" ||
        extFile === "png"
        // extFile === "svg" ||
        // extFile === "gif"
      ) {
        setFile(e.target.files[0]);
        onUploadCompanyLogo(selectedFile);
      } else {
        setShowError("Only jpg, jpeg and png files are allowed!");
        // setShowError("Only jpg/jpeg, png, gif and svg files are allowed!");
        // setShowError("Please select only specified file type");
      }
    } else {
      setShowError("Please select a file");
    }
  };

  const colorChange = () => {
    switch (passwordStrengthText) {
      case "Too weak":
        return "#f01e2c";
      case "Weak":
        return "#f01e2c";
      case "Medium":
        return "#FFBF00";
      case "Strong":
        return "#3cb043";
      default:
        return;
    }
  };

  // const colorChange =
  //   passwordStrengthText === "Too weak"
  //     ? "#f01e2c"
  //     : passwordStrengthText === "Weak"
  //     ? "#f01e2c"
  //     : passwordStrengthText === "Medium"
  //     ? "#FFBF00"
  //     : passwordStrengthText === "Strong"
  //     ? "#3cb043"
  //     : "";

  return (
    <>
      {adminRegister?.isLoading && <Spinner />}
      <Successful
        isOpen7={adminRegister?.success && !adminRegister?.error}
        popup7={popup7}
        message="Account Created Successfully!, Check your mail to verify your account."
      />
      <Box>
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Box sx={{ p: "0", m: "auto", width: { xs: "100%", lg: "70%" } }}>
            <Box
              sx={{
                //  bgcolor: theme.palette.grey[300],
                p: { xs: "1rem 2rem", lg: "1rem 6rem" },
              }}
              onSubmit={handleSubmit}
              component="form"
              autoComplete="off"
            >
              <Typography
                variant="h1"
                sx={{ fontWeight: 700, p: "3rem 0" }}
                color={theme.palette.secondary[1000]}
              >
                Sign Up
              </Typography>
              {/* <Successful
                isOpen7={true}
                popup7={popup7}
                message="Account Created Successfully! Check your mail to verify your account."
              /> */}
              <Box sx={{ p: "0", m: "0" }}>
                {(showError ||
                  (!adminRegister?.isLoading && adminRegister?.error)) && (
                  <ErrorBox
                    fixed
                    errorMessage={
                      adminRegister?.error ===
                      "Request failed with status code 500"
                        ? "Please Check Your Internet Connection"
                        : adminRegister?.error || showError
                    }
                  />
                )}
              </Box>
              <Grid
                container
                spacing={{ xs: 3, sm: 3, md: 3 }}
                columns={{ xs: 12, sm: 12, md: 12 }}
                sx={{
                  color: theme.palette.secondary[1000],
                  "& .MuiTextField-root, .MuiFormControl-root": {
                    m: "1rem 0",
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
              >
                <Grid item xs={12} sm={6} md={6}>
                  <Box display="flex">
                    <Button
                      variant="contained"
                      component="label"
                      endIcon={<PhotoCamera />}
                      sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: theme.palette.grey[900],
                        color: theme.palette.secondary[100],
                        borderRadius: "0",
                        "&:hover": {
                          bgcolor: theme.palette.grey[900],
                          color: theme.palette.secondary[100],
                        },
                      }}
                      onChange={handleFile}
                    >
                      Upload Company Logo
                      <input
                        style={{ display: "none" }}
                        hidden
                        accept="image/png, image/jpg, image/jpeg"
                        // multiple
                        type="file"
                      />
                    </Button>
                    {/* <img src={logo} width="20rem" alt="company logo" /> */}
                    <Box display="flex" bgcolor={theme.palette.grey[200]}>
                      <Typography
                        variant="h3"
                        sx={{
                          m: "auto 2rem",
                          color: theme.palette.grey[900],
                        }}
                      >
                        {fileName}
                      </Typography>
                    </Box>
                    {/* )} */}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {logo && fileName && (
                    <Box
                      display="flex"
                      sx={{ m: "auto", "& img": { width: "5rem" } }}
                    >
                      <img alt="logo-img" src={logo} />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Box>
                    <TextField
                      id="name"
                      label="Company Name"
                      variant="standard"
                      inputProps={{
                        autoComplete: "new-password",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                      // placeholder="Company Name"
                      name="name"
                      value={name}
                      required
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box>
                    <TextField
                      id="contactPersonfirstName"
                      label="Contact Person First Name"
                      variant="standard"
                      inputProps={{
                        autoComplete: "new-password",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                      // placeholder="Contact person firstname"
                      name="contactPersonfirstName"
                      value={contactPersonfirstName}
                      required
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box>
                    <TextField
                      id="contactPersonlastName"
                      label="Contact Person Last Name"
                      variant="standard"
                      inputProps={{
                        autoComplete: "new-password",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                      // placeholder="Contact person lastname"
                      name="contactPersonlastName"
                      value={contactPersonlastName}
                      required
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box>
                    <TextField
                      id="contactPersonEmail"
                      label="Contact Person Email"
                      variant="standard"
                      type="email"
                      inputProps={{
                        autoComplete: "new-password",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                      name="contactPersonEmail"
                      value={contactPersonEmail}
                      required
                      onChange={handleChange}
                      onKeyUp={handleKeyup}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box>
                    <TextField
                      id="contactPersonMobile"
                      type="tel"
                      title="Please use a 11 digit number with no dashes or dots"
                      pattern="[0-9]{11}"
                      label="Contact Person Mobile"
                      variant="standard"
                      inputProps={{
                        autoComplete: "new-password",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                      name="contactPersonMobile"
                      value={contactPersonMobile}
                      required
                      onChange={handleChange}
                      onKeyUp={handleKeyup}
                      onKeyDown={validateNumber}
                    />
                  </Box>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6}>
                  <Box>
                    <TextField
                      id="createdBy"
                      label="Created By"
                      variant="standard"
                      inputProps={{
                        autoComplete: "new-password",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                      name="createdBy"
                      value={createdBy}
                      required
                      onChange={handleChange}
                    />
                  </Box>
                </Grid> */}
                <Grid item xs={12} sm={6} md={6}>
                  <Box>
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                      <InputLabel
                        required
                        id="demo-simple-select-standard-label"
                      >
                        Create As
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        required
                        name="role"
                        value={role}
                        onChange={handleChange}
                        label="User Role"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"HR"}>HR</MenuItem>
                        <MenuItem value={"CEO"}>CEO</MenuItem>
                        {/* <MenuItem value={20}>Twenty</MenuItem> */}
                        {/* <MenuItem value={30}>Thirty</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box>
                    <FormControl sx={{ width: "100%" }} variant="standard">
                      <InputLabel
                        htmlFor="standard-adornment-password"
                        required
                      >
                        Password
                      </InputLabel>
                      <Input
                        id="standard-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
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
                      <p
                        style={{
                          color: colorChange,
                        }}
                      >
                        {password !== "" && passwordStrengthText}
                      </p>
                    </FormControl>
                    {/* <TextField
                      id="comfirmpassword"
                      label="Password"
                      variant="standard"
                      inputProps={{
                        autoComplete: "new-password",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                      name="password"
                      value={password}
                      type="password"
                      required
                      onChange={handleChange}
                    /> */}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Box>
                    <TextField
                      id="companyAddress"
                      label="Company Address"
                      variant="standard"
                      type="text"
                      inputProps={{
                        autoComplete: "new-password",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                      name="companyAddress"
                      value={companyAddress}
                      required
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box display="flex" sx={{ width: "100%" }}>
                <Button
                  type="sumbit"
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
                  variant="contained"
                  size="large"
                  disabled={
                    name === "" ||
                    contactPersonfirstName === "" ||
                    contactPersonlastName === "" ||
                    contactPersonEmail === "" ||
                    companyAddress === "" ||
                    password === "" ||
                    role === "" ||
                    // createdBy === "" ||
                    fileName === undefined ||
                    fileName === null
                  }
                >
                  Create account
                </Button>
              </Box>
              <Box display="flex" sx={{ width: "100%", "& a": { m: "auto" } }}>
                <Link to="/signin">
                  <Typography
                    variant="h3"
                    color="initial"
                    sx={{
                      textAlign: "center",
                      "& b": {
                        fontSize: "1.5rem",
                      },
                    }}
                  >
                    Already have an account? <b>Sign in</b>
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              width: "30%",
              // mr: "4rem",
              // height: "100vh",
              overflow: "hidden",
              // "& img": {
              //   width: "100%",
              // },
              backgroundImage: `url(${bgImg})`,
              backgroundRepeat: "no-repeat",
              // backgroundSize: "",
              backgroundPositionX: "-10rem",
            }}
          ></Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
