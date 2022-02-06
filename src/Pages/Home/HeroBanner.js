import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { GradientButtonPrimary } from "../../Utils/GradientButtons/GradientButtons";
import CardsDeck from "./CardDeck";

import heroBannerStyles from "./heroBannerStyles.module.css";
import MobileCardDeck from "./MobileCardDeck";

// Vector Lines
// import HeroVectorMainDark from "../../assets/heroVectorMainDark.svg";
// import HeroVectorSecondaryDark from "../../assets/heroVectorSecondaryOneDark.svg";

// import HeroVectorLineLight from "../../assets/heroVectorLineLight.svg";

const HeroBanner = ({ darkMode, isMobile }) => {
  return (
    <Box
      sx={{
        position: "relative",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      {/* <Box sx={{ position: "absolute", top: "15%" }}>
        <img style={{ width: "98%" }} src={HeroVectorSecondaryDark} alt="" />
      </Box>
      <Box sx={{ position: "absolute", top: "25%" }}>
        <img style={{ width: "98%" }} src={HeroVectorSecondaryDark} alt="" />
      </Box>
      <Box sx={{ position: "absolute", top: "30%", right: "5%" }}>
        <img style={{ width: "102%" }} src={HeroVectorMainDark} alt="" />
      </Box>
      <Box sx={{ position: "absolute", top: "30%", right: "5%" }}>
        <img style={{ width: "102%" }} src={HeroVectorMainDark} alt="" />
      </Box> */}
      <Box sx={!isMobile ? { pt: 4, pb: 15 } : { pt: 2, pb: 40 }}>
        <Grid
          container
          columns={{ md: 12, xs: 1 }}
          spacing={!isMobile ? {} : { xs: 8 }}
        >
          <Grid item md={8} xs={1}>
            <Box sx={!isMobile ? { p: 3 } : { pt: 2 }}>
              <Typography
                color="secondary"
                variant={!isMobile ? "h3" : "h5"}
                textAlign={isMobile ? "center" : null}
                component="h3"
                sx={{
                  lineHeight: 1.5,
                  fontWeight: 500,
                  width: `${!isMobile ? "60%" : "100%"}`,
                }}
              >
                Collect & Sell Your{" "}
                <span className={heroBannerStyles.heroGradientText}>
                  Awesome
                </span>{" "}
                NFTs
              </Typography>
              {!isMobile ? (
                <Stack direction="row" alignItems="center" spacing={4} mt={4}>
                  <GradientButtonPrimary variant="contained">
                    Explore
                  </GradientButtonPrimary>
                  <Button variant="outlined" color="secondary">
                    Create
                  </Button>
                </Stack>
              ) : null}
            </Box>
          </Grid>
          <Grid item md={4} xs={1}>
            {!isMobile ? (
              <CardsDeck darkMode={darkMode} />
            ) : (
              <MobileCardDeck darkMode={darkMode} />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HeroBanner;
