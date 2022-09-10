import React, { useState, FormEvent, useEffect, memo } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { addComment } from "../../firebase";
import { useMovie } from "../../contexts/MovieContext";
import { useAuth } from "../../contexts/AuthContext";
import { Toast } from "../Toast";
import { useComments } from "../../contexts/CommentContext";
import { Comments } from "../../types";

function CommentForm() {
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<Comments>({} as Comments);
  const { comments, setComments } = useComments();
  const [alert, setAlert] = useState<boolean>(false);
  const { movieId } = useMovie();
  const { user } = useAuth();

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setName(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      // await addComment(name, comment.comment, movieId, user.uid);
      await addComment(comment,user.uid);
      setComments([...comments, comment]);
      setName("");
      setComment({name,comment: "",movieId});
      setAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  const accordionSX = {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(3px)",
    webkitBackdropFilter: "blur(3px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  return (
    <>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Toast
          onClose={() => setAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Added your comment!
        </Toast>
      </Snackbar>

      <Accordion sx={accordionSX}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Make Your Comment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component="form" onSubmit={handleSubmit}>
            {Object.keys(user).length === 0 && (
              <TextField
                fullWidth
                label="Name Surname"
                variant="outlined"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
            )}
            <TextField
              fullWidth
              label="Comment"
              multiline
              rows={4}
              required
              value={comment.comment}
              onChange={(e) =>
                setComment({
                  name,
                  comment: e.target.value,
                  movieId                  
                })
              }
            />
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              size="medium"
              color="success"
              sx={{
                color: "#fff",
                display: "block",
                margin: "0 auto",
                background: "#f09d26",
              }}
            >
              Send
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default memo(CommentForm);
