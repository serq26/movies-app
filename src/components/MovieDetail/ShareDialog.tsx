import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";

type PropTypes = {
  open: boolean;
  movieLink: string;
  setOpen: (dialog: boolean) => void;
};

export default function ShareDialog(props: PropTypes) {
  const [email, setEmail] = useState<string>("");

  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
      <DialogTitle sx={{textAlign:"center"}}>Share Movie with E-mail</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{fontSize:"0.9rem"}}>
          Enter the e-mail address of the person you want to recommend this
          movie to.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)}>Cancel</Button>
        <Link to="#" onClick={(e) => {
          props.setOpen(false);
          window.location.href = `mailto:${email}?subject=Look at This Movie&body=Hi, I think you might like this movie too. I am sharing the link => ${props.movieLink}`;
          e.preventDefault();
        }}>
         <Button>Share</Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
}
