import { Box, Container, Input, Typography, useTheme } from "@mui/material";
import React from "react";
import ButtonComp from "../common/ButtonComp";

const Footer = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          bgcolor: theme.palette.neutral[500],
          p: { xs: "4rem 0", lg: "10rem 0" },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: {
                xs: "block",
                lg: "flex",
              },
              "& .MuiTypography-root": {
                color: theme.palette.secondary[100],
                textAlign: "center",
              },
              "& .MuiTypography-h1": {
                fontSize: "calc(2rem + 0.5vw)",
                // fontSize: "3.5rem",
                fontWeight: "500",
                textAlign: { xs: "left", lg: "center" },
              },
              "& .MuiTypography-h4": {
                mt: "1rem",
                textAlign: "left",
                fontSize: "1.3rem",
                fontWeight: "100",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: "1",
                "& .MuiBox-root": {
                  m: "auto",
                  p: { xs: "1.5rem 0", lg: "1.5rem" },
                },
              }}
            >
              <Box>
                <Typography variant="h1">
                  Get started with UPayroll today
                </Typography>
                <Typography variant="h4">
                  Join the other 15,000+ companies managing their global teams
                  with Upayroll
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flex: "1",
                width: "100%",
                "& > .MuiBox-root": {
                  m: "auto",
                  borderRadius: ".7rem",
                  width: { xs: "100%", lg: "55%" },
                },
                "& .MuiInput-root": {
                  m: "auto",
                  width: "100%",
                  p: ".7rem 2rem",
                  "&::after": {
                    borderBottom: "none",
                  },
                  "&:focus": {
                    outline: "none",
                    borderBottom: "none",
                    borderColor: "none",
                  },
                },
              }}
            >
              <Box sx={{ bgcolor: theme.palette.secondary[500] }}>
                <Box display="flex" justifyContent="space-between">
                  <Input disableUnderline={true} placeholder="Email Address" />
                  <ButtonComp
                    variant="contained"
                    size="small"
                    sx={{
                      p: ".8rem 2.2rem",
                      borderRadius: ".7rem",
                      color: theme.palette.secondary[500],
                      "&:hover": {
                        color: theme.palette.secondary[500],
                        bgcolor: theme.palette.blue[500],
                      },
                    }}
                    childern="Send"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box></Box>
      <Box
        sx={{
          bgcolor: theme.palette.blue[500],
          p: { xs: "2rem 0", lg: "2.5rem 0" },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: {
                xs: "block",
                lg: "flex",
              },
              "& .MuiTypography-root": {
                color: theme.palette.secondary[100],
                textAlign: "center",
              },
              "& .MuiTypography-h3": {
                fontWeight: "400",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: "1",
                "& .MuiBox-root": {
                  m: "auto",
                  p: "1rem",
                },
              }}
            >
              <Box>
                <Typography variant="h4">
                  © Copyright 2023. All Rights Reserved.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flex: "1",
                "& > .MuiBox-root": {
                  m: "auto",
                  //   p: "1.5rem",
                  borderRadius: "1rem",
                },
                "& .MuiTypography-root": {
                  m: "auto",
                  p: "0 1.5rem",
                },
              }}
            >
              <Box>
                <Box display="flex">
                  <Typography variant="h4">Disclaimer</Typography>
                  <Typography variant="h4">Privacy Policy</Typography>
                  <Typography variant="h4">Terms of Service</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
