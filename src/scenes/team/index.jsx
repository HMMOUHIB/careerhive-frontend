import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  Rating,
  CardContent,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery
} from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import managed from './TeamAnim/TeamMg.json';
import setting from './TeamAnim/setting.json';
import Lottie from "react-lottie";
import SplitText from "./Treactbit/SplitText";
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useAuth } from "../../context/AuthContext";
import './teammg.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const Team = () => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1024px) and (min-width:769px)');
  const { token } = useAuth();

  // Virtual employee database (static directory — not persisted, used as a "hire from" pool)
  const virtualEmployees = [
    {
      id: 101,
      name: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Senior Developer",
      rating: 4.7,
      feedback: "Exceptional problem-solving skills and mentorship",
      completedTrainings: 5,
      skills: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
      id: 102,
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      role: "DevOps Engineer",
      rating: 4.6,
      feedback: "Great automation and infrastructure expertise",
      completedTrainings: 4,
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS"]
    },
    {
      id: 103,
      name: "Sophie Martin",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      role: "Product Designer",
      rating: 4.9,
      feedback: "Innovative design thinking and user-centered approach",
      completedTrainings: 3,
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"]
    },
    {
      id: 104,
      name: "David Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      role: "Backend Developer",
      rating: 4.4,
      feedback: "Solid backend architecture and API design",
      completedTrainings: 4,
      skills: ["Python", "Django", "PostgreSQL", "Redis"]
    },
    {
      id: 105,
      name: "Lisa Anderson",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      role: "QA Engineer",
      rating: 4.5,
      feedback: "Thorough testing approach and attention to detail",
      completedTrainings: 3,
      skills: ["Selenium", "Jest", "Cypress", "Manual Testing"]
    },
    {
      id: 106,
      name: "James Thompson",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      role: "Full Stack Developer",
      rating: 4.3,
      feedback: "Versatile developer with strong problem-solving skills",
      completedTrainings: 6,
      skills: ["React", "Node.js", "MongoDB", "GraphQL"]
    },
    {
      id: 107,
      name: "Maria Garcia",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      role: "Data Analyst",
      rating: 4.8,
      feedback: "Excellent data insights and visualization skills",
      completedTrainings: 4,
      skills: ["Python", "SQL", "Tableau", "Machine Learning"]
    },
    {
      id: 108,
      name: "Alex Kim",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      role: "Mobile Developer",
      rating: 4.6,
      feedback: "Great mobile app development and user experience",
      completedTrainings: 5,
      skills: ["React Native", "Swift", "Kotlin", "Flutter"]
    }
  ];

  // Teams now come from the database, not hardcoded
  const [teams, setTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);

  const [openCreateTeam, setOpenCreateTeam] = useState(false);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newTeam, setNewTeam] = useState({ name: '', managerName: '', managerRole: '' });
  const [selectedVirtualEmployee, setSelectedVirtualEmployee] = useState('');
  const [feedbackData, setFeedbackData] = useState({ rating: 0, feedback: '' });
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);

  // Fetch teams from the backend on mount
  useEffect(() => {
    const loadTeams = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/teams`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTeams(data.teams || []);
      } catch (err) {
        console.error('Failed to load teams', err);
      } finally {
        setLoadingTeams(false);
      }
    };
    loadTeams();
  }, [token]);

  // Get available employees (not already in any team, matched by name since DB ids differ from mock ids)
  const getAvailableEmployees = () => {
    const assignedNames = teams.flatMap((team) => team.employees.map((emp) => emp.name));
    return virtualEmployees.filter((emp) => !assignedNames.includes(emp.name));
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: setting,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const lottieOptions2 = {
    loop: true,
    autoplay: true,
    animationData: managed,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  // ===== Team management functions (now persisted to MySQL) =====

  const handleCreateTeam = async () => {
    if (newTeam.name && newTeam.managerName) {
      try {
        const res = await fetch(`${API_BASE}/teams`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            name: newTeam.name,
            managerName: newTeam.managerName,
            managerRole: newTeam.managerRole || 'Manager',
            managerAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
          }),
        });
        if (!res.ok) throw new Error((await res.json())?.message || 'Failed to create team.');
        const createdTeam = await res.json();

        setTeams([...teams, createdTeam]);
        setNewTeam({ name: '', managerName: '', managerRole: '' });
        setOpenCreateTeam(false);
      } catch (err) {
        console.error('Failed to create team', err);
      }
    }
  };

  const handleAddEmployee = async () => {
    if (selectedVirtualEmployee && selectedTeam) {
      setIsAddingEmployee(true);
      try {
        const employee = virtualEmployees.find(emp => emp.id === parseInt(selectedVirtualEmployee));
        if (!employee) throw new Error('Employee not found.');

        const res = await fetch(`${API_BASE}/teams/${selectedTeam.id}/members`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            name: employee.name,
            avatar: employee.avatar,
            role: employee.role,
            rating: employee.rating,
            feedback: employee.feedback,
            completedTrainings: employee.completedTrainings,
            skills: employee.skills,
          }),
        });
        if (!res.ok) throw new Error((await res.json())?.message || 'Failed to add employee.');
        const newMember = await res.json();

        const updatedTeams = teams.map(team =>
          team.id === selectedTeam.id
            ? { ...team, employees: [...team.employees, newMember] }
            : team
        );

        setTeams(updatedTeams);
        setSelectedVirtualEmployee('');
        setOpenAddEmployee(false);
      } catch (err) {
        console.error('Failed to add employee', err);
      } finally {
        setIsAddingEmployee(false);
      }
    }
  };

  const handleSubmitFeedback = async () => {
    if (selectedEmployee && selectedTeam && feedbackData.rating > 0) {
      try {
        const res = await fetch(`${API_BASE}/teams/members/${selectedEmployee.id}/feedback`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ rating: feedbackData.rating, feedback: feedbackData.feedback }),
        });
        if (!res.ok) throw new Error((await res.json())?.message || 'Failed to submit feedback.');

        const updatedTeams = teams.map(team =>
          team.id === selectedTeam.id
            ? {
                ...team,
                employees: team.employees.map(emp =>
                  emp.id === selectedEmployee.id
                    ? { ...emp, rating: feedbackData.rating, feedback: feedbackData.feedback }
                    : emp
                )
              }
            : team
        );

        setTeams(updatedTeams);
        setFeedbackData({ rating: 0, feedback: '' });
        setOpenFeedback(false);
      } catch (err) {
        console.error('Failed to submit feedback', err);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="dashboard">
      {/* Header with animations */}
      <div className="header1">
        <p>Team</p> <span>Managed</span>
        <div className="settinganim">
          <Lottie
            options={lottieOptions}
            height={isMobile ? 100 : isTablet ? 120 : 150}
            width={isMobile ? 100 : isTablet ? 120 : 150}
          />
        </div>
      </div>

      <Box m={isMobile ? "20px 0 0 0" : "40px 0 0 0"} className="responsive-box">
        {/* Animated Title Section */}
        <div className="section1">
          <div className={`managedanim ${isMobile ? 'mobile-managedanim' : ''}`}>
            <SplitText
              text="✅ Create Teams, Add Members, and Track Employee Progress"
              className={`text-2xl font-semibold text-center ${isMobile ? 'mobile-text' : ''}`}
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.1}
              rootMargin="-100px"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <div className="animation2">
              <Lottie
                options={lottieOptions2}
                height={isMobile ? 120 : isTablet ? 160 : 200}
                width={isMobile ? 120 : isTablet ? 160 : 200}
              />
            </div>
          </div>
        </div>

        {/* Team Management Section */}
        <motion.div
          className="team-management-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Create Team Button */}
          <Box className="create-team-section" mb={3}>
            <Fab
              variant="extended"
              onClick={() => setOpenCreateTeam(true)}
              className="create-team-fab"
            >
              <AddIcon sx={{ mr: 1 }} />
              Create New Team
            </Fab>
          </Box>

          {/* Loading state */}
          {loadingTeams && (
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', mt: 4 }}>
              Loading teams...
            </Typography>
          )}

          {/* Teams Grid */}
          {!loadingTeams && (
            <Grid container spacing={3}>
              <AnimatePresence>
                {teams.map((team) => (
                  <Grid item xs={12} md={6} xl={4} key={team.id}>
                    <motion.div
                      variants={itemVariants}
                      layout
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <Paper className="team-card" elevation={3}>
                        <CardContent>
                          {/* Team Header */}
                          <Box className="team-header">
                            <Typography variant="h5" className="team-name">
                              <GroupIcon /> {team.name}
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                setSelectedTeam(team);
                                setOpenAddEmployee(true);
                              }}
                              startIcon={<PersonAddIcon />}
                              className="add-employee-btn"
                            >
                              Add Employee
                            </Button>
                          </Box>

                          {/* Manager Section */}
                          <Box className="manager-section">
                            <Typography variant="h6" className="section-title">
                              Manager
                            </Typography>
                            <Box className="manager-info">
                              <Avatar src={team.manager.avatar} className="manager-avatar" />
                              <Box>
                                <Typography variant="body1" className="manager-name">
                                  {team.manager.name}
                                </Typography>
                                <Typography variant="body2" className="manager-role">
                                  {team.manager.role}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          {/* Employees Section */}
                          <Box className="employees-section">
                            <Typography variant="h6" className="section-title">
                              Team Members ({team.employees.length})
                            </Typography>

                            {team.employees.length === 0 ? (
                              <Typography variant="body2" className="no-employees">
                                No employees added yet
                              </Typography>
                            ) : (
                              <Box className="employees-list">
                                {team.employees.map((employee, empIndex) => (
                                  <motion.div
                                    key={employee.id}
                                    className="employee-card"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.5,
                                      delay: empIndex * 0.1,
                                      type: "spring",
                                      stiffness: 100
                                    }}
                                    whileHover={{
                                      scale: 1.02,
                                      x: 8,
                                      transition: { duration: 0.2 }
                                    }}
                                    layout
                                  >
                                    <Box className="employee-info">
                                      <Avatar src={employee.avatar} className="employee-avatar" />
                                      <Box className="employee-details">
                                        <Typography variant="body1" className="employee-name">
                                          {employee.name}
                                        </Typography>
                                        <Typography variant="body2" className="employee-role">
                                          {employee.role}
                                        </Typography>
                                        <Box className="employee-stats">
                                          <Chip
                                            label={`${employee.completedTrainings} trainings`}
                                            size="small"
                                            className="training-chip"
                                          />
                                          {employee.skills.map((skill, index) => (
                                            <Chip
                                              key={index}
                                              label={skill}
                                              size="small"
                                              className="skill-chip"
                                            />
                                          ))}
                                        </Box>
                                      </Box>
                                    </Box>

                                    <Box className="employee-actions">
                                      <Box className="rating-section">
                                        <Rating
                                          value={employee.rating}
                                          readOnly
                                          size="small"
                                          precision={0.5}
                                        />
                                        <Typography variant="caption">
                                          {employee.rating}/5
                                        </Typography>
                                      </Box>
                                      <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => {
                                          setSelectedTeam(team);
                                          setSelectedEmployee(employee);
                                          setFeedbackData({
                                            rating: employee.rating,
                                            feedback: employee.feedback
                                          });
                                          setOpenFeedback(true);
                                        }}
                                        startIcon={<FeedbackIcon />}
                                        className="feedback-btn"
                                      >
                                        Rate & Feedback
                                      </Button>
                                    </Box>

                                    {employee.feedback && (
                                      <Box className="feedback-display">
                                        <Typography variant="body2" className="feedback-text">
                                          "{employee.feedback}"
                                        </Typography>
                                      </Box>
                                    )}
                                  </motion.div>
                                ))}
                              </Box>
                            )}
                          </Box>
                        </CardContent>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          )}
        </motion.div>

        {/* Create Team Dialog */}
        <Dialog open={openCreateTeam} onClose={() => setOpenCreateTeam(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Team Name"
              value={newTeam.name}
              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Manager Name"
              value={newTeam.managerName}
              onChange={(e) => setNewTeam({ ...newTeam, managerName: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Manager Role"
              value={newTeam.managerRole}
              onChange={(e) => setNewTeam({ ...newTeam, managerRole: e.target.value })}
              margin="normal"
              placeholder="e.g., Team Lead, Senior Manager"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreateTeam(false)}>Cancel</Button>
            <Button onClick={handleCreateTeam} variant="contained">Create Team</Button>
          </DialogActions>
        </Dialog>

        {/* Add Employee Dialog */}
        <Dialog open={openAddEmployee} onClose={() => setOpenAddEmployee(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add Employee to {selectedTeam?.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
              Select an available employee from the database:
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Available Employees</InputLabel>
              <Select
                value={selectedVirtualEmployee}
                onChange={(e) => setSelectedVirtualEmployee(e.target.value)}
                label="Available Employees"
              >
                {getAvailableEmployees().map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={employee.avatar} sx={{ width: 32, height: 32 }} />
                      <Box>
                        <Typography variant="body1">{employee.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {employee.role} • Rating: {employee.rating}/5
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedVirtualEmployee && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Paper sx={{ mt: 2, p: 2, background: 'rgba(76, 206, 172, 0.1)', borderRadius: 2 }}>
                  {(() => {
                    const employee = virtualEmployees.find(emp => emp.id === parseInt(selectedVirtualEmployee));
                    return employee ? (
                      <Box>
                        <Typography variant="h6" sx={{ color: '#4cceac', mb: 1 }}>
                          Employee Preview
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar src={employee.avatar} sx={{ width: 50, height: 50 }} />
                          <Box>
                            <Typography variant="h6" sx={{ color: '#fff' }}>{employee.name}</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                              {employee.role}
                            </Typography>
                            <Rating value={employee.rating} readOnly size="small" />
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                          <strong>Skills:</strong> {employee.skills.join(', ')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                          <strong>Completed Trainings:</strong> {employee.completedTrainings}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
                          "{employee.feedback}"
                        </Typography>
                      </Box>
                    ) : null;
                  })()}
                </Paper>
              </motion.div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddEmployee(false)} disabled={isAddingEmployee}>
              Cancel
            </Button>
            <Button
              onClick={handleAddEmployee}
              variant="contained"
              disabled={!selectedVirtualEmployee || isAddingEmployee}
            >
              {isAddingEmployee ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: 16, height: 16, border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%' }}
                  />
                  Adding...
                </Box>
              ) : (
                'Add Employee'
              )}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Feedback Dialog */}
        <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Rate & Provide Feedback for {selectedEmployee?.name}</DialogTitle>
          <DialogContent>
            <Box className="rating-input">
              <Typography variant="body1" gutterBottom>Rating</Typography>
              <Rating
                value={feedbackData.rating}
                onChange={(_, newValue) => setFeedbackData({ ...feedbackData, rating: newValue })}
                size="large"
                precision={0.5}
              />
            </Box>
            <TextField
              fullWidth
              label="Feedback"
              value={feedbackData.feedback}
              onChange={(e) => setFeedbackData({ ...feedbackData, feedback: e.target.value })}
              margin="normal"
              multiline
              rows={4}
              placeholder="Provide constructive feedback about their performance..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenFeedback(false)}>Cancel</Button>
            <Button onClick={handleSubmitFeedback} variant="contained">Submit Feedback</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Team;