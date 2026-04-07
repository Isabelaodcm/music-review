import {
  Box,
  Button,
  Container,
  Rating,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAlbumDetails, getAlbumTracks } from "../services/spotify";
import { useNavigate, useParams } from "react-router-dom";

const StyledHero = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "100%",
  paddingTop: "50px",
  paddingBottom: "40px",
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
    width: 220,
  },
}));

const NotesBox = styled(Box)(() => ({
  // width: "100%",
  borderRadius: "7px",
  // backgroundColor: "#E36888",
  backgroundColor: "#ffffff18",
  minHeight: "50px",
  padding: "10px",
  marginTop: "30px",
}));

const calcAverage = (ratings: {[key: string]: number}) => {
  const values = Object.values(ratings);

  if  (values.length === 0) return 0;

  const sum = values.reduce((acc, val) => acc + val, 0);

  return Number((sum/values.length).toFixed(1));
}

const CreateReview = () => {
  const { albumId } = useParams();
  const [tracks, setTracks] = useState<any[]>([]);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [album, setAlbum] = useState<any>(null);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

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

  const handleSave = () => {
    if (!albumId) return;

    const average = calcAverage(ratings);
    
    const payload = {
      albumId,
      notes,
      ratings,
      average
    };
  const existing = JSON.parse(localStorage.getItem("reviews") || "[]");
  const filtered = existing.filter((r: any) => r.albumId !== albumId);

  const updated = [...filtered, payload];

  localStorage.setItem("reviews", JSON.stringify(updated));

  console.log("SALVO COM SUCESSO:", updated);
  navigate("/");

  };
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
                  {new Date(album.release_date).getFullYear()} •{" "}
                  {album.total_tracks} músicas
                </Typography>
              </Box>
              {/* </Grid> */}
              {/* </Grid> */}
            </Box>
          )}
          <Box pt={3}>
            {tracks.map((track) => (
              // gap={2}

              <Box
                key={track.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
                sx={{
                  // backgroundColor: "#ffffff10",
                  borderRadius: "5px",
                  "&:hover": { backgroundColor: "#E36888" },
                }}
              >
                <Typography>
                  {track.track_number}. {track.name}
                </Typography>

                <Rating
                  value={ratings[track.id] || 0}
                  onChange={(event, newValue) =>
                    setRatings({
                      ...ratings,
                      [track.id]: newValue || 0,
                    })
                  }
                />
              </Box>
            ))}
            <NotesBox>
              <TextField
                fullWidth
                placeholder="Comentário geral..."
                value={notes || ""}
                multiline
                rows={4}
                onChange={(e) => setNotes(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { border: "none" },
                  },
                }}
              />
              {}
            </NotesBox>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                paddingTop: "15px",
              }}
            >
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  backgroundColor: "#E36888",
                  "&:hover": { backgroundColor: "#c9506f" },
                }}
              >
                Salvar Review
              </Button>
            </Box>

          </Box>
        </Container>
      </StyledHero>
    </>
  );
};

export default CreateReview;
