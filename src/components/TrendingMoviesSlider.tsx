import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { fetchTrendingMovies, Movie } from "../api";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useNavigate } from "react-router-dom";

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
    speed: 2300,
    fade: true,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...sliderSettings}>
      {trendMovies.slice(0, 5).map(movie => 
        <Box key={movie.id} className="image-slider-item">
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            sx={{
              height: { xs: 300, md: 650 },
              objectFit: "cover",
              maxWidth: "100%",
              width: "100%",
            }}
          />
          <Box
            component="div"
            sx={{
              position: "absolute",
              left: "15%",
              bottom: "25%",
              width: "40%",
            }}
          >
            <Typography sx={{ fontSize: "32px" }}>{movie.title}</Typography>
            <Typography>{movie.overview}</Typography>
            <Button color="warning" variant="contained" endIcon={<ArrowForwardIosIcon />} sx={{margin:"20px 0",fontWeight:"bold"}}>
              <Link to={`/movie/${movie.id}`}>Details</Link>
            </Button>
          </Box>
        </Box>
      )}
    </Slider>
  );
}
