import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchCategories, fetchMoviesByCategory } from "../../api";
import { MovieContextType, useMovies } from "../../contexts/MoviesContext";
import Typography from "@mui/material/Typography";
import { MovieCategory } from "../../types";

export default function CategorySlider() {
  const [categories, setCategories] = useState<MovieCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Number>();
  const { setMovies } = useMovies() as MovieContextType;

  useEffect(() => {
    const movieCategories = async (): Promise<void> => {
      setCategories(await fetchCategories());
    };
    movieCategories();
  }, []);

  const getMoviesByCategory = async (categoryId: number): Promise<void> => {
    setMovies(await fetchMoviesByCategory(categoryId));
    setSelectedCategory(categoryId);
  };

  var sliderSettings = {
    dots: false,
    infinite: false,
    speed: 1100,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...sliderSettings}>
      {categories.map((category, index) => (
        <div key={`${category.id}-${index}`}>
          <button
            className="category-box"
            style={{
              border: "1px solid #ccc",
              cursor: "pointer",
              borderRadius: 14,
              padding: 30,
              width: 200,
              display: "block",
              margin: "0 auto",
              transition: "all .3s ease-in-out",
              background: `${
                selectedCategory === category.id ? "#ffa726" : "transparent"
              }`,
            }}
            onClick={() => getMoviesByCategory(category.id)}
          >
            <Typography variant="h6" noWrap component="div" color="white">
              {category.name}
            </Typography>
          </button>
        </div>
      ))}
    </Slider>
  );
}
