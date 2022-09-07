import React, { useEffect, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { addFavorites, fetchFavorites, removeFavorites } from "../../../firebase";
import { ToastData } from "../../../types";
import { useAuth } from "../../../contexts/AuthContext";

type PropTypes = {
    movieId: number;
    alert: boolean;
    setToastData: ({}) => void;
    setAlert: (param:boolean) => void;
}

export default function FavoriteButton(props: PropTypes) {
  const [favorite, setFavorite] = useState<boolean>(false);
  const { movieId, setToastData, setAlert, alert } = props;
  const { user } = useAuth();

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
        setToastData({
          type: "warning",
          message: "This movie removed your favorites!",
        });
        await removeFavorites(movieId);
      } else {
        setFavorite(true);
        setToastData({
          type: "success",
          message: "This movie added your favorites!",
        });
        await addFavorites(movieId);
      }
    } else {
      setToastData({
        type: "error",
        message:
          "You should be logged in to add this movie to your favourites.",
      });
    }
    setAlert(!alert);
  };
  return (
    <Tooltip placement="right" title="Add Favorites" arrow>
      <IconButton aria-label="favorite" onClick={() => handleFavorite()}>
        {favorite ? (
          <StarIcon fontSize="large" color="warning" />
        ) : (
          <StarBorderIcon fontSize="large" />
        )}
      </IconButton>
    </Tooltip>
  );
}
