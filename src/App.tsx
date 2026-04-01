import NavBar from "./components/NavBar"

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
