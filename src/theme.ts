import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
    palette: {
        primary: {
            main: "#F2D77F"
        }
    }, 
    typography: {
        body1: {
            fontFamily:"Rock Salt", 
            fontWeight: 550,
        }
    }
})

theme = responsiveFontSizes(theme)
export default theme;