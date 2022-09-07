import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { fetchTrendingMovies } from "../../api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, useNavigate } from "react-router-dom";
import { Movie } from "../../types";

export default function TrendingMoviesSlider() {
  const [trendMovies, setTrendMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const trendMovies = async (): Promise<void> => {
      setTrendMovies(await fetchTrendingMovies());
    };
    trendMovies();
  }, []);

  var sliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    fade: true,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const slideImageSX = {
    height: { xs: 500, md: 650 },
    objectFit: "cover",
    maxWidth: "100%",
    width: "100%",
    opacity: "0.5",
  };

  const slideTextSX = {
    position: "absolute",
    left: { xs: "10%", md: "15%" },
    bottom: "25%",
    width: { xs: "80%", md: "40%" },
  };

  const descriptionSX = {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const slideButtonSX = {
    margin: "20px 0",
    fontWeight: "bold",
    "& > a": {
      color: "rgba(0, 0, 0, 0.87)",
    },
  };

  return (
    <Slider {...sliderSettings}>
      {trendMovies.slice(0, 5).map((movie) => (
        <Box key={movie.id} className="image-slider-item">
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            sx={slideImageSX}
          />
          <Box component="div" sx={slideTextSX}>
            <Typography sx={{ fontSize: "32px" }}>{movie.title}</Typography>
            <Typography sx={descriptionSX}>{movie.overview}</Typography>
            <Button
              color="warning"
              variant="contained"
              endIcon={<ArrowForwardIosIcon />}
              sx={slideButtonSX}
            >
              <Link to={`/movie/${movie.id}`}>Details</Link>
            </Button>
          </Box>
        </Box>
      ))}
    </Slider>
  );
}
