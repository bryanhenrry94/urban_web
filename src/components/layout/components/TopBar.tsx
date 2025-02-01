import { FunctionComponent, ReactNode } from "react";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { AppBar } from "@/components/common/AppBar";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  endNode?: ReactNode;
  startNode?: ReactNode;
  title?: string;
}

/**
 * Renders TopBar composition
 * @component TopBar
 */

const TopBar: FunctionComponent<Props> = ({
  endNode,
  startNode,
  title = "",
}) => {
  return (
    <AppBar>
      <Toolbar disableGutters sx={{ paddingX: 1 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          // onClick={handleDrawerOpen}
          edge="start"
          // sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>

        {startNode}

        <Typography
          variant="h6"
          sx={{
            marginX: 1,
            flexGrow: 1,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>

        {endNode}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
