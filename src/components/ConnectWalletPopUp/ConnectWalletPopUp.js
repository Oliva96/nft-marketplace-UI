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
import MetaMaskIcon from "../../assets/Icons/darkUIIcons/metamask-logo.png";
import { FaWallet } from "react-icons/fa";

import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";

import styles from "./PopUp.module.css";

const ConnectWalletPopUp = ({
  openModal,
  handleCloseModal,
  darkMode,
  handleConnectWallet,
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
            bgcolor={darkMode ? "rgb(8,33,54)" : "#fff2f8"}
            className={styles.modalStyle}
          >
            <Box display="flex" alignItems="center" gap={4}>
              <Typography component="span" color="secondary">
                <FaWallet />
              </Typography>
              <Typography
                variant="h5"
                color="secondary"
                borderBottom={`2px solid ${darkMode ? "#ffffff" : "#121212"}`}
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
                <Grid item xs={12} md={12}>
                  <Button
                    onClick={handleConnectWallet}
                    disableElevation
                    color="accent"
                    variant="contained"
                    className={styles.buttonStyle}
                    style={{ backgroundColor: `${darkMode ? "aliceblue" : "bisque"}`}}
                  >
                    <img src={MetaMaskIcon} alt="Meta Mask" />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ) : (
          <Box
            className={styles.modalStyleMobile}
            bgcolor={darkMode ? "rgb(8,33,54)" : "#fff2f8"}
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
                color="secondary"
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
                <Grid item xs={12} md={12}>
                  <Button
                    onClick={handleConnectWallet}
                    disableElevation
                    color="accent"
                    variant="contained"
                    className={styles.buttonStyle}
                    style={{ backgroundColor: `${darkMode ? "aliceblue" : "bisque"}`}}
                  >
                    <img
                      src={MetaMaskIcon}
                      alt="Meta Mask"
                    />
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
