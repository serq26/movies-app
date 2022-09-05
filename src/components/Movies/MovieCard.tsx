import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../types";
import StarIcon from "@mui/icons-material/Star";

type PropTypes = {
  movie: Movie;
};

const wrapperSx = {
  position: "relative",
  borderRadius: 4,
  overflow: "hidden",
  transition: "all .3s ease-in-out",
  "&:hover": {
    transform: "scale(.94)",
  },
  "&:hover > img": {
    opacity: ".8",
  },
  "&:hover > div": {
    background: "rgba(0,0,0,1)",
  },
};

const imageSx = {
  width: "100%",
  maxWidth: "100%",
  display: "block",
  margin: "0 auto",
};

const titleBoxSX = {
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  height: "20%",
  background: "rgba(0,0,0,0.75)",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const averageSX = {
  position: "absolute",
  top: "10px",
  right: 0,
  display: "flex",
  alignItems: "center",
  padding: "10px 20px 10px 5px",
  background: "#000",
  borderRadius: "12px 0 0 12px",
  "& > svg": {
    color: "#ffa726",
  },
  "& > span": {
    fontWeight: "bold",
    color: "#fff",
    marginLeft: "5px",
    marginTop: "3px"
  }
};

export default function MovieCard(props: PropTypes) {
  return (
    <Link to={`movie/${props.movie.id}`} title={props.movie.title}>
      <Box sx={wrapperSx}>
        <Box
          component="img"
          sx={imageSx}
          src={
            props.movie.poster_path !== null
              ? `https://image.tmdb.org/t/p/w400/${props.movie.poster_path}`
              : "/images/no-available-poster.jpg"
          }
          alt={props.movie.title}
        />
        <Box component="div" sx={titleBoxSX}>
          <Typography component="h5" color="white">
            {props.movie.title}
          </Typography>
        </Box>
        <Box sx={averageSX}>
          <StarIcon />
          <Typography component="span">{props.movie.vote_average}</Typography>
        </Box>
      </Box>
    </Link>
  );
}
