import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AccountMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if(Object.keys(user).length > 0){
      setUsername(user.email.substring(0,1).toUpperCase());
    }
  }, [user]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {Object.keys(user).length > 0 ? (<Avatar sx={{ width: 32, height: 32 }}>{username}</Avatar>) : <Avatar />}
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {Object.keys(user).length > 0 ? (
          [
            <MenuItem key={0}>{user.email}</MenuItem>,
            <MenuItem key={1} onClick={() => navigate("/profile")}>
              <ListItemIcon>
                <PermIdentityIcon fontSize="small" />
              </ListItemIcon> Profile
            </MenuItem>,
            <MenuItem key={2} onClick={() => logout()}>
              {" "}
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>,
          ]
        ) : (
          <MenuItem onClick={() => navigate("/signin")}>
            <Avatar /> Signin
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}
