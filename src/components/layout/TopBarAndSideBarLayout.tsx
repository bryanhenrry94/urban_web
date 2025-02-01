"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar"; // Import Avatar component
import { FunctionComponent, useEffect, useState } from "react";
import { Drawer as MuiDrawer, StackProps } from "@mui/material";
import { ErrorBoundary } from "@/components/common";
import { useAppStore } from "@/store";
import { LinkToPage } from "@/utils";
import { useIsMobile } from "@/hooks";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { DRAWER_WIDTH_COLLAPSED, DRAWER_WIDTH_EXPANDED } from "./config";
import StyledIconButton from "@/components/common/StyledIconButton";
import NestedMenu from "./MenuList";
import FloatingSettingsButton from "@/components/common/FloatingSettingsButton";
import SettingsDrawer from "@/components/common/SettingsDrawe";
import Image from "next/image";
import LogoSvg from "@/assets/images/UrbanoAcceso.svg";
import ProfileButton from "./components/ProfileButton";

interface Props extends StackProps {
  // sidebarItems: Array<LinkToPage>;
  title: string;
  variant:
    | "sidebarAlwaysTemporary"
    | "sidebarPersistentOnDesktop"
    | "sidebarAlwaysPersistent";
}

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: DRAWER_WIDTH_COLLAPSED,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: DRAWER_WIDTH_COLLAPSED,
    boxSizing: "border-box",
    transition: "width 0.3s ease",
    zIndex: theme.zIndex.drawer - 1,
    border: "none",
    backgroundColor: theme.palette.background.default,
  },
}));

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "none",
  backgroundImage: "none",
  order: 0,
  backgroundColor: theme.palette.background.default,
}));

const TopBarAndSideBarLayout: FunctionComponent<Props> = ({ children }) => {
  const [state] = useAppStore();
  const onMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!onMobile);
  const [openSettingDrawer, setOpenSettingDrawer] = useState(!onMobile);
  const [sidebarExpanded, setSidebarExpanded] = useState(state.SidebarExpanded);
  const [sidebarAnchor, setSidebarAnchor] = useState<"left" | "right">("right");

  const toggleSidebar = () => {
    if (onMobile) {
      setSidebarExpanded(true);
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  const toggleDrawer = () => {
    setOpenSettingDrawer(false);
  };

  const handleSettingsClick = () => {
    setOpenSettingDrawer(true);
  };

  useEffect(() => {
    setSidebarExpanded(state.SidebarExpanded);
    setSidebarAnchor(state.TRLMode ? "right" : "left");
  }, [state.SidebarExpanded, onMobile, state.TRLMode]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar position="fixed">
        <Toolbar
          sx={{
            flexDirection: sidebarAnchor === "right" ? "row-reverse" : "row",
          }}
        >
          <Box
            sx={{
              width: "270px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: sidebarAnchor === "right" ? "row-reverse" : "row",
            }}
          >
            {!onMobile && <LogoApp />}
            <StyledIconButton
              aria-label="toggle drawer"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </StyledIconButton>
          </Box>

          <ProfileButton sidebarAnchor={sidebarAnchor} />
        </Toolbar>
      </CustomAppBar>

      <FloatingSettingsButton
        TRLMode={state.TRLMode}
        onClick={handleSettingsClick}
      />

      <SettingsDrawer
        isOpen={openSettingDrawer}
        TRLMode={state.TRLMode}
        toggleDrawer={toggleDrawer}
      />

      <Drawer
        variant={onMobile ? "temporary" : "persistent"}
        open={onMobile ? sidebarOpen : true}
        onClose={onMobile ? toggleSidebar : undefined}
        anchor={sidebarAnchor}
        sx={{
          order: sidebarAnchor === "right" ? 2 : 1,
          zIndex: onMobile ? 1300 : "auto",
          width:
            sidebarExpanded && !onMobile
              ? DRAWER_WIDTH_EXPANDED
              : DRAWER_WIDTH_COLLAPSED,
          [`& .MuiDrawer-paper`]: {
            width: sidebarExpanded
              ? DRAWER_WIDTH_EXPANDED
              : DRAWER_WIDTH_COLLAPSED,
            zIndex: onMobile ? 1300 : "auto",
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Toolbar>{onMobile && <LogoApp />}</Toolbar>

        <NestedMenu isExpanded={sidebarExpanded} />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 1,
          pr: sidebarAnchor === "left" || onMobile ? 3 : 0,
          pl: sidebarAnchor === "right" || onMobile ? 3 : 0,
          transition: "margin 0.3s ease, width 0.3s ease",
          order: sidebarAnchor === "right" ? 1 : 2,
        }}
      >
        <Toolbar />
        <ErrorBoundary name="Content">
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              backgroundColor: state.darkMode ? "#0e1b23" : "#eef2f6",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              minHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              paddingLeft: state.ThemeFullWidth ? "auto" : "150px",
              paddingRight: state.ThemeFullWidth ? "auto" : "150px",
            }}
          >
            {children}
          </Box>
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

const LogoApp = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: 30,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 64,
          width: 40,
          overflow: "hidden",
        }}
      >
        <Image
          src={LogoSvg}
          alt="Logo"
          width={125}
          height={125}
          style={{
            display: "block",
            margin: 0,
            padding: 0,
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </Box>

      <Typography
        sx={(theme) => ({
          fontWeight: "bold",
          color: theme.palette.mode === "dark" ? "white" : "black",
        })}
      >
        URBANOACCESO
      </Typography>
    </Box>
  );
};

export default TopBarAndSideBarLayout;
