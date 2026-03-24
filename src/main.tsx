import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import ReviewDetails from "./pages/ReviewDetails/ReviewDetails.tsx";
import NavBar from "./components/NavBar.tsx";

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element: <Home/>
//   },
//   {
//     path: "reviewDetails",
//     element: <ReviewDetails/>
//   }
// ])

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //vai conter um array de objetos que serao as paginas
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/reviewDetails/:id", //rotas aninhadas - identificador unico
        element: <ReviewDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      {/* <App /> */}
      <CssBaseline />
    </ThemeProvider>
  </StrictMode>,
);
