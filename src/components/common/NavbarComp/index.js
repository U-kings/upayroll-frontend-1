import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
  Link,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import UPayrollLogo from "../../../assets/img/u-payLogo2.png";
import { useLocation } from "react-router-dom";
import ButtonComp from "../ButtonComp";
// import { useDispatch } from "react-redux";

const drawerWidth = "70vw";
// const drawerWidth = 240;
const navItems = ["Home", "Sign Up", "Sign In"];

const NavbarComp = () => {
  // const dispatch = useDispatch();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { pathname } = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const goTo = (item) => {
    let urlPath = "/";
    if (item === "Home") {
      urlPath = "./home";
    } else if (item === "Sign Up") {
      urlPath = "./signup";
    } else if (item === "Sign In") {
      urlPath = "./signin";
    }

    return urlPath;
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left" }}>
      <Box sx={{ display: "flex" }}>
        <Link
          sx={{ m: ".5rem 0 auto .5rem" }}
          component={RouterLink}
          underline="none"
          to="/home"
        >
          <img src={UPayrollLogo} alt="logo" width="70" />
        </Link>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item}>
            <ListItemButton
              disableGutters
              sx={{
                textAlign: "left",
              }}
            >
              <Link
                to={goTo(item)}
                sx={{
                  color:
                    item.toLowerCase().replace(/\s+/g, "-") ===
                    pathname.substring(1)
                      ? theme.palette.red[500]
                      : theme.palette.blue[500],
                  ml: "1rem",
                  display: "flex",
                  "&:hover": {
                    color: theme.palette.red[500],
                  },
                  // p: ".8rem 0",
                  position: "relative",
                }}
                component={RouterLink}
                underline="none"
                // onClick={""}
              >
                <Typography
                  variant="h5"
                  // component="div"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  {item}
                </Typography>
              </Link>
              {/* <ListItemText primary={item} /> */}
            </ListItemButton>
          </ListItem>
        ))}
        {/* <Link component={RouterLink} to="./contact-us" underline="none"> */}
        <ButtonComp
          variant="contained"
          size="large"
          sx={{
            borderRadius: "4rem",
            // fontSize: ".8rem",
            fontSize: ".7rem !important",
            bgcolor:
              "contact-us" === pathname.substring(1)
                ? theme.palette.red[500]
                : theme.palette.neutral[900],
            color: theme.palette.neutral[10],
            // height: "2rem",
            // p: "1.2rem 2rem",
            "&:hover": {
              color: theme.palette.neutral[10],
              bgcolor: theme.palette.neutral[900],
            },
            fontWeight: "500",
            textTransform: "none",
          }}
          childern="Free Download"
        />
        {/* </Link> */}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        // left: 0,
        // right: 0,
      }}
    >
      <AppBar
        component="nav"
        sx={{
          // position: "absolute",
          boxShadow: ".5rem .4rem 1rem rgba(0, 0, 0,.1)",
          top: "4rem",
          left: "50%",
          transform: "translate(-50%)",
          borderRadius: "1.5rem",
          backdropFilter: "blur(5px)",
          bgcolor: "rgba(255, 255, 255, .7)",
          // backgroundColor: theme.palette.secondary[100],
          // backgroundColor: theme.palette.red[100],
          width: "70%",
        }}
      >
        <Toolbar sx={{}}>
          <Box
            sx={{
              // display: { xs: "flex", lg: "none" },
              display: "flex",
              justifyContent: "space-between",
              // justifyContent: "space-between",
              // display: { lg: "none" },
              width: "100%",
              // padding: "2rem 1rem",
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", lg: "none" },
                justifyContent: "space-between",
                // display: { lg: "none" },
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Link
                  sx={{ m: ".5rem 0 auto .5rem" }}
                  component={RouterLink}
                  underline="none"
                  to="/home"
                >
                  <img src={UPayrollLogo} alt="logo" width="30" />
                </Link>
                <Typography
                  variant="h5"
                  sx={{
                    m: "auto 0 auto .5rem",
                    fontWeight: "500",
                  }}
                >
                  Payroll
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    m: "auto 0 auto .5rem",
                    fontWeight: "500",
                    color: theme.palette.primary[500],
                  }}
                >
                  System
                </Typography>
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { lg: "none" } }}
              >
                <MenuIcon sx={{ color: "black", fontSize: "1.5rem" }} />
              </IconButton>
            </Box>
            <Box
              sx={{
                // bgcolor: "red !important",
                flexGrow: 1 / 12,
                display: { xs: "none", lg: "block" },
                m: "auto 0",
              }}
            >
              <Box sx={{ display: "flex", m: "auto" }}>
                <Link
                  // sx={{ m: "auto 0 auto .5rem" }}
                  component={RouterLink}
                  underline="none"
                  to="/home"
                  sx={{
                    display: "flex",
                    "& img": {
                      m: "auto 0",
                    },
                  }}
                >
                  <img src={UPayrollLogo} alt="logo" width="25" />
                </Link>
                <Typography
                  variant="h5"
                  sx={{
                    m: "auto 0 auto .5rem",
                    fontWeight: "500",
                  }}
                >
                  Payroll
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    m: "auto 0 auto .5rem",
                    fontWeight: "500",
                    color: theme.palette.primary[500],
                  }}
                >
                  System
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "none", lg: "flex" } }}>
              {navItems.map((item) => {
                return (
                  <Link
                    key={item}
                    component={RouterLink}
                    to={goTo(item)}
                    underline="none"
                    sx={{
                      color:
                        item.toLowerCase().replace(/\s+/g, "") ===
                        pathname.substring(1)
                          ? theme.palette.primary[500]
                          : theme.palette.neutral[900],
                      margin: "0 1.2rem",
                      display: "flex",
                      // p: "1rem 0",
                      // bgcolor:"red !important",
                      "&:hover": {
                        color: theme.palette.primary[500],
                      },
                      position: "relative",
                    }}
                  >
                    <Typography
                      variant="h6"
                      // component="div"
                      sx={{
                        fontWeight: "700",
                        m: "auto",
                        fontSize: ".7rem",
                        textTransform: "uppercase",
                      }}
                    >
                      {item}
                    </Typography>
                  </Link>
                );
              })}
            </Box>

            <Box sx={{ display: { xs: "none", lg: "flex" } }}>
              {/* <Link
                sx={{ m: "auto" }}
                component={RouterLink}
                to="./contact-us"
                underline="none"
              > */}
              <ButtonComp
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "4rem",
                  // fontSize: ".8rem",
                  fontSize: ".7rem !important",
                  bgcolor:
                    "contact-us" === pathname.substring(1)
                      ? theme.palette.red[500]
                      : theme.palette.neutral[900],
                  color: theme.palette.neutral[10],
                  // height: "2rem",
                  // p: "1.2rem 2rem",
                  "&:hover": {
                    color: theme.palette.neutral[10],
                    bgcolor: theme.palette.neutral[900],
                  },
                  fontWeight: "500",
                  textTransform: "none",
                }}
                childern="Free Download"
              />
              {/* </Link> */}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.primary.light,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
};

export default NavbarComp;
