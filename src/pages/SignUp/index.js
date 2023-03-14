import { PhotoCamera } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  useTheme,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const SignUp = () => {
  const theme = useTheme();
  const [fileName, setFileName] = useState(null);
  const [showError, setShowError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contactPersonfirstName: "",
    contactPersonlastName: "",
    contactPersonEmail: "",
    contactPersonMobile: "",
    createdBy: "",
    authType: "",
  });
  const {
    name,
    contactPersonfirstName,
    contactPersonlastName,
    contactPersonEmail,
    contactPersonMobile,
    createdBy,
    authType,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // handle File
  const handleFile = async (e) => {
    let selectedFile = e.target.files[0];
    // setSignatureImage(selectedFile);

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
      } else {
        setShowError("Only jpg, jpeg and png files are allowed!");
        // setShowError("Only jpg/jpeg, png, gif and svg files are allowed!");
        // setShowError("Please select only specified file type");
      }
    } else {
      setShowError("Please select a file");
    }
  };

  return (
    <>
      <Box>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", height: "100vh" }}>
            <Box sx={{ p: "0", m: "auto" }}>
              <Box
                sx={{ bgcolor: theme.palette.grey[300], p: "1rem 6rem" }}
                onSubmit={handleSubmit}
                component="form"
              >
                <Typography
                  variant="h1"
                  sx={{ fontWeight: 700, p: "3rem 0" }}
                  color={theme.palette.secondary[1000]}
                >
                  Sign Up
                </Typography>
                <Grid
                  container
                  spacing={{ xs: 3, sm: 3, md: 3 }}
                  columns={{ xs: 12, sm: 12, md: 12 }}
                  sx={{
                    color: theme.palette.secondary[1000],
                    "& .MuiTextField-root": {
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
                      {/* {fileName && ( */}
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
                  <Grid item xs={12} sm={12} md={12}>
                    <Box>
                      <TextField
                        id=""
                        label="Company Name"
                        variant="standard"
                        inputProps={{
                          autocomplete: "new-password",
                          form: {
                            autocomplete: "off",
                          },
                        }}
                        // placeholder="Company Name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box>
                      <TextField
                        id=""
                        label="Contact Person First Name"
                        variant="standard"
                        inputProps={{
                          autocomplete: "new-password",
                          form: {
                            autocomplete: "off",
                          },
                        }}
                        // placeholder="Contact person firstname"
                        name="contactPersonfirstName"
                        value={contactPersonfirstName}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box>
                      <TextField
                        id=""
                        label="Contact Person Last Name"
                        variant="standard"
                        inputProps={{
                          autocomplete: "new-password",
                          form: {
                            autocomplete: "off",
                          },
                        }}
                        // placeholder="Contact person lastname"
                        name="contactPersonlastName"
                        value={contactPersonlastName}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box>
                      <TextField
                        id=""
                        label="Contact Person Email"
                        variant="standard"
                        inputProps={{
                          autocomplete: "new-password",
                          form: {
                            autocomplete: "off",
                          },
                        }}
                        type="email"
                        name="contactPersonEmail"
                        value={contactPersonEmail}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box>
                      <TextField
                        id=""
                        type="tel"
                        title="Please use a 11 digit number with no dashes or dots"
                        pattern="[0-9]{11}"
                        label="Contact Person Mobile"
                        variant="standard"
                        inputProps={{
                          autocomplete: "new-password",
                          form: {
                            autocomplete: "off",
                          },
                        }}
                        name="contactPersonMobile"
                        value={contactPersonMobile}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box>
                      <TextField
                        id=""
                        label="Created By"
                        variant="standard"
                        inputProps={{
                          autocomplete: "new-password",
                          form: {
                            autocomplete: "off",
                          },
                        }}
                        name="createdBy"
                        value={createdBy}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box>
                      <TextField
                        id=""
                        label="Auth Type"
                        variant="standard"
                        inputProps={{
                          autocomplete: "new-password",
                          form: {
                            autocomplete: "off",
                          },
                        }}
                        // placeholder="Contact person lastname"
                        name="authType"
                        value={authType}
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
                  >
                    Create account
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SignUp;
