import { Box, Container, Grid, styled, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Link } from "react-router-dom";
import { albums } from "../../../../src/data/albums.ts";
import { reviews } from "../../../data/reviews.ts";

const Hero = () => {
  const getRating = (albumId: string) => {
    const review = reviews.find((r) => r.albumId === albumId);
    return review?.rating || 0;
  };

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
          {/* <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(6)).map((_, index) => (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                <div>{index + 1}</div>
              </Grid>
            ))}
          </Grid> */}
          <Grid container spacing={2}>
            {albums
              .filter((album) => hasReview(album.id)) //mostra so os albuns com uma review associada
              .map((album) => {
                const rating = getRating(album.id);

                return (
                  <Grid key={album.id} size={{ xs: 6, sm: 4, md: 3 }}>
                    <StyledLink to={`/reviewDetails/${album.id}`}>
                      <StyledGrid>
                        <Box>
                          <StyledImg src={album.imagem} />
                        </Box>

                        <Typography variant="body1">{album.nome}</Typography>
                        <Typography>{album.artista}</Typography>

                        <Typography>
                          {" "}
                          <StarIcon/> {rating}
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
