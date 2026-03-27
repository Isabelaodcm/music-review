import { useParams } from "react-router-dom"; //usado para extrair informacoes da url
import { albums } from "../../data/albums";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { reviews } from "../../data/reviews";
import { useRef, useState } from "react";

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

const NotesBox = styled(Box)(() => ({
  // width: "100%",
  borderRadius: "7px",
  backgroundColor: "#E36888",
  minHeight: "50px",
  padding: "10px",
}));

const ReviewDetails = () => {
  const { id } = useParams();

  const album = albums.find((a) => a.id === id);
  const review = reviews.find((r) => r.albumId === id);

  const originalNotes = useRef(review?.notes || "");
  const [notes, setNotes] = useState(review?.notes || "");
  // console.log("nome do album: ", album?.nome);

  // const [rating, setRating] = useState<number | null>(mockReview.nota);

  // const [formData, setFormData] = useState({
  //   notes: review?.notes || "",
  // });

  const updateReview = () => {
    const updatedReview = {
      notes,
      // nota
    };
    console.log("dados salvos: ", updatedReview);
  };

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
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Typography variant="h2" color="primary.contrastText">
                {" "}
                {album?.nome}
              </Typography>
              <Typography fontSize={23} color="primary.contrastText">
                {album?.artista} - ano - musicas
              </Typography>
            </Box>
            {/* </Grid> */}
            {/* </Grid> */}
          </Box>
          <Box>musicas </Box>

          <NotesBox>
            {/* label="Observações" */}
            <TextField
              fullWidth
              placeholder="notas..."
              value={notes || ""}
              multiline
              onChange={(e) => setNotes(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" },
                },
              }}
            />
            {}
          </NotesBox>

{notes != originalNotes.current && (

  <Box
  sx={{ display: "flex", justifyContent: "end", paddingTop: "15px" }}
  >
            <Button
              variant="contained"
              onClick={updateReview}
              sx={{
                backgroundColor: "#E36888",
                "&:hover": { backgroundColor: "#c9506f" },
              }}
              >
              Salvar
            </Button>
          </Box>
            )}
        </Container>
      </StyledDetails>
    </>
  );
};

export default ReviewDetails;
