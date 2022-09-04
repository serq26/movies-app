import {
  Backdrop,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovie, fetchTrailers, Movie, MovieTrailers } from "../api";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import CircularProgress from "@mui/material/CircularProgress";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DetailsTab from "../components/DetailsTab";

export default function MovieDetail() {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [trailer, setTrailer] = useState<MovieTrailers>({} as MovieTrailers);
  const [favorite, setFavorite] = useState<boolean>(false);
  // const [open, setOpen] = useState<boolean>(false);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovie = async (): Promise<void> => {
      setMovie(await fetchMovie(Number(movieId)));
    };
    getMovie();
  }, [movieId]);

  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleToggle = () => {
  //   setOpen(!open);
  // };

  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTrailer = async (movieId: number): Promise<void> => {
    const trailers = await fetchTrailers(movieId);
    setTrailer(trailers.find((trailer) => trailer.name === "Official Trailer"));
    // handleToggle();
    handleClickOpen();
  };

  return (
    <Container maxWidth={false} className="movie-detail">
      <>
        <Box
          component="div"
          className="overlay"
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 2,
            backgroundImage:
              "radial-gradient(farthest-side at 73% 21%,transparent,#1a1d29)",
          }}
        />
        <Box
          component="div"
          sx={{ width: "100%", position: "fixed", zIndex: 0 }}
        >
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w1280/${movie["backdrop_path"]}`}
            alt={movie.title}
            sx={{ opacity: ".5", width: "100%" }}
          />
        </Box>
      </>
      <Container maxWidth={false}>
        <Box
          sx={{
            position: "absolute",
            left: "5%",
            bottom: "10%",
            width: "50%",
            zIndex: 9,
          }}
        >
          <Stack direction="row">
            <Typography variant="h3" sx={{ color: "#fff", fontWeight: "bold" }}>
              {movie.title}
            </Typography>
            <Tooltip placement="right" title="Add Favorites" arrow>
              <IconButton
                aria-label="favorite"
                onClick={() => setFavorite(!favorite)}
              >
                {favorite ? (
                  <StarIcon fontSize="large" color="warning" />
                ) : (
                  <StarBorderIcon fontSize="large" />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography component="p" sx={{ color: "#fff", marginY: 2 }}>
            {movie.overview}
          </Typography>
          <Button
            variant="outlined"
            sx={{ color: "#fff", borderColor: "#fff", py: 1, px: 4 }}
            onClick={() => getTrailer(movie.id)}
          >
            Watch Trailer
          </Button>
          {Object.keys(trailer).length > 0 && (
            <Dialog
              maxWidth={false}
              open={open}
              onClose={handleClose}
            >
              <LiteYouTubeEmbed id={trailer.key} title={trailer.name} wrapperClass="yt-lite"/>
            </Dialog>
          )}
          <Box sx={{height:50}} />
          <DetailsTab />
        </Box>
      </Container>
    </Container>
  );
}
