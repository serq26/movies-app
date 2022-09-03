import React, { useContext } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ThemeContext } from "./contexts/ThemeContext";

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
      <Header />
      <Home />
    </ThemeProvider>
  );
}
