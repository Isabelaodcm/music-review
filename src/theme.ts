import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
    palette: {
        primary: {

            // main: "#F2D77F"
            main: "#667D43"
        },

        secondary:{
            main: "#455D43"
            // main: "#F08C21" 
        }
    }, 
    typography: {
        body1: {
            fontFamily:"Rock Salt", 
            fontWeight: 550,
        },

        h3: {
            fontFamily:"Beth Ellen", 
        }
    
    }
})

theme = responsiveFontSizes(theme)
export default theme;