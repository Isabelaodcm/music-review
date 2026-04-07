import { Box, Container, Grid, styled, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAlbumDetails } from "../../../services/spotify.ts";

const Hero = () => {
const [reviews, setReviews] = useState<any[]>([]);

  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");

    setReviews(reviews);

    const albumPromises = reviews.map((review: any) =>
      getAlbumDetails(review.albumId)
    );

    const albumsData = await Promise.all(albumPromises);

    setAlbums(albumsData);
  };

  fetchData();
}, []);

  const hasReview = (albumId: string) => {
    return reviews.some((r) => r.albumId === albumId);
  };

  const StyledHero = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    paddingTop: "50px",
  }));

  const StyledImg = styled("img")(() => ({
    width: "100%",
    borderRadius: "2%",
  }));

  const StyledGrid = styled(Grid)(() => ({
    // backgroundColor: "#E36888",
    padding: "15px 25px 15px 25px",
    borderRadius: "2%",
    "&:hover": {
      backgroundColor: "#E36888",
    },
  }));

  const StyledLink = styled(Link)(() => ({
    textDecoration: "none",
    color: "inherit",
  }));

  return (
    <>
      <StyledHero>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {albums
              .filter((album) => hasReview(album.id))
              .map((album) => {
                // const rating = getRating(album.id);
                const review = reviews.find((r) => r.albumId === album.id);

                return (
                  <Grid key={album.id} size={{ xs: 6, sm: 4, md: 3 }}>
                    <StyledLink to={`/reviewDetails/${album.id}`}>
                      <StyledGrid>
                        <Box>
                          <StyledImg src={album.images[0]?.url} />
                        </Box>

                        <Typography variant="body1">{album.name}</Typography>
                        <Typography>{album.artists.map((a: any) => a.name).join(", ")}</Typography>

                        <Typography>
                          {" "}
                          <StarIcon/> {review.average}
                        </Typography>
                      </StyledGrid>
                    </StyledLink>
                  </Grid>
                );
              })}

          </Grid>
        </Container>
      </StyledHero>
    </>
  );
};

export default Hero;
