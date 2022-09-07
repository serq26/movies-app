import React from "react";
import { useParams } from "react-router-dom";
import DetailsContainer from "../components/MovieDetail/DetailContainer/DetailsContainer";
import { MovieProvider } from "../contexts/MovieContext";

export default function MovieDetail() {
  const { movieId } = useParams();
  return (
   <MovieProvider movieId={Number(movieId)}>
      <DetailsContainer />
   </MovieProvider>
  );
}
