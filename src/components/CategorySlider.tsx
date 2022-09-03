import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { fetchCategories, fetchMoviesByCategory, MovieCategory } from "../api";
import { MovieContextType, useMovies } from "../contexts/MoviesContext";
import { Typography } from "@mui/material";

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
    infinite: true,
    speed: 1100,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <Slider {...sliderSettings}>
      {categories.map((category) => (
        <li key={category.id}>
          <button
            style={{
              border: "1px solid #ccc",
              borderRadius: 14,
              padding: 30,
              width: 200,
              display: "block",
              margin: "0 auto",
              background: `${
                selectedCategory === category.id ? "red" : "transparent"
              }`,
            }}
            onClick={() => getMoviesByCategory(category.id)}
          >
            <Typography variant="h6" noWrap component="div" color="white">
              {category.name} / {category.id}
            </Typography>
          </button>
        </li>
      ))}
    </Slider>
  );
}
