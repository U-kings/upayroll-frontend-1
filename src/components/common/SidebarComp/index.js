import React from "react";
import { Box, useTheme } from "@mui/material";
import {
  useProSidebar,
  Sidebar,
  Menu,
  MenuItem,
  // SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

const SidebarComp = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const {
    //  toggleSidebar,
    collapseSidebar,
    broken,
    collapsed,
  } = useProSidebar();

  const checkPath = (text) => {
    if (text === pathname.substring(1)) {
    }
  };
  return (
    <>
      <Sidebar
        breakPoint="lg"
        transitionDuration={500}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            height: "100vh",
            transition: "all 0.3s ease-in-out",
            width: collapsed ? 80 : 250,
            position: "fixed",
            paddingTop: "4rem",
            backgroundColor: theme.palette.blue[900],
          },
          [`.${sidebarClasses.root} MenuItem:hover`]: {
            backgroundColor: theme.palette.blue[900],
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0 || level === 1)
                return {
                  fontSize: "1rem",
                  color: active
                    ? theme.palette.neutral[900]
                    : theme.palette.neutral[50],
                  backgroundColor: active
                    ? theme.palette.blue[800]
                    : theme.palette.blue[900],
                  "&:hover": {
                    color: disabled ? "#f5d9ff" : theme.palette.neutral[900],
                    backgroundColor: theme.palette.blue[800],
                  },
                  "& svg": {
                    fontSize: "1.7rem",
                  },
                };
            },
          }}
        >
          <Box sx={{ display: broken ? "none" : "flex" }}>
            <MenuIcon
              onClick={() => collapseSidebar()}
              sx={{
                m: "auto auto auto 1.4rem",
                fontSize: "2rem",
                color: theme.palette.neutral[100],
              }}
            />
          </Box>
          {/* <MenuItem icon={<Dashboard />} component={<Link to="dashboard" />}>
            Dashboard
          </MenuItem> */}
          <MenuItem
            active={checkPath("overview")}
            // active={"all-clients" === pathname.substring(1)}
            icon={<PersonIcon />}
            component={<Link to="overview" />}
          >
            Overview
          </MenuItem>
          <MenuItem
            active={"employee" === pathname.substring(1)}
            icon={<PersonAddIcon />}
            component={<Link to="employee" />}
          >
            Employee
          </MenuItem>
          {/* <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu> */}
        </Menu>
      </Sidebar>
    </>
  );
};

export default SidebarComp;
