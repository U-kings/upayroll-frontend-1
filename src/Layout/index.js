import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import SidebarComp from "../components/common/SidebarComp";

const Layout = () => {
      // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  
  return (
    <>
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        {/* <Box flexGrow={1}> */}
        <SidebarComp />
        <Outlet />
        {/* <Footer /> */}
      </Box>
    </>
  );
};

export default Layout;
