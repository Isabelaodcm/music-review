import { AppBar, Box, IconButton, MenuItem, styled, Toolbar, Typography, useMediaQuery } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import theme from "../theme"
import { Link } from "react-router-dom";


const NavBar = () => {

    const StyledTitleBar = styled(Toolbar)(({theme}) => ({
        display:"flex",
        justifyContent: "space-between",
        backgroundColor:theme.palette.secondary.main,
        paddingBottom: "20px",
        color:theme.palette.secondary.contrastText
    }));

    const StyledNavBar = styled(Toolbar)(({theme}) => ({
        // display:"flex",
        // justifyContent: "space-between",
        color:theme.palette.secondary.contrastText,
        backgroundColor:theme.palette.secondary.main
    }));

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
    <AppBar position="relative">

    <StyledTitleBar>
    <Typography variant="h3">MusicReview</Typography>
            <Box>
          <IconButton color="inherit">
            {/* < HomeIcon fontSize="large"/> */}
            <HomeIcon sx={{ fontSize: isMobile ? 20 : 32 }} />
          </IconButton>
          <IconButton color="inherit">
            <SearchIcon sx={{ fontSize: isMobile ? 20 : 32 }}/>
          </IconButton>
          <IconButton color="inherit">
            <AddIcon sx={{ fontSize: isMobile ? 20 : 32 }}/>
          </IconButton>
        </Box>
    </StyledTitleBar>
    {/* <StyledNavBar>

        <MenuItem>Álbuns Preferidos</MenuItem>
        <MenuItem>Artistas Preferidos</MenuItem>
        <MenuItem>Músicas Preferidas</MenuItem>
    </StyledNavBar> */}
    </AppBar>
    </>
  )
}

export default NavBar
