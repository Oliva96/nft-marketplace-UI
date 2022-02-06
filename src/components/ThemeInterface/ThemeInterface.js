import { useTheme } from "@emotion/react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";

import DarkUIPreview from "../../assets/darkUIPrev.svg";
import LightUIPreview from "../../assets/lightUIPrev.svg";

import "./ThemeInterface.css";

const ThemeInterface = ({
  darkMode,
  setDarkMode,
  handleDarkThemeSwitch,
  handleLightThemeSwitch,
}) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const whatTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      return "darkUI";
    } else if (theme === "light") {
      return "lightUI";
    }
  };

  return (
    <>
      {!isMobile ? (
        <Box
          sx={{
            borderRadius: "10px",
          }}
          bgcolor={darkMode ? "#040404" : "#ffffff"}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "secondary",
            }}
          >
            <Box
              sx={{
                width: "100%",
                my: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RadioGroup defaultValue={whatTheme}>
                <Box
                  sx={{ display: "flex", alignItems: "center", my: 2, ml: 5 }}
                >
                  <Box onClick={handleDarkThemeSwitch}>
                    <FormControlLabel
                      value="darkUI"
                      control={
                        <Radio
                          sx={{
                            color: `${darkMode ? "#ffffff" : "#040404"}`,
                            mt: 35,
                            "&.Mui-checked": {
                              color: `${darkMode ? "#ffffff" : "#040404"}`,
                            },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            position: "relative",
                          }}
                        >
                          <Box>
                            <img
                              src={DarkUIPreview}
                              alt="Dark"
                              style={{
                                display: "block",
                                marginLeft: "-1.7rem",
                                width: "100%",
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{ ml: 1 }}
                            variant="body1"
                            component="span"
                          >
                            {t("DARK_UI")}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                  <Box onClick={handleLightThemeSwitch}>
                    <FormControlLabel
                      value="lightUI"
                      control={
                        <Radio
                          sx={{
                            color: `${darkMode ? "#ffffff" : "#040404"}`,
                            mt: 35,
                            "&.Mui-checked": {
                              color: `${darkMode ? "#ffffff" : "#040404"}`,
                            },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            position: "relative",
                          }}
                        >
                          <Box>
                            <img
                              src={LightUIPreview}
                              alt="Light"
                              style={{
                                display: "block",
                                marginLeft: "-1.7rem",
                                width: "100%",
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{ ml: 1 }}
                            variant="body1"
                            component="span"
                          >
                            {t("LIGHT_UI")}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </Box>
              </RadioGroup>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{ position: "relative" }}
          bgcolor={darkMode ? "#121212" : "#ffffff"}
        >
          <Box
            sx={{
              position: "fixed",
              top: "4%",
              zIndex: "10000",
              left: "43%",
            }}
          >
            <Typography
              variant="subtitle1"
              color="secondary"
              component="div"
              sx={{
                borderBottom: `${
                  darkMode ? "2px solid #ffffff" : "1px solid #171c26"
                }`,
              }}
            >
              {t("SETTINGS_THEME")}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "100%",
              borderRadius: "10px",
              pt: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <RadioGroup defaultValue={whatTheme}>
                <Box sx={{ position: "relative" }}>
                  <Box onClick={handleDarkThemeSwitch}>
                    <FormControlLabel
                      value="darkUI"
                      control={
                        <Radio
                          sx={{
                            color: `${darkMode ? "#ffffff" : "#040404"}`,
                            mt: 38,
                            ml: 14,
                            "&.Mui-checked": {
                              color: `${darkMode ? "#ffffff" : "#040404"}`,
                            },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              width: "90%",
                              top: "2%",
                              left: "7.5%",
                            }}
                          >
                            <img
                              src={DarkUIPreview}
                              alt="Dark"
                              style={{
                                display: "block",
                                marginLeft: "-0.5rem",
                                width: "100%",
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{ position: "absolute", top: "45.2%" }}
                            variant="body1"
                            component="span"
                          >
                            {t("DARK_UI")}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                  <Box onClick={handleLightThemeSwitch}>
                    <FormControlLabel
                      value="lightUI"
                      control={
                        <Radio
                          sx={{
                            color: `${darkMode ? "#ffffff" : "#040404"}`,
                            mt: 38,
                            ml: 14,
                            "&.Mui-checked": {
                              color: `${darkMode ? "#ffffff" : "#040404"}`,
                            },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              width: "90%",
                              bottom: "8%",
                              left: "7.5%",
                            }}
                          >
                            <img
                              src={LightUIPreview}
                              alt="Light"
                              style={{
                                display: "block",
                                marginLeft: "-0.5rem",
                                width: "100%",
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{ position: "absolute", bottom: "1.2%" }}
                            variant="body1"
                            component="span"
                          >
                            {t("LIGHT_UI")}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </Box>
              </RadioGroup>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ThemeInterface;
