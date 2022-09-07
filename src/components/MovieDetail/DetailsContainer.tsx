import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { fetchTrailers } from "../../api";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Dialog from "@mui/material/Dialog";
import { useMovie } from "../../contexts/MovieContext";
import { addFavorites, fetchFavorites, removeFavorites } from "../../firebase";
import Snackbar from "@mui/material/Snackbar";
import ShareDialog from "./ShareDialog";
import { MovieTrailers, ToastData } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import DetailList from "./DetailsList";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { Toast } from "../Toast";
import { AlertColor } from "@mui/material";

export default function MovieDetail() {
  const [trailer, setTrailer] = useState<MovieTrailers>({} as MovieTrailers);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [toastData, setToastData] = useState<ToastData>({} as ToastData);
  const [shareDialog, setShareDialog] = useState<boolean>(false);
  const { movieId, setMovieId, movie } = useMovie();
  const { user } = useAuth();

  useEffect(() => {
    setMovieId(movieId);
  }, [movieId]);

  useEffect(() => {
    const getFavorites = async () => {
      if (user !== null) {
        const result = await fetchFavorites(user.uid);
        result.map((fav): void => {
          if (Number(fav) === movieId) {
            setFavorite(true);
          }
        });
      }
    };
    getFavorites();
  }, [user]);

  const handleFavorite = async () => {
    if (Object.keys(user).length > 0) {
      if (favorite) {
        setFavorite(false);
        setToastData({type: "warning", message:"This movie removed your favorites!"})
        await removeFavorites(movieId);
      } else {
        setFavorite(true);
        setToastData({type: "success", message:"This movie added your favorites!"})
        await addFavorites(movieId);
      }
    } else {
      setToastData({type: "error", message:"You should be logged in to add this movie to your favourites."})
    }
    setAlert(!alert);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTrailer = async (movieId: number): Promise<void> => {
    const trailers = await fetchTrailers(movieId);
    setTrailer(trailers.find((trailer) => trailer.name === "Official Trailer"));
    handleClickOpen();
  };

  const overlaySX = {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    backgroundImage:
      "radial-gradient(farthest-side at 73% 21%,transparent,#000000)",
  };

  const bgSX = {
    opacity: ".08",
    width: "100%",
  };

  const bgWrapperSX = {
    width: "100%",
    position: "fixed",
    zIndex: 0,
    left: 0,
    top: 0,
  };

  const contentSX = {
    position: "relative",
    alignSelf: "center",
    padding: { xs: "50px 0", md: "50px" },
    zIndex: 9,
  };

  const titleSX = {
    color: "#ffa726",
    fontWeight: "bold",
  };

  const posterSX = {
    maxWidth: "100%",
    borderRadius: "10px",
    position: "sticky",
    top: "4%",
    display: "block",
    margin: "0 auto",
  };

  const descriptionSX = {
    color: "#fff",
    marginY: 2,
    width: { xs: "100%", md: "60%" },
  };

  const trailerBtnSX = {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    borderColor: "#fff",
    py: 1,
    px: 4,
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(3px)",
    webkitBackdropFilter: "blur(3px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    margin: { xs: "10px auto", md: "16px 0" },
  };

  return (
    <Container maxWidth={false} className="movie-detail">
      <ShareDialog
        open={shareDialog}
        setOpen={setShareDialog}
        movieLink={`${window.location.hostname}/movie/${movieId}`}
      />
      {/* <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {!favorite ? (
          <Toast
            onClose={() => setAlert(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            This movie removed your favorites!
          </Toast>
        ) : (
          <Toast
            onClose={() => setAlert(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            This movie added your favorites!
          </Toast>
        )}
      </Snackbar> */}
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
                <Tooltip placement="right" title="Add Favorites" arrow>
                  <IconButton
                    aria-label="favorite"
                    onClick={() => handleFavorite()}
                  >
                    {favorite ? (
                      <StarIcon fontSize="large" color="warning" />
                    ) : (
                      <StarBorderIcon fontSize="large" />
                    )}
                  </IconButton>
                </Tooltip>
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
                onClick={() => getTrailer(movie.id)}
              >
                <SmartDisplayIcon sx={{ marginRight: "8px" }} />{" "}
                <Typography component="span">Watch Trailer</Typography>
              </Button>
              <Box height={20} />
              <DetailList />
            </Grid>
          </Grid>

          {Object.keys(trailer).length > 0 && (
            <Dialog maxWidth={false} open={open} onClose={handleClose}>
              <LiteYouTubeEmbed
                id={trailer.key}
                title={trailer.name}
                wrapperClass="yt-lite"
              />
            </Dialog>
          )}
          <Box sx={{ height: 50 }} />
          <CommentForm />
          <CommentsList />
        </Box>
      </Container>
    </Container>
  );
}
