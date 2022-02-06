import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
// import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import AuctionCardHome from "../../components/Skeletons/AuctionCardHome";
import AuctionCardPrev from "../../components/AuctionCard/AuctionCardPrev";

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3.2,
  slidesToScroll: 3.2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3.2,
        slidesToScroll: 3.2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        infinite: true,
        // autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

const LiveAuctionContainer = ({ darkMode }) => {
  const [liveAuctions, setLiveAuctions] = useState([]);

  const liveSlideRef = useRef();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetch("/auctionData.json").then((res) =>
      res.json().then((data) => setLiveAuctions(data))
    );
  }, []);

  const filteredLiveAuction = liveAuctions.filter(
    (la) => la.auctionStatus === "live"
  );

  // Slide Handler for live auctions
  const nextButtonLive = () => {
    liveSlideRef.current.slickNext();
  };
  const previousButtonLive = () => {
    liveSlideRef.current.slickPrev();
  };

  return (
    <>
      {/* Web */}
      {!isMobile ? (
        <Box
          sx={{
            pt: 10,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              component="div"
              sx={{
                borderBottom: `${
                  darkMode ? "2px solid #ffffff" : "2px solid #040404"
                }`,
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                component="p"
                color="secondary"
                sx={{
                  zIndex: 2,
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "1.2rem",
                }}
              >
                {t("LIVE_AUCTIONS")}
              </Typography>
              <Typography
                variant="h1"
                component="p"
                sx={{
                  background:
                    "linear-gradient(91.95deg, #2175D7 1.75%, #5ACDFE 98.13%)",
                  borderRadius: "4px",
                  width: "35px",
                  height: "24px",
                  ml: -3,
                  display: `${darkMode ? "block" : "none"}`,
                }}
              ></Typography>
            </Typography>
            <Typography varaint="body2" component="div">
              <Button
                onClick={() => navigate("/auction?type=live")}
                color="secondary"
              >
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ textTransform: "capitalize" }}
                >
                  {t("VIEW_ALL")}
                </Typography>
              </Button>
            </Typography>
          </Box>
          {filteredLiveAuction.length === 0 && (
            <Slider ref={liveSlideRef} {...sliderSettings}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <AuctionCardHome darkMode={darkMode} key={n} />
              ))}
            </Slider>
          )}
          {filteredLiveAuction.length > 0 && (
            <Slider ref={liveSlideRef} {...sliderSettings}>
              {filteredLiveAuction.map((la) => (
                <div key={la.id}>
                  <AuctionCardPrev darkMode={darkMode} la={la} />
                </div>
              ))}
            </Slider>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: -5,
            }}
          >
            <Button onClick={previousButtonLive} color="secondary">
              <Typography component="span" color="secondary" fontSize={25}>
                <HiArrowNarrowLeft />
              </Typography>
            </Button>
            <Button onClick={nextButtonLive} color="secondary">
              <Typography component="span" color="secondary" fontSize={25}>
                <HiArrowNarrowRight />
              </Typography>
            </Button>
          </Box>
        </Box>
      ) : (
        // Mobile
        <Box
          sx={{
            pt: 10,
            pb: 5,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 8,
              mt: 4,
            }}
          >
            <Typography
              component="div"
              sx={{
                borderBottom: `${
                  darkMode ? "2px solid #ffffff" : "2px solid #040404"
                }`,
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                component="p"
                color="secondary"
                sx={{ zIndex: 2, cursor: "pointer" }}
              >
                {t("LIVE_AUCTIONS")}
              </Typography>
              {darkMode && (
                <Typography
                  variant="h1"
                  component="p"
                  sx={{
                    background:
                      "linear-gradient(91.95deg, #2175D7 1.75%, #5ACDFE 98.13%)",
                    borderRadius: "4px",
                    width: "35px",
                    height: "24px",
                    ml: -2,
                  }}
                ></Typography>
              )}
            </Typography>
            <Typography varaint="body2" component="div">
              <Button
                onClick={() => navigate("/auction?type=live")}
                color="secondary"
              >
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ textTransform: "capitalize" }}
                >
                  {t("VIEW_ALL")}
                </Typography>
              </Button>
            </Typography>
          </Box>
          {filteredLiveAuction.length === 0 && (
            <Slider ref={liveSlideRef} {...sliderSettings}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <AuctionCardHome darkMode={darkMode} key={n} />
              ))}
            </Slider>
          )}
          {filteredLiveAuction.length > 0 && (
            <Slider ref={liveSlideRef} {...sliderSettings}>
              {filteredLiveAuction.map((la) => (
                <div key={la.id}>
                  <AuctionCardPrev darkMode={darkMode} la={la} />
                </div>
              ))}
            </Slider>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Button onClick={previousButtonLive} color="secondary">
              <Typography component="span" color="secondary">
                <HiArrowNarrowLeft />
              </Typography>
            </Button>
            <Button onClick={nextButtonLive} color="secondary">
              <Typography component="span" color="secondary">
                <HiArrowNarrowRight />
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default LiveAuctionContainer;
