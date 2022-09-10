import React, { useEffect, useState, memo } from "react";
import Dialog from "@mui/material/Dialog";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { MovieTrailers } from "../../../types";
import { fetchTrailers } from "../../../api";

type PropTypes = {
  movieId: number;
  open: boolean;
  setOpen: (param: boolean) => void;
};

function Trailer(props: PropTypes) {
  const [trailer, setTrailer] = useState<MovieTrailers>({} as MovieTrailers);
  const { open, setOpen, movieId } = props;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getTrailer = async (): Promise<void> => {
      const trailers = await fetchTrailers(movieId);
      trailers.length > 0 &&
        setTrailer(trailers.find((trailer) => trailer.type === "Trailer"));
    };
    getTrailer();
  }, []);

  return (
    <Dialog maxWidth={false} open={open} onClose={handleClose}>
      <LiteYouTubeEmbed
        id={trailer.key}
        title={trailer.name}
        wrapperClass="yt-lite"
      />
    </Dialog>
  );
}

export default memo(Trailer);
