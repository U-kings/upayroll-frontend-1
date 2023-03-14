import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Stack,
  useTheme,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import bgImg from "../../resources/signinBg.jpg";

const CreateUserRoles = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);

  const [page, setPage] = useState(1);

  const [formData1, setFormData1] = useState({
    name: "",
    email: "",
    userRole: "HR",
    password: "",
  });
  const [formData2, setFormData2] = useState({
    name: "",
    email: "",
    userRole: "Internal Auditor",
    password: "",
  });
  const [formData3, setFormData3] = useState({
    name: "",
    email: "",
    userRole: "CEO",
    password: "",
  });
  const [formData4, setFormData4] = useState({
    name: "",
    email: "",
    userRole: "Accountant",
    password: "",
  });

  const handleChange = (e) => {
    if (formData1) {
      setFormData1({ ...formData1, [e.target.name]: [e.target.value] });
    } else if (formData2) {
      setFormData2({ ...formData2, [e.target.name]: [e.target.value] });
    } else if (formData3) {
      setFormData3({ ...formData3, [e.target.name]: [e.target.value] });
    } else if (formData4) {
      setFormData4({ ...formData4, [e.target.name]: [e.target.value] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: { xs: "block", lg: "flex" },
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
          <Box width="50%">
            <Box display="flex" height="100%">
              <Box sx={{ m: "auto", width: "40rem" }}>
                {page === 1 && (
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
                        onSubmit={(e) => handleSubmit(e)}
                        component="form"
                        noValidate
                      >
                        <Stack direction="column">
                          <TextField
                            variant="standard"
                            id=""
                            label="Name"
                            name="name"
                            type="text"
                            inputProps={{
                              autocomplete: "new-password",
                              form: {
                                autocomplete: "off",
                              },
                            }}
                            value={formData1.name}
                            onChange={handleChange}
                          />
                          <TextField
                            variant="standard"
                            id=""
                            type="email"
                            name="email"
                            inputProps={{
                              autocomplete: "new-password",
                              form: {
                                autocomplete: "off",
                              },
                            }}
                            label="Email Address"
                            value={formData1.email}
                            onChange={handleChange}
                          />
                          <FormControl
                            sx={{ width: "100%" }}
                            variant="standard"
                          >
                            <InputLabel htmlFor="standard-adornment-password">
                              Password
                            </InputLabel>
                            <Input
                              id="standard-adornment-password"
                              type={showPassword ? "text" : "password"}
                              inputProps={{
                                autocomplete: "new-password",
                                form: {
                                  autocomplete: "off",
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
                          </FormControl>
                        </Stack>
                        <Button
                          variant="contained"
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
                        onSubmit={(e) => handleSubmit(e)}
                        component="form"
                        noValidate
                      >
                        <Stack direction="column">
                          <TextField
                            variant="standard"
                            id=""
                            label="Name"
                            name="name"
                            type="text"
                            inputProps={{
                              autocomplete: "new-password",
                              form: {
                                autocomplete: "off",
                              },
                            }}
                            value={formData1.name}
                            onChange={handleChange}
                          />
                          <TextField
                            variant="standard"
                            id=""
                            type="email"
                            name="email"
                            inputProps={{
                              autocomplete: "new-password",
                              form: {
                                autocomplete: "off",
                              },
                            }}
                            label="Email Address"
                            value={formData1.email}
                            onChange={handleChange}
                          />
                          <FormControl
                            sx={{ width: "100%" }}
                            variant="standard"
                          >
                            <InputLabel htmlFor="standard-adornment-password">
                              Password
                            </InputLabel>
                            <Input
                              id="standard-adornment-password"
                              type={showPassword ? "text" : "password"}
                              inputProps={{
                                autocomplete: "new-password",
                                form: {
                                  autocomplete: "off",
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
                          </FormControl>
                        </Stack>
                        <Button
                          variant="contained"
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
                        onSubmit={(e) => handleSubmit(e)}
                        component="form"
                        noValidate
                      >
                        <Stack direction="column">
                          <TextField
                            variant="standard"
                            id=""
                            label="Name"
                            name="name"
                            type="text"
                            inputProps={{
                              autocomplete: "new-password",
                              form: {
                                autocomplete: "off",
                              },
                            }}
                            value={formData1.name}
                            onChange={handleChange}
                          />
                          <TextField
                            variant="standard"
                            id=""
                            type="email"
                            name="email"
                            inputProps={{
                              autocomplete: "new-password",
                              form: {
                                autocomplete: "off",
                              },
                            }}
                            label="Email Address"
                            value={formData1.email}
                            onChange={handleChange}
                          />
                          <FormControl
                            sx={{ width: "100%" }}
                            variant="standard"
                          >
                            <InputLabel htmlFor="standard-adornment-password">
                              Password
                            </InputLabel>
                            <Input
                              id="standard-adornment-password"
                              type={showPassword ? "text" : "password"}
                              inputProps={{
                                autocomplete: "new-password",
                                form: {
                                  autocomplete: "off",
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
                          </FormControl>
                        </Stack>
                        <Button
                          variant="contained"
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
                        onSubmit={(e) => handleSubmit(e)}
                        component="form"
                        noValidate
                      >
                        <Stack direction="column">
                          <TextField
                            variant="standard"
                            id=""
                            label="Name"
                            name="name"
                            type="text"
                            inputProps={{
                              autocomplete: "new-password",
                              form: {
                                autocomplete: "off",
                              },
                            }}
                            value={formData1.name}
                            onChange={handleChange}
                          />
                          <TextField
                            variant="standard"
                            id=""
                            type="email"
                            name="email"
                            inputProps={{
                              autocomplete: "new-password",
                              form: {
                                autocomplete: "off",
                              },
                            }}
                            label="Email Address"
                            value={formData1.email}
                            onChange={handleChange}
                          />
                          <FormControl
                            sx={{ width: "100%" }}
                            variant="standard"
                          >
                            <InputLabel htmlFor="standard-adornment-password">
                              Password
                            </InputLabel>
                            <Input
                              id="standard-adornment-password"
                              type={showPassword ? "text" : "password"}
                              inputProps={{
                                autocomplete: "new-password",
                                form: {
                                  autocomplete: "off",
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
                          </FormControl>
                        </Stack>
                        <Button
                          variant="contained"
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
                      display: { xs: "block", lg: "flex" },
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
                      disabled={page === 1}
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
                      onClick={() => setPage(page + 1)}
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

export default CreateUserRoles;
