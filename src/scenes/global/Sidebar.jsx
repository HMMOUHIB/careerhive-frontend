import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import { useAuth } from "../../context/AuthContext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();
  const role = user?.role || 'student';
  // Start as the narrow icon rail on phones/tablets so pages keep their width
  const [isCollapsed, setIsCollapsed] = useState(() => window.innerWidth < 900);
  const [selected, setSelected] = useState("Dashboard");

  const isEmployee = role === 'student';
  const isManagerOrHr = role === 'manager' || role === 'hr';

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            width: isCollapsed ? "60px" : "250px",
            transition: "width 0.3s ease",
          },
          "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
          "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
          "& .pro-inner-item:hover": { color: "#868dfb !important" },
          "& .pro-menu-item.active": { color: "#6870fa !important" },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? (
                <motion.img
                  alt="CareerHive Logo"
                  width="24px"
                  height="24px"
                  src="https://cdn-icons-png.flaticon.com/512/9552/9552379.png"
                  style={{ cursor: "pointer", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                />
              ) : undefined}
              style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
            >
              {!isCollapsed && (
                <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <Typography
                      variant="h3"
                      color={colors.grey[100]}
                      sx={{
                        background: `linear-gradient(45deg, ${colors.greenAccent[400]}, ${colors.blueAccent[400]})`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bold"
                      }}
                    >
                      Menu
                    </Typography>
                  </motion.div>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                  <Box display="flex" justifyContent="center" alignItems="center" mb="15px">
                    <motion.img
                      alt="CareerHive Logo"
                      width="80px"
                      height="80px"
                      src="https://cdn-icons-png.flaticon.com/512/9552/9552379.png"
                      style={{ cursor: "pointer", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
                      animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                      whileHover={{ scale: 1.1, rotate: 10, transition: { duration: 0.3 } }}
                    />
                  </Box>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                  <Box textAlign="center">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        sx={{
                          m: "10px 0 5px 0",
                          background: `linear-gradient(45deg, ${colors.greenAccent[400]}, ${colors.blueAccent[400]})`,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                        }}
                      >
                        CareerHive
                      </Typography>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
                      <Typography variant="body2" color={colors.grey[300]} sx={{ fontStyle: "italic", letterSpacing: "0.5px" }}>
                        Empowering Your Career Journey
                      </Typography>
                    </motion.div>
                    {/* Role badge */}
                    <Typography
                      variant="caption"
                      sx={{
                        display: "inline-block",
                        mt: 1,
                        px: 1.5,
                        py: 0.3,
                        borderRadius: "10px",
                        background: colors.greenAccent[700],
                        color: colors.greenAccent[200],
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontSize: "10px",
                      }}
                    >
                      {role === 'student' ? 'Employee' : role}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

              <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                Career
              </Typography>
              <Item title="Profile" to="/profile" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />

              {/* Employee-only: submit promotion request */}
              {isEmployee && (
                <Item title="Request Promotion" to="/promotion-request" icon={<TrendingUpOutlinedIcon />} selected={selected} setSelected={setSelected} />
              )}

              {/* Everyone sees formations, but employee experience = enroll/track, manager/hr = assign */}
              <Item title="Formations" to="/formations" icon={<SchoolOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Skills Evolution" to="/skills-evolution" icon={<WorkspacePremiumOutlinedIcon />} selected={selected} setSelected={setSelected} />

              {/* Manager/HR only */}
              {isManagerOrHr && (
                <>
                  <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                    Management
                  </Typography>
                  <Item title="Manage Team" to="/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
                  <Item title="Promotion Requests" to="/certificates" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
                  <Item title="Evaluations" to="/evaluations" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} />
                </>
              )}

              <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                Connect
              </Typography>
              <Item title="Team Comm Hub" to="/contacts" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>

      <Box
        sx={{
          marginLeft: isCollapsed ? "60px" : "50px",
          padding: "0px",
          width: "calc(100% - 250px)",
          overflowY: "auto",
          transition: "margin-left 0.3s ease",
        }}
      >
      </Box>
    </Box>
  );
};

export default Sidebar;