import { styled } from "@mui/material"
import theMountain from "../../../assets/images/the_mountain.png"
const Hero = () => {

    const StyledHero = styled("div")(() => ({
        backgroundColor: "#F2D77F"
    }))

  return (   
   <>
   <StyledHero>
        hero
        <img src={theMountain} />
   </StyledHero>
    

    </>
  )
}

export default Hero
