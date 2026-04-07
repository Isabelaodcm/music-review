import { useNavigate, useParams } from "react-router-dom"; //usado para extrair informacoes da url
import {
  Box,
  Button,
  Container,
  Rating,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getAlbumDetails, getAlbumTracks } from "../../services/spotify";

const StyledHero = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "100%",
  paddingTop: "50px",
  paddingBottom: "40px",
}));

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

// const NotesBox = styled(Box)(() => ({
//   // width: "100%",
//   borderRadius: "7px",
//   backgroundColor: "#E36888",
//   minHeight: "50px",
//   padding: "10px",
// }));

const NotesBox = styled(Box)(() => ({
  // width: "100%",
  borderRadius: "7px",
  // backgroundColor: "#E36888",
  backgroundColor: "#ffffff18",
  minHeight: "50px",
  padding: "10px",
  marginTop: "30px",
}));

const ReviewDetails = () => {
  const { id } = useParams();
  
  const [album, setAlbum] = useState<any>(null);
  const [review, setReview] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const originalReview = useRef<{
    notes: string;
    ratings: { [key: string]: number };
  }>({
    notes: "",
    ratings: {},
  });
  
  useEffect(() => {
      const stored = JSON.parse(localStorage.getItem("reviews") || "[]");

      const review = stored.find((r: any) => r.albumId === id);
  
        if (review) {
    setReview(review);
    setRatings(review.ratings || {});
    setNotes(review.notes || "");

    originalReview.current = {
      notes: review.notes || "",
      ratings: review.ratings || {},
    };
  }
  
  }, [id]);

    useEffect(() => {
  const fetchData = async () => {
    if (!id) return

      const albumData = await getAlbumDetails(id);
      const data = await getAlbumTracks(id);
          
      setAlbum(albumData);
      setTracks(data);
    };

    fetchData();
  
}, [id]);

  const hasChanges = () => {
    const notesChanged = notes !== originalReview.current.notes;

    const ratingsChanged =
      JSON.stringify(ratings) !==
      JSON.stringify(originalReview.current.ratings);

      return notesChanged || ratingsChanged;
  };

const updateReview = () => {
  if (!id) return;

  const existing = JSON.parse(localStorage.getItem("reviews") || "[]");

  const values = Object.values(ratings).filter((v) => v > 0);
  const average =
    values.length > 0
      ? Number(
          (values.reduce((acc, val) => acc + val, 0) / values.length).toFixed(1)
        )
      : 0;

  const updatedReview = {
    albumId: id,
    notes,
    ratings,
    average,
  };

  const filtered = existing.filter((r: any) => r.albumId !== id);
  const updated = [...filtered, updatedReview];

  localStorage.setItem("reviews", JSON.stringify(updated));

  // console.log("REVIEW ATUALIZADA:", updatedReview);

  originalReview.current = {
    notes,
    ratings,
  };

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
                {hasChanges() && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    paddingTop: "15px",
                  }}
                >

                    <Button
                  onClick={updateReview} 
                    variant="contained"
                    sx={{
                      backgroundColor: "#E36888",
                      "&:hover": { backgroundColor: "#c9506f" },
                    }}
                    >
                    Editar Review
                  </Button>
                </Box>
                  )}
    
              </Box>
            </Container>
          </StyledHero>
    </>
  );
};

export default ReviewDetails;
