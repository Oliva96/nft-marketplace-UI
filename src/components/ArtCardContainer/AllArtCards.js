import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadNFTs } from "../../Services/AllArtCards.service";
import ArtCard from "../ArtCard/ArtCard";
import ArtCardFB from "../Skeletons/ArtCardFB";

const AllArtCards = ({ queryName, darkMode }) => {
  const [artWorks, setArtWorks] = useState([]);
  const [filteredArtCards, setfilteredArtCards] = useState([]);

  const navigate = useNavigate(); // navigation

  // Loading data from API
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/artWorkData.json");
      const artWorkData = res.data;
      setArtWorks(artWorkData);

      // const artWorkData = loadNFTs();
      // setArtWorks(artWorkData);
    }
    fetchData();
  }, []);

  // Handle category
  useEffect(() => {
    handleCategory();
  }, [queryName, artWorks]);

  const handleCategory = () => {
    switch (queryName){
      case "memes":
        setfilteredArtCards(artWorks.filter((ac) => ac.tags === "memes"));
        break;
      case "art":
        setfilteredArtCards(artWorks.filter((ac) => ac.tags === "art"));
        break;
      case "music":
        setfilteredArtCards(artWorks.filter((ac) => ac.tags === "music"));
        break;
      case "poster":
        setfilteredArtCards(artWorks.filter((ac) => ac.tags === "poster"));
        break;
      case "signature":
        setfilteredArtCards(artWorks.filter((ac) => ac.tags === "signature"));
        break;
      default:
        setfilteredArtCards(artWorks);
        break;
    }
  }

  // Handler for navigating to the details
  const handleDetails = (id) => {
    navigate(`/explore/${id}`);
  };


  return (
    <>
      <Box>
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
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
    </>
  );
};

export default AllArtCards;
