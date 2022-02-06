import React, { useState } from "react";

// From Material UI
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Backdrop,
  Button,
  Divider,
  Fade,
  IconButton,
  Modal,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

import { add } from "date-fns";

// Custom Gradient button
import { GradientButtonPrimary } from "../../Utils/GradientButtons/GradientButtons";

// Icon
import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineClock, HiTemplate } from "react-icons/hi";
import { BsFillBookmarkFill, BsBookmark, BsChevronDown } from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa";

import CountDownBoard from "../CountDownBoard/CountDownBoard";

import { useTranslation } from "react-i18next";

import { useTheme } from "@emotion/react";

// Styles
import styles from "./SingleAuctionCard.module.css";

// bidding data information
import { biddingData } from "./biddingData";

// Tabpanel
import { TabPanel } from "./TabPanel";

// will come form api
const futureDate = add(new Date(), {
  days: 7,
  hours: 12,
  minutes: 21,
});

const SingleAuctionCard = ({ fa, darkMode }) => {
  const {
    id,
    artworkImage,
    artworkTitle,
    artworkDetails,
    artworkPrice,
    creator,
    creatorImage,
    owner,
    ownerImage,
    uploaded,
    likes,
  } = fa;

  const [openModal, setOpenModal] = React.useState(false);

  const [likeState, setLikeState] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(false);

  const [showBidInput, setShowBidInput] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { t } = useTranslation();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const location = useLocation();

  const [tabValue, setTabValue] = useState(0); // setting tab value for changing

  // Tab handler
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const MobileTabs = styled(Tabs)({
    border: "none",
    backgroundColor: `${darkMode ? "#040404" : "#ffffff"}`,
    "& .MuiTabs-indicator": {
      backgroundColor: "inherit",
    },
  });

  const MobileTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
    "&.Mui-selected": {
      color: "#ffffff",
      backgroundColor: "#01D4FA",
      borderRadius: "4px",
      fontWeight: theme.typography.fontWeightMedium,
    },
  }));

  return (
    // Artwork details information
    <>
      <Modal
        sx={{ zIndex: 500000 }}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            bgcolor={darkMode ? "#171c26" : "#fff2f8"}
            className={
              !isMobile ? styles.modalStyleWeb : styles.modalStyleMobile
            }
          >
            <Box className={styles.modalBox}>
              <Typography component="span" color="secondary" mt={0.5}>
                <HiTemplate fontSize={"1.5rem"} />
              </Typography>
              <Typography color="secondary" variant="h6" mt={-0.2}>
                {t("ITEM_DETAILS")}
              </Typography>
            </Box>
            <Typography
              // Global classes
              className={
                !isMobile ? "readMoreModalText" : "readMoreModalTextMobile"
              }
              variant="body2"
              color="secondary"
              lineHeight={2}
              height={"250px"}
              pr={2.5}
              sx={{
                overflowY: "auto",
              }}
            >
              {artworkDetails}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Box className={styles.mainBox}>
        <Box>
          {/* Top navigation */}
          {!isMobile ? (
            <Box className={styles.topNavBox}>
              <FiChevronLeft fontSize={"1.5rem"} />
              <Box
                borderBottom={`2px solid ${darkMode ? "#ffffff" : "#121212"}`}
                position="relative"
                display="flex"
                alignItems="center"
              >
                <Typography
                  onClick={() => window.history.back()}
                  variant="h6"
                  component="p"
                  sx={{ cursor: "pointer" }}
                >
                  {t("ITEM_DETAILS")}
                </Typography>
                {darkMode && (
                  <Typography
                    className={styles.labelHighLighter}
                    variant="h1"
                  ></Typography>
                )}
              </Box>
            </Box>
          ) : (
            <Box className={styles.topNavBoxMobile}>
              <Box
                bgcolor={darkMode ? "#040404" : "#ffffff"}
                height={"70px"}
                width={"80px"}
              >
                <FiChevronLeft
                  onClick={() => window.history.back()}
                  fontSize={"1.5rem"}
                />
              </Box>
              <Box
                borderBottom={`2px solid ${darkMode ? "#ffffff" : "#121212"}`}
                position="relative"
                display="flex"
                alignItems="center"
              >
                <Typography variant="body2" component="p">
                  {t("ITEM_DETAILS")}
                </Typography>
              </Box>
            </Box>
          )}
          {/* Details container */}
          {!isMobile ? (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              gap={4}
            >
              <Box>
                <img
                  className={styles.auctionMainImage}
                  src={artworkImage}
                  alt={artworkTitle}
                />
              </Box>
              <Box
                bgcolor={darkMode ? "#171C26" : "#FFF2F8"}
                className={styles.auctionMainContentBox}
              >
                <Box>
                  <Typography variant="h6" color="secondary.main" mb={4}>
                    {artworkTitle}
                  </Typography>
                  <Typography
                    variant="body2"
                    lineHeight={1.5}
                    mb={2}
                    textAlign="justify"
                  >
                    {artworkDetails.slice(0, 200)}
                    <Button
                      variant="text"
                      sx={{ color: "#01D4FA", textTransform: "lowercase" }}
                      onClick={handleOpenModal}
                    >
                      ...{t("READ_MORE")}
                    </Button>
                  </Typography>
                  <Accordion
                    className={styles.accordionStyles}
                    disableGutters
                    elevation={0}
                    sx={{
                      backgroundColor: `${darkMode ? "#171c26" : "#fff2f8"}`,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <BsChevronDown
                          fontSize={"1rem"}
                          color={darkMode ? "#ffffff" : "#040404"}
                          style={{ marginTop: "5px" }}
                        />
                      }
                    >
                      <Typography variant="h6" color="secondary" ml={-2}>
                        {t("PROPERTIES")}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack direction="row" spacing={2} ml={-2}>
                        <Box
                          className={styles.propertiesBox}
                          bgcolor={darkMode ? "#040404" : "#ffffff"}
                        >
                          <Typography variant="button" color="#01D4FA">
                            Color
                          </Typography>
                          <Typography variant="body2" color="secondary">
                            Pink
                          </Typography>
                        </Box>
                        <Box
                          bgcolor={darkMode ? "#040404" : "#ffffff"}
                          className={styles.propertiesBox}
                        >
                          <Typography variant="button" color="#01D4FA">
                            Material
                          </Typography>
                          <Typography variant="body2" color="secondary">
                            Cotton
                          </Typography>
                        </Box>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                  <Typography
                    variant="h6"
                    color={darkMode ? "#FFFFFF" : "#121212"}
                    mb={2}
                  >
                    {t("PRICE")}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="secondary.main"
                    mb={3}
                    fontWeight={500}
                  >
                    {artworkPrice}
                  </Typography>
                  <Divider className={styles.dividerStyle} />
                  <Box mt={3}>
                    <CountDownBoard
                      darkMode={darkMode}
                      futureDate={futureDate}
                    />
                  </Box>
                  <Divider className={styles.dividerStyle} />
                  <Box className={styles.auctionInfoBox}>
                    <Box className={styles.avatarBox}>
                      <Box>
                        <Avatar
                          sx={{
                            border: `2px solid ${
                              darkMode ? "#ffffff" : "#01D4FA"
                            }`,
                          }}
                          src={creatorImage}
                          alt={creator}
                        />
                      </Box>
                      <Stack direction="column">
                        <Typography variant="caption" gutterBottom color="gray">
                          {t("CREATOR")}
                        </Typography>
                        <Typography
                          variant="caption"
                          gutterBottom
                          color="secondary.main"
                        >
                          {creator}
                        </Typography>
                      </Stack>
                    </Box>
                    <Box className={styles.avatarBox}>
                      <Box>
                        <Avatar
                          sx={{
                            border: `2px solid ${
                              darkMode ? "#ffffff" : "#01D4FA"
                            }`,
                          }}
                          src={ownerImage}
                          alt={owner}
                        />
                      </Box>
                      <Stack direction="column">
                        <Typography variant="caption" gutterBottom color="gray">
                          {t("OWNER")}
                        </Typography>
                        <Typography
                          variant="caption"
                          gutterBottom
                          color="secondary.main"
                        >
                          {owner}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                  <Divider className={styles.dividerStyle} />
                  <Box className={styles.auctionInteractionBox}>
                    <Stack direction="row" alignItems="center">
                      <IconButton>
                        <Typography component="span" color="secondary">
                          <HiOutlineClock className={styles.iconStyle} />
                        </Typography>
                      </IconButton>
                      <Typography
                        variant="caption"
                        component="span"
                        color={darkMode ? "#ffffff" : "#121212"}
                      >
                        {uploaded} {t("HOURS_AGO")}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <Box className={styles.loveIconBox}>
                        <IconButton onClick={() => setLikeState(!likeState)}>
                          {likeState ? (
                            <Typography component="span" color="#e23e58">
                              <AiFillHeart className={styles.iconStyle} />
                            </Typography>
                          ) : (
                            <Typography color="secondary" component="span">
                              <AiOutlineHeart className={styles.iconStyle} />
                            </Typography>
                          )}
                        </IconButton>
                        <Typography
                          variant="caption"
                          component="span"
                          color={darkMode ? "#ffffff" : "#121212"}
                        >
                          {likes}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          onClick={() => setBookmarkState(!bookmarkState)}
                        >
                          {bookmarkState ? (
                            <Typography component="span" color="#01D4FA">
                              <BsFillBookmarkFill
                                className={styles.iconStyle}
                              />
                            </Typography>
                          ) : (
                            <Typography component="span" color="secondary">
                              <BsBookmark className={styles.iconStyle} />
                            </Typography>
                          )}
                        </IconButton>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
                <Box
                  className={styles.footerButtonBox}
                  onSubmit={(e) => e.preventDefault()}
                  component="form"
                >
                  {showBidInput ? (
                    <>
                      <input
                        className={styles.bidPriceInput}
                        style={{
                          backgroundColor: `${
                            darkMode ? "#171c26" : "#fff2f8"
                          }`,
                          color: `${darkMode ? "#ffffff" : "#040404"}`,
                        }}
                        placeholder="0.01"
                        type="number"
                        required
                      />
                      <Typography
                        position="absolute"
                        px={1}
                        mt={-5}
                        bgcolor={darkMode ? "#171c26" : "#fff2f8"}
                        variant="caption"
                      >
                        Place Your Bid
                      </Typography>
                      <Typography
                        py={0.2}
                        px={1}
                        ml={9}
                        className={styles.bidPriceCurrencyBox}
                        variant="button"
                      >
                        minto
                      </Typography>
                      <GradientButtonPrimary
                        className={styles.gradientButton}
                        type="submit"
                        variant="contained"
                      >
                        <Typography component="span" color="#ffffff">
                          <FaThumbsUp />
                        </Typography>
                        <Typography
                          sx={{ fontSize: "12px" }}
                          variant="body1"
                          component="span"
                        >
                          {location.pathname === `/auction/${id}`
                            ? `${t("PLACE_YOUR_BID")}`
                            : `${t("BUY_NOW")}`}
                        </Typography>
                      </GradientButtonPrimary>
                    </>
                  ) : (
                    <GradientButtonPrimary
                      onClick={() => setShowBidInput(true)}
                      variant="contained"
                      className={styles.gradientButton}
                    >
                      <Typography component="span" color="#ffffff">
                        <FaThumbsUp className={styles.iconStyle} />
                      </Typography>
                      <Typography
                        fontSize={"12px"}
                        variant="body1"
                        component="span"
                      >
                        {location.pathname === `/auction/${id}`
                          ? `${t("PLACE_YOUR_BID")}`
                          : `${t("BUY_NOW")}`}
                      </Typography>
                    </GradientButtonPrimary>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box className={styles.detailsContainerMobile}>
              <Box mt={"1rem"}>
                <img
                  className={styles.auctionMainImageMobile}
                  src={artworkImage}
                  alt={artworkTitle}
                />
              </Box>
              {/* Countdown board */}
              <Box position="relative" mt={-7} mb={5}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: " translate(-50%, -50%)",
                    zIndex: 1000,
                  }}
                >
                  <Box>
                    <CountDownBoard
                      darkMode={darkMode}
                      futureDate={futureDate}
                    />
                  </Box>
                </Box>
              </Box>
              <Box className={styles.auctionInteractionBoxMobile}>
                <Stack direction="row" alignItems="center">
                  <IconButton>
                    <Typography color="secondary">
                      <HiOutlineClock className={styles.iconStyle} />
                    </Typography>
                  </IconButton>
                  <Typography
                    variant="caption"
                    color={darkMode ? "#ffffff" : "#121212"}
                  >
                    {uploaded} {t("HOURS_AGO")}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box className={styles.loveIconBoxMobile}>
                    <IconButton onClick={() => setLikeState(!likeState)}>
                      {likeState ? (
                        <AiFillHeart
                          className={styles.iconStyle}
                          style={{
                            color: "#e23e58",
                          }}
                        />
                      ) : (
                        <AiOutlineHeart
                          className={styles.iconStyle}
                          style={{
                            color: `${darkMode ? "#ffffff" : "#121212"}`,
                          }}
                        />
                      )}
                    </IconButton>
                    <Typography
                      variant="caption"
                      color={darkMode ? "#ffffff" : "#121212"}
                    >
                      {likes}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => setBookmarkState(!bookmarkState)}
                    >
                      {bookmarkState ? (
                        <Typography component="span" color="#01D4FA">
                          <BsFillBookmarkFill className={styles.iconStyle} />
                        </Typography>
                      ) : (
                        <Typography component="span" color="secondary">
                          <BsBookmark className={styles.iconStyle} />
                        </Typography>
                      )}
                    </IconButton>
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Box className={styles.auctionInfoBoxMobile}>
                  <Box className={styles.avatarBox}>
                    <Box>
                      <Avatar
                        sx={{
                          border: `2px solid ${
                            darkMode ? "#ffffff" : "#01D4FA"
                          }`,
                        }}
                        src={creatorImage}
                        alt={creator}
                      />
                    </Box>
                    <Stack direction="column" alignItems="center">
                      <Typography variant="caption" gutterBottom color="gray">
                        {t("CREATOR")}
                      </Typography>
                      <Typography
                        variant="caption"
                        gutterBottom
                        color="secondary.main"
                      >
                        {creator}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box className={styles.avatarBox}>
                    <Box>
                      <Avatar
                        sx={{
                          border: `2px solid ${
                            darkMode ? "#ffffff" : "#01D4FA"
                          }`,
                        }}
                        src={ownerImage}
                        alt={owner}
                      />
                    </Box>
                    <Stack direction="column" alignItems="center">
                      <Typography variant="caption" gutterBottom color="gray">
                        {t("OWNER")}
                      </Typography>
                      <Typography
                        variant="caption"
                        gutterBottom
                        color="secondary.main"
                      >
                        {owner}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="secondary.main" mb={2}>
                    {artworkTitle}
                  </Typography>
                  <Typography mb={2} textAlign="left" variant="caption">
                    {artworkDetails.slice(0, 200)}
                    <Button
                      variant="text"
                      onClick={handleOpenModal}
                      sx={{ fontSize: "11px", color: "#01d4fa" }}
                    >
                      ...{t("READ_MORE")}
                    </Button>
                  </Typography>
                  <Box mb={5}>
                    <Typography variant="subtitle2" color="secondary" mb={2}>
                      {t("PROPERTIES")}
                    </Typography>
                    <Accordion
                      className={styles.accordionStyles}
                      disableGutters
                      elevation={0}
                      sx={{
                        backgroundColor: `${darkMode ? "#171c26" : "#fff2f8"}`,
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <BsChevronDown
                            fontSize={"1rem"}
                            color={darkMode ? "#ffffff" : "#040404"}
                            style={{ marginTop: "5px" }}
                          />
                        }
                      >
                        <Typography variant="h6" color="secondary" ml={-2}>
                          {t("PROPERTIES")}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack direction="row" spacing={2} ml={-2}>
                          <Box
                            className={styles.propertiesBox}
                            bgcolor={darkMode ? "#040404" : "#ffffff"}
                          >
                            <Typography variant="button" color="#01D4FA">
                              Color
                            </Typography>
                            <Typography variant="body2" color="secondary">
                              Pink
                            </Typography>
                          </Box>
                          <Box
                            bgcolor={darkMode ? "#040404" : "#ffffff"}
                            className={styles.propertiesBox}
                          >
                            <Typography variant="button" color="#01D4FA">
                              Material
                            </Typography>
                            <Typography variant="body2" color="secondary">
                              Cotton
                            </Typography>
                          </Box>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    component="p"
                    color={darkMode ? "#FFFFFF" : "#121212"}
                    mb={1}
                    mt={-3}
                  >
                    {t("PRICE")}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    color="secondary.main"
                    mb={1}
                  >
                    {artworkPrice}
                  </Typography>
                </Box>
                <Box onSubmit={(e) => e.preventDefault()} component="form">
                  {showBidInput ? (
                    <>
                      <input
                        className={styles.bidPriceInput}
                        placeholder="0.01"
                        type="number"
                        style={{
                          backgroundColor: `${
                            darkMode ? "#171c26" : "#fff2f8"
                          }`,
                          color: `${darkMode ? "#ffffff" : "#040404"}`,
                        }}
                        required
                      />
                      <Typography
                        className={styles.bidPriceInputCaption}
                        sx={{
                          backgroundColor: `${
                            darkMode ? "#040404" : "#fff2f8"
                          }`,
                          color: "#E552FF",
                        }}
                        variant="caption"
                        component="p"
                      >
                        Place Your Bid
                      </Typography>
                      <Typography
                        className={styles.bidPriceCurrencyBox}
                        variant="button"
                        component="p"
                      >
                        minto
                      </Typography>
                      <GradientButtonPrimary
                        className={styles.gradientButton}
                        type="submit"
                        variant="contained"
                      >
                        <Typography component="span" color="#ffffff">
                          <FaThumbsUp />
                        </Typography>
                        <Typography
                          fontSize={"12px"}
                          variant="body1"
                          component="span"
                        >
                          {t("BUY_NOW")}
                        </Typography>
                      </GradientButtonPrimary>
                    </>
                  ) : (
                    <GradientButtonPrimary
                      onClick={() => setShowBidInput(true)}
                      variant="contained"
                      className={styles.gradientButton}
                    >
                      <Typography component="span" color="#ffffff">
                        <FaThumbsUp />
                      </Typography>
                      <Typography
                        fontSize={"12px"}
                        variant="body1"
                        component="span"
                      >
                        {t("BUY_NOW")}
                      </Typography>
                    </GradientButtonPrimary>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* Tabs and panels*/}
        {!isMobile ? (
          <Box className={styles.tabPanelBox}>
            <Box width={"100%"} my={16}>
              <Box
                bgcolor={darkMode ? "#171c26" : "#fff2f8"}
                borderRadius={"10px"}
              >
                <Tabs
                  textColor="secondary"
                  indicatorColor="secondary"
                  value={tabValue}
                  onChange={handleChange}
                >
                  <Tab
                    sx={{ color: "gray", ml: 5, textTransform: "capitalize" }}
                    label={t("RECENT_BID")}
                  />
                  <Tab
                    sx={{ color: "gray", ml: 12, textTransform: "capitalize" }}
                    label={t("HISTORY")}
                  />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                {/* Global class */}
                <div className="tabStyles">
                  {biddingData[0].bidder.map((bd) => (
                    <Box key={bd.id}>
                      <Box className={styles.tabInfoBox}>
                        <Avatar
                          sx={{
                            border: `2px solid ${
                              darkMode ? "#ffffff" : "#01D4FA"
                            }`,
                          }}
                          src={bd.avatar}
                          alt={bd.name}
                        />
                        <Typography variant="body2" component="p">
                          {t("BIDDING_PRICE")}{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {bd.amount}
                          </span>{" "}
                          {t("BIDDING_BY")}{" "}
                          <span style={{ fontWeight: "bold" }}>{bd.name}</span>{" "}
                          {t("BIDDING_AT")} {bd.date} {bd.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </div>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                {/* Global class */}
                <div className="tabStyles">
                  {biddingData[0].acceptee.map((bd) => (
                    <Box key={bd.id}>
                      <Box className={styles.tabInfoBox}>
                        <Avatar
                          sx={{
                            border: `2px solid ${
                              darkMode ? "#ffffff" : "#01D4FA"
                            }`,
                          }}
                          src={bd.avatar}
                          alt={bd.name}
                        />
                        <Typography variant="body2" component="p">
                          {t("BIDDING_PRICE")}{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {bd.amount}
                          </span>{" "}
                          {t("BIDDING_BY")}{" "}
                          <span style={{ fontWeight: "bold" }}>{bd.name}</span>{" "}
                          {t("BIDDING_AT")} {bd.date} {bd.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </div>
              </TabPanel>
            </Box>
          </Box>
        ) : (
          <Box className={styles.tabPanelBox}>
            <Box width={"100%"} mt={5} mb={-3}>
              <Box ml={-2} mb={2}>
                <MobileTabs
                  textColor="secondary"
                  indicatorColor="secondary"
                  value={tabValue}
                  onChange={handleChange}
                >
                  <MobileTab
                    sx={{ color: "gray", textTransform: "capitalize" }}
                    label={t("RECENT_BID")}
                  />
                  <MobileTab
                    sx={{ color: "gray", ml: 3, textTransform: "capitalize" }}
                    label={t("HISTORY")}
                  />
                </MobileTabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <div className="tabStylesMobile">
                  {biddingData[0].bidder.map((bd) => (
                    <Box key={bd.id}>
                      <Box className={styles.tabInfoBox}>
                        <Avatar
                          sx={{
                            border: `2px solid ${
                              darkMode ? "#ffffff" : "#01D4FA"
                            }`,
                          }}
                          src={bd.avatar}
                          alt={bd.name}
                        />
                        <Typography
                          variant="body2"
                          fontSize={"12px"}
                          lineHeight={2}
                        >
                          {t("BIDDING_PRICE")}{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {bd.amount}
                          </span>{" "}
                          {t("BIDDING_BY")}{" "}
                          <span style={{ fontWeight: "bold" }}>{bd.name}</span>{" "}
                          {t("BIDDING_AT")} {bd.date} {bd.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </div>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <div className="tabStylesMobile">
                  {biddingData[0].acceptee.map((bd) => (
                    <Box key={bd.id}>
                      <Box className={styles.tabInfoBox}>
                        <Avatar
                          sx={{
                            border: `2px solid ${
                              darkMode ? "#ffffff" : "#01D4FA"
                            }`,
                          }}
                          src={bd.avatar}
                          alt={bd.name}
                        />
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "12px", lineHeight: 2 }}
                        >
                          {t("BIDDING_PRICE")}{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {bd.amount}
                          </span>{" "}
                          {t("BIDDING_BY")}{" "}
                          <span style={{ fontWeight: "bold" }}>{bd.name}</span>{" "}
                          {t("BIDDING_AT")} {bd.date} {bd.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </div>
              </TabPanel>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SingleAuctionCard;
