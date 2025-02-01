"use client";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { List as ListMui } from "@mui/material";

// Estilo personalizado para ListItem
const CustomListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Estilo personalizado para ListItemButton
const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

import React from "react";

interface MyListComponentProps {
  items: string[];
}

const MyListComponent: React.FC<MyListComponentProps> = ({ items }) => (
  <ListMui>
    {items.map((text, index) => (
      <CustomListItem key={text} disablePadding>
        <CustomListItemButton>
          <CustomListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </CustomListItemIcon>
          <CustomListItemText primary={text} />
        </CustomListItemButton>
      </CustomListItem>
    ))}
  </ListMui>
);

export default MyListComponent;
