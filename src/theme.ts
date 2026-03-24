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
            fontFamily:"Shantell Sans", 
        // fontFamily:"Caveat, cursive", 
        // fontFamily:"Rock Salt", 

        body1: {
            // fontFamily:"Shadows Into Light Two", 
            fontFamily:"Shantell Sans", 
        // fontFamily:"Rock Salt", 
            fontWeight: 500,
            // fontSize: 21
        },

        h2: {
            fontWeight: 500,
        }, 

        h3: {
            fontFamily:"Beth Ellen", 
            fontSize: 50
        }
    
    }
})

theme = responsiveFontSizes(theme)
export default theme;