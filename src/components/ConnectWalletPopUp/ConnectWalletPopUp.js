import React from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";

// Icons
import MetaMaskIcon from "../../assets/Icons/darkUIIcons/metaMaskIcon.svg";
import MetaMaskIconLight from "../../assets/Icons/lightUIIcons/metaMaskIcon.svg";
import { FaWallet } from "react-icons/fa";

import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";

import styles from "./PopUp.module.css";

const ConnectWalletPopUp = ({
  openModal,
  handleCloseModal,
  darkMode,
  handleConnectWallet,
  handleDisconnectWallet,
  walletAddress,
}) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
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
        {!isMobile ? (
          <Box
            bgcolor={darkMode ? "#121212" : "#fff2f8"}
            className={styles.modalStyle}
          >
            <Box display="flex" alignItems="center" gap={4}>
              <Typography component="span" color="secondary">
                <FaWallet />
              </Typography>
              <Typography
                variant="h5"
                borderBottom={`2px solid ${darkMode ? "white" : "#121212"}`}
                pb={"5px"}
              >
                {t("CONNECT_TO_WALLET")}
              </Typography>
            </Box>
            <Box mt={6}>
              <Grid
                container
                columns={{ xs: 12, md: 12 }}
                spacing={{ xs: 4, md: 4 }}
              >
                <Grid item xs={6} md={6}>
                  <Button
                    onClick={handleConnectWallet}
                    disableElevation
                    color="accent"
                    variant="contained"
                    className={styles.buttonStyle}
                  >
                    {darkMode ? (
                      <img src={MetaMaskIcon} alt="Meta Mask" />
                    ) : (
                      <img src={MetaMaskIconLight} alt="Meta Mask" />
                    )}
                  </Button>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    // onClick={handleDisconnectWallet}
                    disableElevation
                    color="accent"
                    variant="contained"
                    className={styles.buttonStyle}
                  >
                    {darkMode ? (
                      <img src={MetaMaskIcon} alt="Meta Mask" />
                    ) : (
                      <img src={MetaMaskIconLight} alt="Meta Mask" />
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ) : (
          <Box
            className={styles.modalStyleMobile}
            bgcolor={darkMode ? "#171c26" : "#fff2f8"}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              justifyContect="center"
            >
              <Typography component="span" color="secondary">
                <FaWallet />
              </Typography>
              <Typography
                variant="subtitle1"
                pb={"5px"}
                borderBottom={`2px solid ${darkMode ? "#ffffff" : "#121212"}`}
              >
                {t("CONNECT_TO_WALLET")}
              </Typography>
            </Box>
            <Box mt={4}>
              <Grid
                container
                columns={{ xs: 12, md: 12 }}
                spacing={{ xs: 2, md: 4 }}
              >
                <Grid item xs={6} md={6}>
                  <Button
                    onClick={handleConnectWallet}
                    disableElevation
                    color="accent"
                    variant="contained"
                    className={styles.buttonStyle}
                  >
                    {darkMode ? (
                      <img
                        style={{ width: "30px" }}
                        src={MetaMaskIcon}
                        alt="Meta Mask"
                      />
                    ) : (
                      <img
                        style={{ width: "30px" }}
                        src={MetaMaskIconLight}
                        alt="Meta Mask"
                      />
                    )}
                    <Typography
                      variant="span"
                      color="secondary"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {t("METAMASK")}
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    // onClick={handleDisconnectWallet}
                    disableElevation
                    color="accent"
                    variant="contained"
                    className={styles.buttonStyle}
                  >
                    {darkMode ? (
                      <img
                        style={{ width: "30px" }}
                        src={MetaMaskIcon}
                        alt="Meta Mask"
                      />
                    ) : (
                      <img
                        style={{ width: "30px" }}
                        src={MetaMaskIconLight}
                        alt="Meta Mask"
                      />
                    )}
                    <Typography
                      variant="span"
                      color="secondary"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {t("METAMASK")}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Fade>
    </Modal>
  );
};

export default ConnectWalletPopUp;
