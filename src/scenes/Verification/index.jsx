import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  TextField,
  IconButton,
  Badge,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  InputAdornment,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery
} from "@mui/material";
import { tokens } from "../../theme";
import ProfileCard from "./verifreactbit/ProfileCard";
import './verification.css';
import { useTheme } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import ProfileCard2 from "./verifreactbit/ProfileCard2";
import ProfileCard3 from "./verifreactbit/ProfileCard3";
import Lottie from "react-lottie";
import verificon from './LottieVerif/verif.json';
import EmployeeBtn from "./verifreactbit/EmployeeBtn";
import RhBtn from "./verifreactbit/RhBtn";
import ProfileCard4 from "./verifreactbit/ProfileCard4";
import ProfileCard5 from "./verifreactbit/ProfileCard5";
import ProfileCard6 from "./verifreactbit/ProfileCard6";
import { motion, AnimatePresence } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import OnlineIcon from '@mui/icons-material/FiberManualRecord';
import { useAuth } from "../../context/AuthContext";

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const Contacts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:768px)');
  const colors = tokens(theme.palette.mode);
  const { token } = useAuth();

  const [card1Visible, setCard1Visible] = useState(true);
  const [card2Visible, setCard2Visible] = useState(true);
  const [card3Visible , setCard3Visible] = useState(true);
  const [card4Visible , setCard4Visible] = useState(true);
  const [card5Visible , setCard5Visible] = useState(true);
  const [card6Visible , setCard6Visible] = useState(true);

  const [openChat, setOpenChat] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Team Lead",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      online: true,
      lastSeen: "now",
      unreadCount: 3,
      lastMessage: "Let's schedule the meeting for tomorrow",
      lastMessageTime: "2 min ago"
    },
    {
      id: 2,
      name: "John Doe",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      online: true,
      lastSeen: "now",
      unreadCount: 0,
      lastMessage: "The React component is ready for review",
      lastMessageTime: "15 min ago"
    },
    {
      id: 3,
      name: "Alice Smith",
      role: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      online: false,
      lastSeen: "5 min ago",
      unreadCount: 1,
      lastMessage: "I've updated the design mockups",
      lastMessageTime: "1 hour ago"
    },
    {
      id: 4,
      name: "Michael Chen",
      role: "DevOps Engineer",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      online: true,
      lastSeen: "now",
      unreadCount: 0,
      lastMessage: "Deployment successful ✅",
      lastMessageTime: "3 hours ago"
    },
    {
      id: 5,
      name: "Emma Wilson",
      role: "Senior Developer",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      online: false,
      lastSeen: "2 hours ago",
      unreadCount: 2,
      lastMessage: "Can we discuss the API changes?",
      lastMessageTime: "4 hours ago"
    }
  ];

  // Seed conversation starters — kept as fallback "incoming" demo messages
  const seedMessages = {
    1: [
      { id: 1, text: "Hi! How's the project going?", sender: "other", time: "10:30 AM" },
      { id: 2, text: "Going well! Just finished the user authentication module.", sender: "me", time: "10:32 AM" },
      { id: 3, text: "Great! Let's schedule the meeting for tomorrow", sender: "other", time: "10:35 AM" },
    ],
    2: [
      { id: 1, text: "The React component is ready for review", sender: "other", time: "9:45 AM" },
      { id: 2, text: "Perfect! I'll check it out now.", sender: "me", time: "9:47 AM" },
    ],
    3: [
      { id: 1, text: "I've updated the design mockups", sender: "other", time: "8:30 AM" },
    ],
    4: [
      { id: 1, text: "Deployment successful ✅", sender: "other", time: "6:00 AM" },
      { id: 2, text: "Awesome! Thanks for the quick deployment.", sender: "me", time: "6:05 AM" },
    ],
    5: [
      { id: 1, text: "Can we discuss the API changes?", sender: "other", time: "5:30 AM" },
      { id: 2, text: "Sure! What specific changes are you thinking about?", sender: "me", time: "5:35 AM" },
    ]
  };

  const [messages, setMessages] = useState(seedMessages);

  // Load real persisted messages from the database and merge with seed conversation starters
  useEffect(() => {
    const loadMessages = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/chat-messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const persisted = data.messages || {};

        setMessages((prev) => {
          const merged = { ...seedMessages };
          Object.keys(persisted).forEach((contactId) => {
            merged[contactId] = [...(seedMessages[contactId] || []), ...persisted[contactId]];
          });
          return merged;
        });
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    };
    loadMessages();
  }, [token]);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: verificon,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    }
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setOpenChat(true);
  };

  const handleSendMessage = async () => {
    if (message.trim() && selectedContact) {
      const text = message.trim();
      setMessage('');

      try {
        const res = await fetch(`${API_BASE}/chat-messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ contactId: selectedContact.id, text }),
        });
        if (!res.ok) throw new Error((await res.json())?.message || 'Failed to send message.');
        const savedMessage = await res.json();

        setMessages((prev) => ({
          ...prev,
          [selectedContact.id]: [...(prev[selectedContact.id] || []), savedMessage],
        }));
      } catch (err) {
        console.error('Failed to send message', err);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredTeamMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedContact]);

  const hideCard1 = () => setCard1Visible(false);
  const hideCard2 = () => setCard2Visible(false);
  const hideCard3 = () => setCard3Visible(false);
  const hideCard4 = () => setCard4Visible(false);
  const hideCard5 = () => setCard5Visible(false);
  const hideCard6 = () => setCard6Visible(false);

  const allEmployeeCardsHidden = !card1Visible && !card2Visible && !card3Visible;
  const allHrCardsHidden = !card4Visible && !card5Visible && !card6Visible;

  return (
    <Box className="verification-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="enhanced-header"
      >
        <Box className="header-content">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="header-icon"
          >
            <ChatIcon className="main-icon" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="header-text"
          >
            <Typography variant="h2" className="main-title">
              Team Communications Hub
            </Typography>
            <Typography variant="h5" className="main-subtitle">
              Connect, collaborate, and communicate with your team members in real-time
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 80 }}
            className="header-animation"
          >
            <Lottie
              options={lottieOptions}
              height={140}
              width={140}
            />
          </motion.div>
        </Box>

        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="floating-element element-1"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 0.8, 1], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="floating-element element-2"
        />
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="floating-element element-3"
        />
        <motion.div
          animate={{ x: [-10, 10, -10], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="floating-element element-4"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 60 }}
        className="communications-section"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="communications-header"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Typography variant="h3" className="communications-title">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: 'inline-block' }}
              >
                💬
              </motion.div>
              Start Conversations
            </Typography>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <Typography variant="h6" className="communications-subtitle">
              Real-time messaging • Video calls • File sharing • Team collaboration
            </Typography>
          </motion.div>
        </motion.div>

        <Grid container spacing={3} className="communications-grid">
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 1.6, type: "spring", stiffness: 80 }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
            >
              <Paper className="team-members-panel" elevation={6}>
                <Box className="panel-header">
                  <Typography variant="h6" className="panel-title">
                    Team Members
                  </Typography>
                  <TextField
                    size="small"
                    placeholder="Search team..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    className="search-field"
                  />
                </Box>

                <List className="team-members-list">
                  <AnimatePresence>
                    {filteredTeamMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ListItem
                          button
                          onClick={() => handleContactSelect(member)}
                          className="team-member-item"
                        >
                          <ListItemAvatar>
                            <Badge
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              badgeContent={
                                member.online ? (
                                  <OnlineIcon className="online-indicator" />
                                ) : null
                              }
                            >
                              <Avatar src={member.avatar} className="member-avatar" />
                            </Badge>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box className="member-info">
                                <Typography variant="body1" className="member-name">
                                  {member.name}
                                </Typography>
                                {member.unreadCount > 0 && (
                                  <Chip
                                    label={member.unreadCount}
                                    size="small"
                                    className="unread-badge"
                                  />
                                )}
                              </Box>
                            }
                            secondary={
                              <Box className="member-details">
                                <Typography variant="body2" className="member-role">
                                  {member.role}
                                </Typography>
                                <Typography variant="caption" className="last-message">
                                  {member.lastMessage}
                                </Typography>
                                <Typography variant="caption" className="message-time">
                                  {member.lastMessageTime}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </List>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 1.8, type: "spring", stiffness: 80 }}
              whileHover={{ scale: 1.01, rotateY: -2 }}
            >
              <Paper className="chat-preview-panel" elevation={6}>
                {selectedContact ? (
                  <Box className="chat-preview-content">
                    <Box className="chat-preview-header">
                      <Avatar src={selectedContact.avatar} className="preview-avatar" />
                      <Box className="preview-info">
                        <Typography variant="h6" className="preview-name">
                          {selectedContact.name}
                        </Typography>
                        <Typography variant="body2" className="preview-status">
                          {selectedContact.online ? 'Online' : `Last seen ${selectedContact.lastSeen}`}
                        </Typography>
                      </Box>
                      <Box className="preview-actions">
                        <IconButton className="action-btn">
                          <VideoCallIcon />
                        </IconButton>
                        <IconButton
                          className="action-btn"
                          onClick={() => setOpenChat(true)}
                        >
                          <ChatIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Divider />
                    <Box className="recent-messages">
                      <Typography variant="body2" className="recent-title">
                        Recent Messages
                      </Typography>
                      {(messages[selectedContact.id] || []).slice(-3).map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`message-preview ${msg.sender}`}
                        >
                          <Typography variant="body2" className="message-text">
                            {msg.text}
                          </Typography>
                          <Typography variant="caption" className="message-time">
                            {msg.time}
                          </Typography>
                        </motion.div>
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <Box className="no-contact-selected">
                    <ChatIcon className="no-contact-icon" />
                    <Typography variant="h6" className="no-contact-title">
                      Select a team member to start chatting
                    </Typography>
                    <Typography variant="body2" className="no-contact-subtitle">
                      Choose from your team members on the left to begin a conversation
                    </Typography>
                  </Box>
                )}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>

      <AnimatePresence>
        {!openChat && (
          <motion.div
            initial={{ scale: 0, rotate: -360, y: 100 }}
            animate={{
              scale: 1,
              rotate: 0,
              y: 0,
              transition: { type: "spring", stiffness: 200, damping: 15, delay: 2.5 }
            }}
            exit={{ scale: 0, rotate: 360, y: 100, transition: { duration: 0.4 } }}
            whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
            className="floating-chat-btn"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 8px 25px rgba(76, 206, 172, 0.3)",
                  "0 12px 35px rgba(76, 206, 172, 0.5)",
                  "0 8px 25px rgba(76, 206, 172, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Fab
                color="primary"
                onClick={() => selectedContact && setOpenChat(true)}
                disabled={!selectedContact}
                className="chat-fab"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChatIcon />
                </motion.div>
              </Fab>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog
        open={openChat}
        onClose={() => setOpenChat(false)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        className="chat-dialog"
      >
        {selectedContact && (
          <>
            <DialogTitle className="chat-dialog-header">
              <Box className="chat-header-content">
                <Box className="chat-contact-info">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      selectedContact.online ? (
                        <OnlineIcon className="online-indicator" />
                      ) : null
                    }
                  >
                    <Avatar src={selectedContact.avatar} className="chat-avatar" />
                  </Badge>
                  <Box className="chat-contact-details">
                    <Typography variant="h6" className="chat-contact-name">
                      {selectedContact.name}
                    </Typography>
                    <Typography variant="body2" className="chat-contact-status">
                      {selectedContact.online ? 'Online' : `Last seen ${selectedContact.lastSeen}`}
                    </Typography>
                  </Box>
                </Box>
                <Box className="chat-header-actions">
                  <IconButton className="header-action-btn">
                    <VideoCallIcon />
                  </IconButton>
                  <IconButton className="header-action-btn">
                    <MoreVertIcon />
                  </IconButton>
                  <IconButton onClick={() => setOpenChat(false)} className="close-btn">
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            </DialogTitle>

            <DialogContent className="chat-dialog-content">
              <Box className="messages-container">
                <AnimatePresence>
                  {(messages[selectedContact.id] || []).map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`message-bubble ${msg.sender}`}
                    >
                      <Box className="message-content">
                        <Typography variant="body1" className="message-text">
                          {msg.text}
                        </Typography>
                        <Typography variant="caption" className="message-timestamp">
                          {msg.time}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </Box>
            </DialogContent>

            <Box className="chat-input-container">
              <TextField
                fullWidth
                multiline
                maxRows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                variant="outlined"
                className="message-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton size="small" className="emoji-btn">
                        <EmojiEmotionsIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" className="attach-btn">
                        <AttachFileIcon />
                      </IconButton>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className="send-btn"
                        >
                          <SendIcon />
                        </IconButton>
                      </motion.div>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </>
        )}
      </Dialog>

    </Box>
  );
};

export default Contacts;