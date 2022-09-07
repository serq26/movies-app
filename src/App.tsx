import React, { Suspense, lazy } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import MovieDetail from "./pages/MovieDetail";
// import Search from "./pages/Search";
// import SignIn from "./pages/Signin";
// import Profile from "./pages/Profile";
import { useAuth } from "./contexts/AuthContext";

const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const Search = lazy(() => import("./pages/Search"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Profile = lazy(() => import("./pages/Profile"));

export default function App() {
  const { user } = useAuth();

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
          <Route
            path="/movie/:movieId"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <MovieDetail />
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Search />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              Object.keys(user).length === 0 ? (
                <Navigate to="/" />
              ) : (
                <Suspense fallback={<p>Loading...</p>}>
                  <Profile />
                </Suspense>
              )
            }
          />
          <Route
            path="/signin"
            element={
              Object.keys(user).length > 0 ? (
                <Navigate to="/" />
              ) : (
                <Suspense fallback={<p>Loading...</p>}>
                  <SignIn />
                </Suspense>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
