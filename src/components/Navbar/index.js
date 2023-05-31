import { Box, Container, Link, Typography, useTheme } from "@mui/material";
import React from "react";
import UpayrollLogo from "../../assets/img/u-payLogo2.png";
import { Link as NavLink } from "react-router-dom";
import ButtonComp from "../common/ButtonComp";

const Navbar = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        // maxWidth="xl"
        sx={{
          width: "100%",
          display: "flex",
          position: "sticky",
          top: 0,
          bgcolor: theme.palette.secondary[100],
          boxShadow: ".5rem 0rem 1rem rgba(0, 0, 0, 0.1)",
          zIndex: 99,
          justifyContent: "space-between",
          height: "6rem",
          p: { xs: "0 1rem", lg: "0 6rem" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              m: "auto",
              "& img": {
                m: "auto 0 auto 0",
                // width: { xs: "23%", sm: "20%", xl: "7%" },
                width: "30px",
              },
            }}
          >
            <img src={UpayrollLogo} alt="logo" />

            <Typography
              variant="h2"
              sx={{
                whiteSpace: "nowrap",
                height: "100%",
                fontWeight: "500",
                m: "auto auto auto .5rem",
                fontSize: { xs: "2rem", lg: "2rem" },
                display: { xs: "none", sm: "inline" },
              }}
              color="initial"
            >
              Payroll
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          sx={{
            "& .MuiTypography-root": {
              fontWeight: "400",
              // m: "auto",
            },
            "& .MuiTypography-h3": {
              fontSize: { xs: "1.25rem", lg: "1.8rem" },
            },
            "& .MuiTypography-root:last-child": {
              // fontWeight: "400",
            },
            "& a": {
              m: { xs: "auto 1.2rem auto auto", lg: "auto 2rem auto auto" },
            },
          }}
        >
          <Link to="/signin" component={NavLink} underline="none">
            <Typography variant="h3" color="initial">
              login
            </Typography>
          </Link>
          <Link
            to="/signup"
            component={NavLink}
            sx={{ whiteSpace: "nowrap" }}
            underline="none"
          >
            <Typography variant="h3" noWrap color="initial">
              Create account
            </Typography>
          </Link>
          <Box display="flex" sx={{ "& a": { m: "auto 0 auto auto" } }}>
            <a
              href="https://calendly.com/uridiumworks/30min"
              target="_blank"
              rel="noreferrer"
            >
              <ButtonComp
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: ".4rem",
                  boxShadow: "none",
                  border: `1px solid ${theme.palette.blue[500]}`,
                  // bgcolor: theme.palette.blue[500],
                  color: theme.palette.secondary[1000],
                  textTransform: "capitalize",
                  fontSize: { xs: ".7rem", sm: "1.3rem" },
                  // p: { xs: ".3rem .4rem", sm: ".5rem 1.5rem" },
                  whiteSpace: "nowrap",
                  // m: "auto 0 auto auto",
                  "&:hover": {
                    border: `1px solid ${theme.palette.blue[500]}`,
                    color: theme.palette.secondary[1000],
                  },
                }}
                childern="Request a Demo"
              />
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
