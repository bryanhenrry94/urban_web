"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { useAppStore } from "@/store";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemIcon,
} from "@mui/material";
import { MdLogout } from "react-icons/md";
import AvatarUser from "@/assets/images/avatar.png";
import { signOut, useSession } from "next-auth/react";

interface ProfileButtonProps {
  sidebarAnchor: "left" | "right";
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ sidebarAnchor }) => {
  const { data: session } = useSession();
  const [state] = useAppStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    signOut({ callbackUrl: "/auth/signin" }); // Cambia '/ruta-deseada' por la ruta a la que quieres redirigir
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: state.darkMode ? "#0e1b23" : "#eef2f6",
          borderRadius: "50px",
          padding: "5px 10px",
          marginLeft: "auto",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <Avatar
          sx={{
            marginLeft: sidebarAnchor === "right" ? 0 : "auto",
            marginRight: sidebarAnchor === "right" ? "auto" : 0,
          }}
          alt="User Avatar"
          src={session?.user?.image || AvatarUser.src}
        />
        <IconButton
          sx={{
            marginLeft: "10px",
          }}
          aria-label="settings"
        >
          <SettingsIcon />
        </IconButton>
      </div>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
          },
        }}
      >
        <Box sx={{ width: 350, padding: "15px" }}>
          <Typography variant="subtitle1" component="div">
            <strong>{session?.user?.name}</strong>
          </Typography>
          <Typography variant="subtitle2" component="div">
            {session?.user?.email}
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }} />
          <List>
            <ListItem onClick={handleSignOut}>
              <ListItemIcon sx={{ fontSize: "1.5rem" }}>
                <MdLogout />
              </ListItemIcon>
              <ListItemText primary="Salir" />
            </ListItem>
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default ProfileButton;
