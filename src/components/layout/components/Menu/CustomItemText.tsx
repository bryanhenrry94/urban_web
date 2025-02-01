import { ListItemText, Typography } from "@mui/material";

interface ICustomItemText {
  text: string;
  isExpanded: boolean;
}

export const CustomItemText = ({ text, isExpanded }: ICustomItemText) => {
  return (
    <ListItemText
      primary={
        <Typography
          variant="body1"
          sx={{
            fontSize: "12px",
            display: isExpanded ? "block" : "none",
            // ml: 1,
          }}
        >
          {text}
        </Typography>
      }
    />
  );
};
