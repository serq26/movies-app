import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { lazy, Suspense, useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import { useMovie } from "../../../contexts/MovieContext";
import Snackbar from "@mui/material/Snackbar";
import { ToastData } from "../../../types";
import DetailList from "../DetailsList";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { Toast } from "../../Toast";
import Loading from "../../Loading";
import {
  bgSX,
  bgWrapperSX,
  contentSX,
  descriptionSX,
  overlaySX,
  posterSX,
  titleSX,
  trailerBtnSX,
} from "./detail.style";
import FavoriteButton from "./FavoriteButton";

const CommentForm = lazy(() => import("../CommentForm"));
const CommentsList = lazy(() => import("../CommentsList"));
const ShareDialog = lazy(() => import("../ShareDialog"));
const Trailer = lazy(() => import("./Trailer"));

export default function MovieDetail() {
  const [toastData, setToastData] = useState<ToastData>({} as ToastData);
  const [alert, setAlert] = useState<boolean>(false);
  const [shareDialog, setShareDialog] = useState<boolean>(false);
  const [openTrailer, setOpenTrailer] = useState<boolean>(false);
  const { movieId, setMovieId, movie } = useMovie();

  useEffect(() => {
    setMovieId(movieId);
  }, [movieId]);

  return (
    <Container maxWidth={false} className="movie-detail">
      <Suspense fallback={<Loading />}>
        <ShareDialog
          open={shareDialog}
          setOpen={setShareDialog}
          movieLink={`${window.location.hostname}/movie/${movieId}`}
        />
      </Suspense>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Toast
          onClose={() => setAlert(false)}
          severity={toastData.type}
          sx={{ width: "100%" }}
        >
          {toastData.message}
        </Toast>
      </Snackbar>
      <Box sx={{ position: "absolute" }}>
        <Box component="div" className="overlay" sx={overlaySX} />
        <Box component="div" sx={bgWrapperSX}>
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w1280/${movie["backdrop_path"]}`}
            alt={movie.title}
            sx={bgSX}
          />
        </Box>
      </Box>
      <Container maxWidth={false}>
        <Box sx={contentSX}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box
                component="img"
                sx={posterSX}
                src={
                  movie.poster_path !== null
                    ? `https://image.tmdb.org/t/p/w400/${movie.poster_path}`
                    : "/images/no-available-poster.jpg"
                }
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack direction="row">
                <Typography variant="h3" sx={titleSX}>
                  {movie.title}
                </Typography>
                <FavoriteButton
                  movieId={movieId}
                  setToastData={setToastData}
                  setAlert={setAlert}
                  alert={alert}
                />
                <Tooltip placement="right" title="Share with E-mail" arrow>
                  <IconButton onClick={() => setShareDialog(true)}>
                    <ShareIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography component="p" sx={descriptionSX}>
                {movie.overview}
              </Typography>
              <Button
                variant="outlined"
                sx={trailerBtnSX}
                onClick={() => setOpenTrailer(true)}
              >
                <SmartDisplayIcon sx={{ marginRight: "8px" }} />{" "}
                <Typography component="span">Watch Trailer</Typography>
              </Button>
              <Box height={20} />
              <DetailList />
            </Grid>
          </Grid>
          <Suspense fallback={<Loading />}>
            <Trailer movieId={movieId} open={openTrailer} setOpen={setOpenTrailer} />
          </Suspense>
          <Box sx={{ height: 50 }} />
          <Suspense fallback={<Loading />}>
            <CommentForm />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <CommentsList />
          </Suspense>
        </Box>
      </Container>
    </Container>
  );
}
