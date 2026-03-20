import { Box, Container, Grid, styled, Typography } from "@mui/material";
import theMountain from "../../../assets/images/the_mountain.png";
import plasticBeach from "../../../assets/images/plastic_beach.png";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const Hero = () => {
  const StyledHero = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
  }));

  const StyledImg = styled("img")(() => ({
    width: "100%",
    borderRadius: "2%"
  }));

  const StyledDiv = styled("div")(() => ({
    // backgroundColor: "#E36888",
    padding: "15px 25px 15px 25px",
    borderRadius: "2%",
    '&:hover':{
        backgroundColor: "#E36888"
    }
  }))
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
            {/* {Array.from(Array(6)).map((_, index) => (
                <Grid size={{ xs: 6, sm:4, md: 2 }} key={index}>
                <Box>
                    <StyledImg src={theMountain} />
                </Box>
                <Typography>The Mountain</Typography>
                <Typography>Gorillaz</Typography>
                </Grid>
            ))} */}
        
            <Grid size={{ xs: 6, sm:4, md: 3 }}>
                <StyledDiv>
                
              <Box>
                <StyledImg src={theMountain} />
              </Box>
              <Typography variant="body1">The Mountain</Typography>
              <Typography>Gorillaz</Typography>
              <StarIcon/>
              <StarIcon/>
              <StarIcon/>
              <StarIcon/><StarHalfIcon/>
            </StyledDiv>
            </Grid>

            <Grid size={{ xs: 6, sm:4, md: 3 }}>
                <StyledDiv>
                
              <Box>
                <StyledImg src={plasticBeach} />
              </Box>
              <Typography>Plastic Beach</Typography>
              <Typography>Gorillaz</Typography>
            </StyledDiv>
            </Grid>
          </Grid>
        </Container>
      </StyledHero>
    </>
  );
};

export default Hero;
