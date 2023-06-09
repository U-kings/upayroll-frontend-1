import React from "react";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { ButtonComp, Footer, Navbar } from "../../components";
import heroImg from "../../../src/assets/img/hero-img.png";
import img2 from "../../../src/assets/img/img2.png";
import list1 from "../../../src/assets/img/list1.png";
import partner1 from "../../../src/assets/img/partner1.png";
import partner2 from "../../../src/assets/img/partner2.png";
import partner3 from "../../../src/assets/img/partner3.png";

const Home = () => {
  const theme = useTheme();
  return (
    <>
      <Box>
        <Navbar />
        <Box
          sx={{
            // display: { xs: "block", lg: "flex" },
            p: { xs: "5rem 0 1rem 0", lg: "8rem 4rem 5rem 4rem" },
            bgcolor: theme.palette.blue[500],
            "& .MuiTypography-h1": {
              fontSize: { xs: "4rem", lg: "6rem" },
              fontWeight: "600",
            },
            "& .MuiTypography-h3": {
              width: { xs: "100%", lg: "70%" },
              lineHeight: "3rem",
              mt: { xs: "4rem", lg: "8rem" },
              fontSize: "2rem",
              fontWeight: "400",
            },
          }}
        >
          <Container
            sx={{ display: { xs: "block", lg: "flex" } }}
            maxWidth="xl"
          >
            <Box>
              <Typography
                variant="h1"
                mt={{ xs: "1rem", lg: "4rem" }}
                color="initial"
              >
                Less overpaying.
              </Typography>
              <Typography variant="h1" color={theme.palette.yellow[500]}>
                Timely Payment.
              </Typography>
              <Typography variant="h3" color={theme.palette.secondary[500]}>
                Ensure your local and international teams get paid quickly with
                the best in-house payroll for direct employees, EOR, and
                contractors. It's the seamless experience you and your team
                deserve in one place with 24/7 support.
              </Typography>
              <Box sx={{ display: "flex" }}>
                <a
                  href="https://calendly.com/uridiumworks/30min"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ButtonComp
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: ".5rem",
                      boxShadow: "none",
                      border: `1px solid ${theme.palette.secondary[500]}`,
                      color: theme.palette.secondary[500],
                      textTransform: "capitalize",
                      fontSize: { xs: "1.5rem", sm: "1.5rem" },
                      fontWeight: "400",
                      p: { xs: ".3rem 2rem", sm: ".7rem 5rem" },
                      whiteSpace: "nowrap",
                      mt: 3,
                      "&:hover": {
                        //bgcolor: theme.palette.secondary[1000],
                        border: `1px solid ${theme.palette.secondary[500]}`,
                        color: theme.palette.secondary[500],
                      },
                    }}
                    childern="Request a Demo"
                  />
                </a>
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  "& img": {
                    m: "auto",
                    width: "90%",
                  },
                }}
              >
                <img src={heroImg} alt="hero-img" />
              </Box>
            </Box>
          </Container>

          {/* Second Section */}
        </Box>
        <Container maxWidth="xl">
          <Box
            sx={{
              p: "6rem 0",
              display: { xs: "block", lg: "flex" },
              "& .MuiTypography-h2": {
                fontSize: "2.4rem",
              },
              "& .MuiTypography-h3": {
                fontSize: "2rem",
              },
            }}
          >
            <Box sx={{ m: "auto", flex: "1", p: "2rem", width: "100%" }}>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="h3"
                  sx={{
                    bgcolor: theme.palette.blue[500],
                    p: ".5rem",
                    borderRadius: ".3rem",
                    textAlign: "center",
                    m: "auto",
                    color: theme.palette.secondary[500],
                  }}
                >
                  fully-managed service
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  width: { xs: "100%", lg: "75%" },
                  m: "3rem auto 2rem auto",
                  textAlign: "justify",
                }}
                color="initial"
              >
                We stand out from other payroll providers by handling all
                compliance requirements. With Upayroll, you can rest assured
                that your business will remain compliant with all tax and labor
                laws, avoiding costly legal issues and penalties.
              </Typography>
            </Box>
            <Box
              sx={{
                m: "auto",
                flex: 1,
                display: "flex",
                p: { xs: "1rem", lg: "2rem" },
              }}
            >
              <Box sx={{ display: "flex", m: "auto", position: "relative" }}>
                <Box
                  sx={{
                    // position: "absolute",
                    width: "100%",
                    left: "0",
                    m: "auto",
                    zIndex: "2",
                    "& img": {
                      m: "auto",
                      width: { xs: "67%", lg: "90%" },
                    },
                  }}
                >
                  <img src={list1} alt="img" />
                </Box>
                <Box
                  sx={{
                    left: "0",
                    width: "100%",
                    // p:"4rem",
                    ml: "-23rem",
                    display: "flex",
                    "& img": {
                      m: "auto",
                      width: { xs: "75%", lg: "100%" },
                    },
                  }}
                >
                  <img src={img2} alt="img" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            bgcolor: theme.palette.blue[500],
            height: { xs: "40rem", lg: "45rem" },
            m: { xs: "0 0 65rem 0", lg: "0" },
            "@media (min-width: 380px)": {
              m: "0 0 50rem 0",
            },
            "@media (min-width: 750px)": {
              m: "0 0 calc(35rem + 0.5vw) 0",
            },
            "@media (min-width: 1220px)": {
              m: "0",
            },
            // "@media (min-width: 900px)": {
            //   m: "0 0 33rem 0",
            // },
            p: { xs: "4rem 0 0 1rem", lg: "4rem 0 0 4rem" },
          }}
        >
          {/* <Container maxWidth="xl"> */}
          <Box sx={{ display: { xs: "block", lg: "flex", height: "100%" } }}>
            <Box
              sx={{
                height: "auto",
                display: "flex",
                flex: "1",
                p: { xs: "3rem 0", lg: "2rem 0" },
              }}
            >
              <Box
                sx={{
                  m: "auto",
                  bgcolor: "rgba(255,255,255, .5)",
                  width: { xs: "80%", lg: "70%" },
                  p: "3rem",
                  backdropFilter: "blur(10px)",
                  "& .MuiTypography-h1": {
                    fontSize: { xs: "2.5rem", lg: "4.3rem" },
                    fontWeight: "700",
                    textAlign: "center",
                    color: theme.palette.secondary[1000],
                  },
                }}
              >
                <Typography variant="h1">
                  Expertise in payroll that is unparalleled
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                flex: "1",
                marginBottom: "-1rem",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  zIndex: 10,
                  position: "absolute",
                  p: { xs: "2rem 1rem", lg: "3rem" },
                  borderRadius: "1rem 0 0 1rem",
                  bgcolor: theme.palette.secondary[500],
                  "& .MuiTypography-h3": {
                    fontWeight: "500",
                    color: "#112A62",
                    // color: theme.palette.blue[700],
                    mb: "2rem",
                    fontSize: "1.7rem",
                  },
                  "& .MuiTypography-h4": {
                    fontWeight: "400",
                    fontSize: "1.5rem",
                    color: theme.palette.secondary[1000],
                    mb: "2rem",
                  },
                }}
              >
                <Typography variant="h3">Why Upayroll?</Typography>
                <Typography variant="h4">
                  Our platform stands out from other payroll providers by
                  offering customizable solutions that cater to the unique needs
                  of your business.
                </Typography>
                <Box>
                  <Box
                    sx={{
                      display: { xs: "block", lg: "flex" },
                      "& .MuiBox-root": {
                        m: "0 .5rem",
                        flex: 1,
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="h3">
                        Efficient payroll processing
                      </Typography>
                      <Typography variant="h4">
                        Upayroll offers in-house payroll processing for direct
                        employees, EOR, and contractors, ensuring that your
                        local and international teams get paid quickly and
                        efficiently.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h3">
                        Comprehensive payroll management
                      </Typography>
                      <Typography variant="h4">
                        The platform provides a seamless experience for managing
                        all aspects of payroll, from calculating wages and taxes
                        to generating payslips and making payments.
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: { xs: "block", lg: "flex" },
                      "& .MuiBox-root": {
                        m: "0 .5rem",
                        flex: 1,
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="h3">Data security</Typography>
                      <Typography variant="h4">
                        Upayroll has robust security measures in place to
                        protect sensitive payroll data, ensuring that users'
                        information is always safe and secure.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h3">
                        User-friendly interface
                      </Typography>
                      <Typography variant="h4">
                        The user-friendly interface makes it easy for users to
                        navigate the platform and manage their payroll-related
                        tasks with ease.
                      </Typography>
                    </Box>
                  </Box>
                  <a
                    href="https://calendly.com/uridiumworks/30min"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ButtonComp
                      size="medium"
                      variant="contained"
                      sx={{
                        color: theme.palette.secondary[100],
                        "&:hover": {
                          color: theme.palette.secondary[100],
                          bgcolor: theme.palette.blue[500],
                        },
                      }}
                      ButtonStartIcon=""
                      childern="Book a Demo"
                    />
                  </a>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* </Container> */}
        </Box>
        <Box sx={{ p: "8rem 0 4rem 0" }}>
          <Container maxWidth="xl">
            <Typography variant="h2" sx={{ fontWeight: "500" }}>
              UPayroll for any business
            </Typography>
            <Box
              sx={{
                display: "flex",
                // mt: 2,
                flexWrap: "wrap",
                "& .MuiButton-root": {
                  borderRadius: ".4rem",
                  boxShadow: "none",
                  border: `1px solid ${theme.palette.secondary[600]}`,
                  // bgcolor: theme.palette.blue[500],
                  color: theme.palette.secondary[1000],
                  textTransform: "capitalize",
                  fontSize: { xs: "1.3rem", sm: "1.3rem" },
                  // p: { xs: ".3rem .4rem", sm: ".5rem 1.5rem" },
                  whiteSpace: "nowrap",
                  m: "1.2rem 1rem auto 0",
                  "&:hover": {
                    border: `1px solid ${theme.palette.secondary[600]}`,
                    color: theme.palette.secondary[1000],
                  },
                },
              }}
            >
              <ButtonComp variant="outlined" size="small" childern="Startups" />
              <ButtonComp
                variant="outlined"
                size="small"
                childern="eCommerce"
              />
              <ButtonComp variant="outlined" size="small" childern="Fintechs" />
              <ButtonComp variant="outlined" size="small" childern="Stores" />
            </Box>

            {/* Partners */}

            {/* <Typography
              variant="h1"
              sx={{ fontWeight: "300", color: theme.palette.blue[500], mt: 1 }}
            >
              Here are our current clients
            </Typography>
            <Box
              sx={{
                mt: 2,
                "& .MuiBox-root": {
                  display: "flex",
                  "& img": {
                    width: "100%",
                    m: "auto",
                  },
                },
              }}
            >
              <Grid
                container
                spacing={{ xs: 2, sm: 2, md: 2, lg: 10 }}
                columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
              >
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box>
                    <img src={partner1} alt="partner1" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box>
                    <img src={partner3} alt="logo" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box>
                    <img src={partner2} alt="partner2" />
                  </Box>
                </Grid>
              </Grid>
            </Box> */}
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
