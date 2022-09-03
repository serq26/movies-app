import React, { useContext } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ThemeContext } from "./contexts/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";

export default function App() {
  const { mode } = useContext(ThemeContext);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:movieId" element={<MovieDetail />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
