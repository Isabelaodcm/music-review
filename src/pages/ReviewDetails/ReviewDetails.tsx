import { useParams } from "react-router-dom"; //usado para extrair informacoes da url
import { albums } from "../../data/albums";
import { Box, Container, Grid, styled, Typography } from "@mui/material";

const ReviewDetails = () => {
  const { id } = useParams();

  const album = albums.find((a) => a.id === id);

  const StyledDetails = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    paddingTop: "50px",
  }));

  const StyledImg = styled("img")(() => ({
    width: "100%",
    borderRadius: "2%",
  }));

  const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "end",
    [theme.breakpoints.up("xs")]: {
      width: 130,
    },

    [theme.breakpoints.up("md")]: {
      width: 260,
    },
  }));

  console.log("nome do album: ", album?.nome);
  return (
    <>
      <StyledDetails>
        <Container maxWidth="lg">
          <Box display="flex" gap={3}>
          {/* <Grid container spacing={2}> */}
            {/* <Grid size={{ xs: 12, md: 5 }}> */}
              <StyledBox>
            
                <StyledImg src={album?.imagem} />
              </StyledBox>
            {/* </Grid> */}
            {/* <Grid size={{ xs: 12, md: 7 }}> */}
            <Box>
      <Typography variant="h2" color="primary.contrastText" pt={2}>
        {album?.nome}
      </Typography>
    </Box>
            {/* </Grid> */}
          {/* </Grid> */}
          </Box>
        </Container>
      </StyledDetails>
    </>
  );
};

export default ReviewDetails;
