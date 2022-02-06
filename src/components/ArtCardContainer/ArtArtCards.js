import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtCard from "../ArtCard/ArtCard";
import ArtCardFB from "../Skeletons/ArtCardFB";

const ArtArtCards = ({ queryName, darkMode }) => {
  const [artWorks, setArtWorks] = useState([]);

  const navigate = useNavigate(); // navigation

  // Loading data from API
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/artWorkData.json");
      const artWorkData = res.data;
      setArtWorks(artWorkData);
    }
    fetchData();
  }, []);

  // Handler for navigating to the details
  const handleDetails = (id) => {
    navigate(`/explore/${id}`);
  };

  const filteredArtCards = artWorks.filter((ac) => ac.tags === "art");

  return (
    <>
      {queryName === "art" ? (
        <Box>
          <Grid
            container
            spacing={{ xs: 6, md: 6 }}
            columns={{ xs: 1, md: 12 }}
          >
            {filteredArtCards.length === 0 ? (
              [1, 2, 3, 4, 5, 6].map((n) => (
                <ArtCardFB darkMode={darkMode} key={n} />
              ))
            ) : (
              <>
                {filteredArtCards.map((artWork) => (
                  <ArtCard
                    darkMode={darkMode}
                    key={artWork.id}
                    artWork={artWork}
                    handleDetails={handleDetails}
                  />
                ))}
              </>
            )}
          </Grid>
        </Box>
      ) : null}
    </>
  );
};

export default ArtArtCards;
