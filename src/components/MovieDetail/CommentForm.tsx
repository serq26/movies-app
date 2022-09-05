import React, { useState, FormEvent, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addComment } from "../../firebase";
import { useMovie } from "../../contexts/MovieContext";
import { useAuth } from "../../contexts/AuthContext";

export default function CommentForm() {
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const { movieId } = useMovie();
  const { user } = useAuth();

  useEffect(() => {
    setName(user.email);
    console.log(user)
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await addComment(name, comment, movieId);
      console.log("yorum eklendi");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <br />
      <br />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        color="success"
        sx={{ color: "#fff", display: "block", margin: "0 auto" }}
      >
        Send
      </Button>
    </form>
  );
}
