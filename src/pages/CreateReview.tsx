import { Box, Container, Rating, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAlbumDetails, getAlbumTracks } from "../services/spotify";
import { useParams } from "react-router-dom";

const StyledHero = styled("div")(({ theme }) => ({
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

const CreateReview = () => {
    const { albumId } = useParams();
    const [tracks, setTracks] = useState<any[]>([]);
    const [ratings, setRatings] = useState<{ [key: string]: number }>({});
    const [album, setAlbum] = useState<any>(null);

    useEffect(() => {
  const fetchTracks = async () => {
   if (!albumId) return <p>Álbum não encontrado</p>;

    const data = await getAlbumTracks(albumId);
    setTracks(data);
  };

  fetchTracks();
}, []);

useEffect(() => {
  const fetchData = async () => {
    if (!albumId) return;

    const albumData = await getAlbumDetails(albumId);
    const tracksData = await getAlbumTracks(albumId);

    setAlbum(albumData);
    setTracks(tracksData);
  };

  fetchData();
}, [albumId]);
  return (
    <>
   <StyledHero>
    <Container maxWidth="lg">
      {album && (

        <Box display="flex" gap={3}>
                  <StyledBox>
                    <StyledImg src={album.images[0]?.url} />
                  </StyledBox>
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    justifyContent={"center"}
                    >
                    <Typography variant="h2" color="primary.contrastText">
                      {album.name}
                    </Typography>
                    <Typography fontSize={17} color="primary.contrastText">
                      {album.artists.map((a: any) => a.name).join(", ")} • 
                      {new Date(album.release_date).getFullYear()} • {album.total_tracks} músicas
                    </Typography>
                  </Box>
                  {/* </Grid> */}
                  {/* </Grid> */}
                </Box>
                  )}
        {tracks.map((track) => (
  <Box key={track.id} display="flex" alignItems="center" gap={2}  
  sx={{
          "&:hover": { backgroundColor: "#E36888" },
        }}>
    
    <Typography>{track.name}</Typography>

    <Rating
      value={ratings[track.id] || 0}
      onChange={(newValue) =>
        setRatings({
          ...ratings,
          [track.id]: newValue || 0
        })
      }
    />
  </Box>
))}
    </Container>
   </StyledHero>
    </>
  )
}

export default CreateReview
