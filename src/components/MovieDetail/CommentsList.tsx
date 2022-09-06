import React, { useEffect, useState } from "react";
import { useMovie } from "../../contexts/MovieContext";
import { fetchComments } from "../../firebase";
import { Comments } from "../../types";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function CommentsList() {
  const [comments, setComments] = useState<Comments[]>([]);
  const { movieId } = useMovie();

  useEffect(() => {
    const getComments = async (): Promise<void> => {
      const result = await fetchComments(movieId);
      setComments(result);
    };

    getComments();
  }, [movieId, comments]);

  const commentBoxSX = {
    padding: "20px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(3px)",
    webkitBackdropFilter: "blur(3px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    margin: "16px 0",
    display: "block",
    width: {xs: "100%", md: "80%"}
  }

  const userSX = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#c5891d"
  }

  const commentSX = {
    display: "block",
    fontSize: "15px",
    paddingLeft: "30px"
  }

  return (
    <>
      {comments.length > 0 && (
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index} sx={commentBoxSX}>
              <Typography component="h6" sx={userSX}><AccountCircleIcon sx={{mr:1}} /> {comment.name}</Typography>
              <Typography component="p" sx={commentSX}>{comment.comment}</Typography>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
