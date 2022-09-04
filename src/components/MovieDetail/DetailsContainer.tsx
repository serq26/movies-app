import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { fetchTrailers, MovieTrailers } from "../../api";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Dialog from "@mui/material/Dialog";
import { useMovie } from "../../contexts/MovieContext";
import DetailsTab from "./DetailsTab";

export default function MovieDetail() {
  const [trailer, setTrailer] = useState<MovieTrailers>({} as MovieTrailers);
  const [favorite, setFavorite] = useState<boolean>(false);
  const { movieId, setMovieId, movie } = useMovie();

  useEffect(() => {
    setMovieId(Number(movieId));
  }, [movieId]);

  const [open, setOpen] = useState<boolean>(false);
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

  return (
    <Container maxWidth={false} className="movie-detail">
      <Box sx={{position: "relative"}}>
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
      </Box>
      <Container maxWidth={false}>
        <Box
          sx={{
            position: "relative",
            alignSelf: "center",
            padding: "60vh 0 0 90px",
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
            <Tooltip placement="right" title="Share with E-mail" arrow>
              <IconButton>
                <ShareIcon fontSize="large" />
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
            <Dialog maxWidth={false} open={open} onClose={handleClose}>
              <LiteYouTubeEmbed
                id={trailer.key}
                title={trailer.name}
                wrapperClass="yt-lite"
              />
            </Dialog>
          )}
          <Box sx={{ height: 50 }} />
          <DetailsTab movie={movie} />
        </Box>
      </Container>
    </Container>
  );
}
