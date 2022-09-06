import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useMovie } from "../../contexts/MovieContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { fetchCast } from "../../api";
import { Cast } from "../../types";

export default function DetailList() {
  const { movie, movieId } = useMovie();
  const [cast, setCast] = useState<Cast[]>([]);

  useEffect(() => {
    const getCast = async (): Promise<void> => {
      setCast(await fetchCast(movieId));
    };
    getCast();
  }, []);

  const titleSX = {
    color: "#f09d26",
    borderBottom: "1px solid rgba(255,255,255,0.5)",
    width: {xs: "100%", md: "50%"},
  };

  return (
    <List className="detail-list">
      <ListItem>
        <Typography variant="h5" sx={titleSX}>
          Details
        </Typography>
      </ListItem>
      <ListItem sx={{display:"block"}}>
        <Typography component="span" sx={{ mr: 1, fontWeight: "bold" }}>
          Categories:
        </Typography>
        {Object.keys(movie).length > 0 &&
          movie.genres.map((genre: any) => {
            return (
              <Typography key={genre.id} component="span">
                {genre.name},{" "}
              </Typography>
            );
          })}
      </ListItem>
      <ListItem>
        <Typography component="span" sx={{ mr: 1, fontWeight: "bold" }}>
          Release Date:
        </Typography>
        <Typography component="span" sx={{ mr: 1 }}>
          {movie.release_date}
        </Typography>
      </ListItem>
      <ListItem>
        <Typography component="span" sx={{ mr: 1, fontWeight: "bold" }}>
          Vote Average:
        </Typography>
        <Typography component="span" sx={{ mr: 1 }}>
          {movie.vote_average}
        </Typography>
      </ListItem>
      <ListItem sx={{ alignItems: "flex-start" }}>
        <Typography component="span" sx={{ mr: 1, fontWeight: "bold" }}>
          Cast:
        </Typography>
        <List>
          {cast.length > 0 &&
            cast.slice(0, 10).map((c) => {
              return <ListItem key={c.id}>{c.name}</ListItem>;
            })}
        </List>
      </ListItem>
    </List>
  );
}
