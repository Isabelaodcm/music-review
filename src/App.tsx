import NavBar from "./components/NavBar"
import Home from "./pages/Home/Home"

// reaproveitamento de estrutura - reactRouter
import { Outlet } from "react-router-dom"

const App = () => {

  return (
    <>
    <NavBar/>
    {/* <Home/> */}
    <Outlet/>
    </>
  )
}

export default App
