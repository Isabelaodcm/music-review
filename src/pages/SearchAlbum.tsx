import { Box, Button, Container, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { searchAlbums } from "../services/spotify";
import { useNavigate } from "react-router-dom";

const StyledHero = styled("div")(({ theme }) => ({
backgroundColor: theme.palette.primary.main,
height: "100vh",
paddingTop: "50px",
}));

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection:"row",
  alignItems: "center",
  paddingTop: "7px",
  paddingLeft: "7px",
      "&:hover": {
      backgroundColor: "#E36888",
    },
}))

const SearchAlbum = () => {

const [query, setQuery] = useState("");
const [results, setResults] = useState<any[]>([]);

const [selectedAlbum, setSelectedAlbum] = useState<any>(null);

const selectAlbum = (album: any) => {
  setSelectedAlbum(album);
  setQuery("");
  setResults([]);
  console.log("album selecionado: ", album.name)
};

const handleSearch = async (value: string) => {
  setQuery(value);
  const data = await searchAlbums(value);
  setResults(data);
};

const navigate = useNavigate();

const goToReview = (album: any) => {
  navigate(`/createReview/${album.id}`, { state: album });
};

  return (
    <>
   <StyledHero>
    <Container maxWidth="lg">
  {!selectedAlbum ? (
    <>
      <TextField
        label="Buscar álbum"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{ 
          "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
    },
    "& .MuiInputLabel-root": { color: "white" },
    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
    "& .MuiInputBase-input": { color: "white" },
  }}
      />

      {results.map((album) => (
        <StyledBox key={album.id} onClick={() => selectAlbum(album)} gap={2}>
          <Box>
            <img src={album.images[0]?.url} width={80} />
          </Box>
          <Box>
            <Typography>{album.name}</Typography>
            <Typography>{album.artists.map((a: any) => a.name).join(", ")}</Typography>
          </Box>
        </StyledBox>
      ))}
    </>
  ) : (
    <Box display="flex" alignItems="center" justifyContent="center" height="60vh">

    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <img src={selectedAlbum.images[0]?.url} width={200} />
      <Typography variant="h5">{selectedAlbum.name}</Typography>
      <Typography>{selectedAlbum.artists.map((a: any) => a.name).join(", ")}</Typography>

      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={() => goToReview(selectedAlbum)}            
        sx={{
          backgroundColor: "#E36888",
          "&:hover": { backgroundColor: "#c9506f" },
        }}>
          Confirmar
        </Button>
                <Button variant="contained" onClick={() => setSelectedAlbum(null)}               sx={{
                  backgroundColor: "#E36888",
                  "&:hover": { backgroundColor: "#c9506f" },
                }}>
          Escolher novamente
        </Button>
      </Box>
                </Box>
    </Box>
  )}
    </Container>
   </StyledHero>
    </>
  )
}

export default SearchAlbum
