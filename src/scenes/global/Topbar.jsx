import {
  Box,
  IconButton,
  useTheme,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import { useProfile } from "../../context/ProfileContext";
import { useAuth } from "../../context/AuthContext";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { profileData } = useProfile();
  const { logout } = useAuth();

  // State for profile dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileNavigation = () => {
    navigate("/profile");
    handleClose();
  };

  const handleSignOut = () => {
    logout();
    navigate("/auth");
    handleClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>

        {/* PROFILE DROPDOWN */}
        <Box
          onClick={handleProfileClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary[400],
            },
          }}
        >
          <Avatar
            src={profileData.profilePhoto}
            alt={`${profileData.firstName} ${profileData.lastName}`}
            sx={{ width: 32, height: 32 }}
          />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography
              variant="body2"
              sx={{
                color: colors.grey[100],
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: colors.grey[300],
                lineHeight: 1,
              }}
            >
              {profileData.position}
            </Typography>
          </Box>
          <KeyboardArrowDownIcon
            sx={{
              color: colors.grey[100],
              fontSize: "1.2rem",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </Box>

        {/* DROPDOWN MENU */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              backgroundColor: colors.primary[400],
              border: `1px solid ${colors.grey[700]}`,
              borderRadius: "8px",
              minWidth: 200,
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
                backgroundColor: colors.primary[400],
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleProfileNavigation}>
            <ListItemIcon>
              <PersonOutlinedIcon sx={{ color: colors.grey[100] }} />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              sx={{ color: colors.grey[100] }}
            />
          </MenuItem>
          <Divider sx={{ backgroundColor: colors.grey[700] }} />
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: colors.redAccent[400] }} />
            </ListItemIcon>
            <ListItemText
              primary="Sign Out"
              sx={{ color: colors.redAccent[400] }}
            />
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;