import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FavouriteCard from "../../components/FavouriteCard/FavouriteCard";
import AuctionCardFB from "../../components/Skeletons/AuctionCardFB";

const AuctionBookmark = ({ queryName, darkMode }) => {
  const [favouriteCards, setFavouriteCards] = useState([]);

  useEffect(() => {
    axios.get("/auctionData.json").then((res) => {
      console.log(res.data);
      setFavouriteCards(res.data);
    });
  }, []);

  const auctionBookmarks = favouriteCards.filter(
    (nb) => nb.auctionStatus === "past"
  );

  return (
    <>
      {queryName === "auction-bookmark" ? (
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 8 }}
            columns={{ xs: 1, md: 12 }}
          >
            {auctionBookmarks.length === 0 ? (
              [1, 2, 3, 4, 5, 6].map((n) => (
                <AuctionCardFB darkMode={darkMode} isPast={false} key={n} />
              ))
            ) : (
              <>
                {auctionBookmarks.map((fb) => (
                  <FavouriteCard darkMode={darkMode} key={fb.id} fb={fb} />
                ))}
              </>
            )}
          </Grid>
        </Box>
      ) : null}
    </>
  );
};

export default AuctionBookmark;
