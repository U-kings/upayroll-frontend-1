import React from "react";
import { useState } from "react";
import { ModalBackground } from "../../styles/library";
import LoadingSpinner from "../LoadingSpinner";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  superAdminGetAllUsers,
  superAdminUpdateUser,
  superAdminUpdateUserRole,
} from "../../actions/users";
import { useDispatch, useSelector } from "react-redux";
import Successful from "../Successful";
import {
  SUPER_ADMIN_GET_ALL_USERS_RESET,
  SUPER_ADMIN_UPDATE_USER_RESET,
  SUPER_ADMIN_UPDATE_USER_ROLE_RESET,
} from "../../types/users";
import { ErrorBox } from "../../components";
import { useEffect } from "react";

const EditUser = ({ isOpen3, popup3, user, month, toggle }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  //super admin user state
  const {
    success: superAdminUpdateUserSuccess,
    message: superAdminUpdateUserMessage,
    isLoading: superAdminUpdateUserLoading,
    error: superAdminUpdateUserError,
  } = useSelector((state) => state.superAdminUpdateUser);

  //super admin user state
  const {
    success: superAdminUpdateUserRoleSuccess,
    message: superAdminUpdateUserRoleMessage,
    isLoading: superAdminUpdateUserRoleLoading,
    error: superAdminUpdateUserRoleError,
  } = useSelector((state) => state.superAdminUpdateUserRole);

  // form state
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [form2, setForm2] = useState({
    role: user?.role || "",
    isSuperAdmin: user?.isSuperAdmin || true,
  });

  const [userId] = useState(user?.id || "");

  const { name, email } = form;
  const { role } = form2;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChange2 = (e) => {
    setForm2({ ...form2, [e.target.name]: e.target.value });
  };

  const handleSubmit = (type) => (e) => {
    e.preventDefault();
    switch (type) {
      case "update user":
        dispatch(superAdminUpdateUser(form, userId));

        break;

      case "update role":
        dispatch(superAdminUpdateUserRole(form2, userId));

        break;

      default:
        break;
    }
  };

  const successPopup = () => {
    if (superAdminUpdateUserSuccess || superAdminUpdateUserRoleSuccess) {
      dispatch({ type: SUPER_ADMIN_UPDATE_USER_RESET });
      dispatch({ type: SUPER_ADMIN_UPDATE_USER_ROLE_RESET });
      // dispatch(superAdminGetAllUsers());
      popup3();
    }
  };

  useEffect(() => {
    let timeoutId;
    if (superAdminUpdateUserError || superAdminUpdateUserRoleError) {
      // popup3();

      timeoutId = setTimeout(() => {
        dispatch({ type: SUPER_ADMIN_UPDATE_USER_RESET });
        dispatch({ type: SUPER_ADMIN_UPDATE_USER_ROLE_RESET });
      }, 6000);
    }

    return () => {
      // Clear the timeout when the component unmounts or when showError changes
      clearTimeout(timeoutId);
    };
  }, [dispatch, superAdminUpdateUserError, superAdminUpdateUserRoleError]);

  return (
    <>
      {(superAdminUpdateUserLoading || superAdminUpdateUserRoleLoading) && (
        <LoadingSpinner toggle={toggle} />
      )}

      <Successful
        isOpen7={superAdminUpdateUserRoleSuccess || superAdminUpdateUserSuccess}
        // isOpen7={true}
        popup7={successPopup}
        message={
          superAdminUpdateUserRoleMessage ||
          superAdminUpdateUserMessage ||
          "Updated Successfully!"
        }
      />

      {/* <Successful
        // isOpen7={superAdminUpdateUserSuccess || superAdminUpdateUserSuccess}
        isOpen7={true}
        popup7={successPopup}
        message={
          superAdminUpdateUserRoleMessage ||
          superAdminUpdateUserMessage ||
          "Updated Successfully!"
        }
      /> */}

      <ModalBackground isOpen3={isOpen3} onClick={popup3} />
      <Box
        sx={{
          position: "fixed",
          zIndex:
            superAdminUpdateUserSuccess || superAdminUpdateUserRoleSuccess
              ? 12
              : 120,
          top: "50%",
          left: "50%",
          maxHeight: "100vh",
          transform: "translate(-50%, -50%)",
          overflow: "auto",
          visibility: isOpen3 ? "visible" : "hidden",
          opacity: isOpen3 ? "1" : "0",
          transition: "260ms ease-in-out",
        }}
      >
        {(superAdminUpdateUserError || superAdminUpdateUserRoleError) && (
          <ErrorBox
            errorMessage={
              superAdminUpdateUserError || superAdminUpdateUserRoleError
            }
          />
        )}
        <Box
          sx={{
            bgcolor: "#fff",
            width: { xs: "100%", lg: "70rem" },
            // width: "100%",
            padding: "2rem",
          }}
        >
          <Typography
            variant="h2"
            sx={{ textAlign: "center", fontWeight: 500 }}
            color="#777"
          >
            Edit Details
          </Typography>
          <Box
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
            <Stack>
              <Box sx={{ display: { lg: "flex" } }}>
                <TextField
                  id="name"
                  type="text"
                  // title="Please use a 11 digit number with no dashes or dots"
                  // pattern="[0-9]{11}"
                  label="Full Name"
                  variant="standard"
                  inputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                  name="name"
                  value={name}
                  required
                  onChange={handleChange}
                />
              </Box>
              <Box
                onSubmit={handleSubmit("update user")}
                component="form"
                autoComplete="off"
                sx={{ display: { lg: "flex" } }}
              >
                <TextField
                  id="email"
                  type="email"
                  // title="Please use a 11 digit number with no dashes or dots"
                  // pattern="[0-9]{11}"
                  label="Email Address"
                  variant="standard"
                  inputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                  name="email"
                  value={email}
                  required
                  onChange={handleChange}
                />
                <Button
                  type="sumbit"
                  sx={{
                    // m: "4rem auto",
                    // p: "1.5rem 6rem",
                    p: "0 4rem",
                    mt: "1rem",
                    mb: "1rem",
                    borderRadius: "0",
                    // width: "100%",
                    bgcolor: theme.palette.grey[900],
                    color: theme.palette.secondary[100],
                    "&:hover": {
                      bgcolor: theme.palette.grey[900],
                      color: theme.palette.secondary[100],
                    },
                    whiteSpace: "nowrap",
                  }}
                  variant="contained"
                  size="small"
                  // disabled={
                  //   name === "" ||
                  // }
                >
                  Update User
                </Button>
              </Box>
              <Box
                onSubmit={handleSubmit("update role")}
                component="form"
                autoComplete="off"
                sx={{ display: { lg: "flex" }, mt: "6rem" }}
              >
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel required id="demo-simple-select-standard-label">
                    User Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    required
                    name="role"
                    value={role}
                    onChange={handleChange2}
                    label="User Role"
                    defaultValue={role}
                  >
                    <MenuItem value="">
                      {/* <MenuItem value={role || ""}> */}
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"HR"}>HR</MenuItem>
                    <MenuItem value={"Internal Auditor"}>
                      Internal Auditor
                    </MenuItem>
                    <MenuItem value={"Accountant"}>Accountant</MenuItem>
                    <MenuItem value={"Employee"}>Employee</MenuItem>
                    {/* <MenuItem value={20}>Twenty</MenuItem> */}
                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
                <Button
                  type="sumbit"
                  sx={{
                    // m: "4rem auto",
                    // p: "1.5rem 6rem",
                    p: "0 4rem",
                    mt: "1rem",
                    mb: "1rem",
                    borderRadius: "0",
                    // width: "100%",
                    bgcolor: theme.palette.grey[900],
                    color: theme.palette.secondary[100],
                    "&:hover": {
                      bgcolor: theme.palette.grey[900],
                      color: theme.palette.secondary[100],
                    },
                    whiteSpace: "nowrap",
                  }}
                  variant="contained"
                  size="small"
                  // disabled={
                  //   name === "" ||
                  // }
                >
                  Update Role
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditUser;
