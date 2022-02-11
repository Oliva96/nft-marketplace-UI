import { useTheme } from "@emotion/react";
import { Container, useMediaQuery } from "@mui/material";
import React, { createContext, useState } from "react";
import SignerContext from "../../signerContext";
import Navigation from "../Navigation/Navigation";
import SideBar from "../SideBar/SideBar";

const Layout = ({ children, darkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [signer, setSigner] = useState(null);

  const value = { signer, setSigner };

  return (
    <>
    <SignerContext.Provider value={value}>
      <Container
        sx={
          darkMode
          ? { backgroundColor: "#040404" }
          : { backgroundColor: "#ffffff" }
        }
        >
        <Navigation darkMode={darkMode} />
        <SideBar darkMode={darkMode} />
        <Container sx={isMobile ? { py: 10 } : { mt: -10 }}>
          {children}
        </Container>
      </Container>
    </SignerContext.Provider>
    </>
  );
};

export default Layout;
