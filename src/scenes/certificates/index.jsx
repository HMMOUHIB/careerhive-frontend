import {
  Box,
  Typography,
  useTheme,
  TextField,
  Button,
  Snackbar,
  Alert,
  Paper,
  Grid,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Tooltip,
  useMediaQuery
} from "@mui/material";
import { tokens } from "../../theme";
import './certificates.css';
import certification from './certification.json';
import Lottie from "react-lottie";
import { useState, useEffect } from "react";
import guide from './guide.json';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "../../context/AuthContext";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery('(max-width:768px)');
  const { token, user } = useAuth();
  const userRole = user?.role; // 'student' | 'manager' | 'hr'

  const [promotionRequests, setPromotionRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPromoteDialog, setOpenPromoteDialog] = useState(false);
  const [openHrDialog, setOpenHrDialog] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [newSalary, setNewSalary] = useState(0);
  const [newPosition, setNewPosition] = useState('');
  const [performanceRating, setPerformanceRating] = useState(5);
  const [managerComments, setManagerComments] = useState('');
  const [hrComments, setHrComments] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (!token) return;
      try {
        const [empRes, reqRes] = await Promise.all([
          fetch(`${API_BASE}/employees`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/promotion-requests`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        const empData = await empRes.json();
        const reqData = await reqRes.json();
        setEmployees(empData.employees || []);
        setPromotionRequests(reqData.requests || []);
      } catch (err) {
        console.error('Failed to load promotion data', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  const lottieOptions = {
    loop: true, autoplay: true, animationData: certification,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };
  const lottieOptions2 = {
    loop: true, autoplay: true, animationData: guide,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };

  const getEmployee = (employeeId) => employees.find(emp => emp.id === employeeId);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'on-hold': return '#2196f3';
      case 'approved': return '#4caf50';
      case 'rejected': return '#f44336';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <NotificationsIcon />;
      case 'on-hold': return <WorkIcon />;
      case 'approved': return <CheckCircleIcon />;
      case 'rejected': return <CancelIcon />;
      default: return <WorkIcon />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'AWAITING HR';
      case 'on-hold': return 'AWAITING MANAGER';
      case 'approved': return 'APPROVED';
      case 'rejected': return 'REJECTED';
      default: return status.toUpperCase();
    }
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleOpenHrReview = (request) => {
    setSelectedRequest(request);
    setHrComments('');
    setOpenHrDialog(true);
  };

  const handleOpenManagerApproval = (request) => {
    setSelectedRequest(request);
    setNewSalary(request.requestedSalary);
    setNewPosition(request.requestedPosition);
    setPerformanceRating(5);
    setManagerComments('');
    setOpenPromoteDialog(true);
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await fetch(`${API_BASE}/promotion-requests/${requestId}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ comments: '' }),
      });
      setPromotionRequests(prev => prev.map(req => req.id === requestId ? { ...req, status: 'rejected' } : req));
      setAlert({ open: true, message: `Promotion request rejected.`, severity: 'warning' });
    } catch (err) {
      console.error('Failed to reject request', err);
    }
  };

  // STAGE 1 — HR reviews first
  const handleHrReview = async () => {
    if (!selectedRequest) return;
    try {
      await fetch(`${API_BASE}/promotion-requests/${selectedRequest.id}/hr-review`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ comments: hrComments }),
      });

      setPromotionRequests(prev =>
        prev.map(req =>
          req.id === selectedRequest.id
            ? {
                ...req,
                status: 'on-hold',
                hrApproval: {
                  approved: true,
                  approvedBy: 'HR Director',
                  approvedDate: new Date().toISOString().split('T')[0],
                  comments: hrComments
                }
              }
            : req
        )
      );

      setAlert({
        open: true,
        message: `Reviewed by HR. Awaiting Manager's final approval for ${getEmployee(selectedRequest.employeeId)?.name}`,
        severity: 'info'
      });
      setOpenHrDialog(false);
      setSelectedRequest(null);
      setHrComments('');
    } catch (err) {
      console.error('Failed to review request', err);
    }
  };

  // STAGE 2 — Manager final approval
  const handleManagerFinalApproval = async () => {
    if (!selectedRequest) return;
    try {
      await fetch(`${API_BASE}/promotion-requests/${selectedRequest.id}/manager-final-approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          approvedPosition: newPosition,
          approvedSalary: newSalary,
          approvedRating: performanceRating,
          comments: managerComments,
        }),
      });

      setEmployees(prev =>
        prev.map(emp =>
          emp.id === selectedRequest.employeeId
            ? { ...emp, currentPosition: newPosition, currentSalary: newSalary, performance: performanceRating }
            : emp
        )
      );

      setPromotionRequests(prev =>
        prev.map(req =>
          req.id === selectedRequest.id
            ? {
                ...req,
                status: 'approved',
                managerApproval: {
                  approved: true,
                  approvedBy: 'Manager',
                  approvedDate: new Date().toISOString().split('T')[0],
                  approvedPosition: newPosition,
                  approvedSalary: newSalary,
                  approvedRating: performanceRating,
                  comments: managerComments
                }
              }
            : req
        )
      );

      setAlert({
        open: true,
        message: `${getEmployee(selectedRequest.employeeId)?.name} has been promoted successfully!`,
        severity: 'success'
      });
      setOpenPromoteDialog(false);
      setSelectedRequest(null);
      setManagerComments('');
    } catch (err) {
      console.error('Failed to finalize approval', err);
    }
  };

  const calculateSalaryIncrease = (current, requested) => {
    const increase = requested - current;
    const percentage = current > 0 ? ((increase / current) * 100).toFixed(1) : '0.0';
    return { increase, percentage };
  };

  return (
    <Box className="promotion-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="promotion-header"
      >
        <Box className="header-content">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="header-icon"
          >
            <EmojiEventsIcon className="main-icon" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="header-text"
          >
            <Typography variant="h2" className="main-title">
              Career Advancement Hub
            </Typography>
            <Typography variant="h5" className="main-subtitle">
              {userRole === 'hr'
                ? 'Review promotion requests before they go to the manager for final approval'
                : userRole === 'manager'
                ? 'Give final approval on promotion requests HR has already reviewed'
                : 'Manage promotions, salary adjustments, and employee career growth'}
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 80 }}
            className="header-animation"
          >
            <Lottie options={lottieOptions} height={140} width={140} />
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="stats-section"
      >
        <Grid container spacing={3} className="stats-grid">
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.3 }}>
              <Paper className="stat-card pending">
                <Box className="stat-content">
                  <NotificationsIcon className="stat-icon" />
                  <Box className="stat-text">
                    <Typography variant="h3" className="stat-number">
                      {promotionRequests.filter(req => req.status === 'pending').length}
                    </Typography>
                    <Typography variant="body1" className="stat-label">Awaiting HR</Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.3 }}>
              <Paper className="stat-card on-hold">
                <Box className="stat-content">
                  <WorkIcon className="stat-icon" />
                  <Box className="stat-text">
                    <Typography variant="h3" className="stat-number">
                      {promotionRequests.filter(req => req.status === 'on-hold').length}
                    </Typography>
                    <Typography variant="body1" className="stat-label">Awaiting Manager</Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.3 }}>
              <Paper className="stat-card approved">
                <Box className="stat-content">
                  <CheckCircleIcon className="stat-icon" />
                  <Box className="stat-text">
                    <Typography variant="h3" className="stat-number">
                      {promotionRequests.filter(req => req.status === 'approved').length}
                    </Typography>
                    <Typography variant="body1" className="stat-label">Approved</Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.3 }}>
              <Paper className="stat-card employees">
                <Box className="stat-content">
                  <PersonIcon className="stat-icon" />
                  <Box className="stat-text">
                    <Typography variant="h3" className="stat-number">{employees.length}</Typography>
                    <Typography variant="body1" className="stat-label">Total Employees</Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.3 }}>
              <Paper className="stat-card salary">
                <Box className="stat-content">
                  <AttachMoneyIcon className="stat-icon" />
                  <Box className="stat-text">
                    <Typography variant="h3" className="stat-number">
                      ${employees.length > 0 ? Math.round(employees.reduce((sum, emp) => sum + emp.currentSalary, 0) / 1000) : 0}K
                    </Typography>
                    <Typography variant="body1" className="stat-label">Total Payroll</Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="requests-section"
      >
        <Box className="section-header">
          <Typography variant="h4" className="section-title">
            <TrendingUpIcon /> Promotion Requests
          </Typography>
          <Typography variant="body1" className="section-subtitle">
            {userRole === 'hr' ? 'Requests waiting on your review' : userRole === 'manager' ? 'Requests waiting on your final approval' : 'All promotion requests'}
          </Typography>
        </Box>

        {loading ? (
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', mt: 4 }}>
            Loading promotion requests...
          </Typography>
        ) : promotionRequests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="empty-state"
          >
            <BusinessCenterIcon className="empty-icon" />
            <Typography variant="h6" className="empty-title">No promotion requests yet</Typography>
            <Typography variant="body2" className="empty-subtitle">
              Promotion requests will appear here when employees submit them
            </Typography>
          </motion.div>
        ) : (
          <Grid container spacing={3} className="requests-grid">
            <AnimatePresence>
              {promotionRequests.map((request, index) => {
                const employee = getEmployee(request.employeeId);
                const salaryIncrease = calculateSalaryIncrease(request.currentSalary, request.requestedSalary);

                return (
                  <Grid item xs={12} md={6} lg={4} key={request.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -50, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <div className='card-content1'>
                        <Card className={`request-card ${request.status}`}>
                          <CardContent className="request-content">
                            <Box className="employee-header">
                              <Avatar src={employee?.avatar} className="employee-avatar" />
                              <Box className="employee-info">
                                <Box className="employee-name-row">
                                  <Typography variant="h6" className="employee-name">{employee?.name}</Typography>
                                  <Chip
                                    icon={getStatusIcon(request.status)}
                                    label={getStatusLabel(request.status)}
                                    className={`status-chip ${request.status}`}
                                    sx={{ backgroundColor: getStatusColor(request.status) }}
                                  />
                                </Box>
                                <Typography variant="body2" className="employee-department">
                                  {employee?.department} • {employee?.experience}
                                </Typography>
                                <Box className="performance-rating">
                                  <StarIcon className="star-icon" />
                                  <Typography variant="body2">{employee?.performance}/5.0</Typography>
                                </Box>
                              </Box>
                            </Box>

                            <Divider className="request-divider" />

                            <Box className="position-change">
                              <Typography variant="body2" className="change-label">Position Change</Typography>
                              <Box className="change-flow">
                                <Chip
                                  label={request.currentPosition.length > 15 ? `${request.currentPosition.substring(0, 15)}...` : request.currentPosition}
                                  className="current-chip"
                                />
                                <TrendingUpIcon className="arrow-icon" />
                                <Chip
                                  label={request.requestedPosition.length > 15 ? `${request.requestedPosition.substring(0, 15)}...` : request.requestedPosition}
                                  className="requested-chip"
                                />
                              </Box>
                            </Box>

                            <Box className="salary-change">
                              <Typography variant="body2" className="change-label">Salary Adjustment</Typography>
                              <Box className="salary-flow">
                                <Typography variant="body1" className="current-salary">${request.currentSalary.toLocaleString()}</Typography>
                                <TrendingUpIcon className="arrow-icon" />
                                <Typography variant="body1" className="requested-salary">${request.requestedSalary.toLocaleString()}</Typography>
                              </Box>
                              <Typography variant="body2" className="salary-increase">
                                +${salaryIncrease.increase.toLocaleString()} ({salaryIncrease.percentage}% increase)
                              </Typography>
                            </Box>

                            <Typography variant="caption" className="request-date">
                              Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                            </Typography>
                          </CardContent>

                          <CardActions className="request-actions">
                            <Tooltip title="View Details">
                              <IconButton onClick={() => handleViewRequest(request)} className="action-btn view-btn">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>

                            {/* HR — first stage, on 'pending' requests */}
                            {userRole === 'hr' && request.status === 'pending' && (
                              <>
                                <Tooltip title="Review (Send to Manager)">
                                  <IconButton onClick={() => handleOpenHrReview(request)} className="action-btn approve-btn">
                                    <CheckCircleIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Reject Request">
                                  <IconButton onClick={() => handleRejectRequest(request.id)} className="action-btn reject-btn">
                                    <CancelIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}

                            {/* Manager — final stage, on 'on-hold' requests */}
                            {userRole === 'manager' && request.status === 'on-hold' && (
                              <>
                                <Tooltip title="Final Approval">
                                  <IconButton onClick={() => handleOpenManagerApproval(request)} className="action-btn approve-btn">
                                    <CheckCircleIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Reject Request">
                                  <IconButton onClick={() => handleRejectRequest(request.id)} className="action-btn reject-btn">
                                    <CancelIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}

                            {(request.status === 'approved' || request.status === 'rejected') && (
                              <Chip
                                label={request.status === 'approved' ? 'Completed' : 'Closed'}
                                size="small"
                                className={`status-info-chip ${request.status}`}
                              />
                            )}
                          </CardActions>
                        </Card>
                      </div>
                    </motion.div>
                  </Grid>
                );
              })}
            </AnimatePresence>
          </Grid>
        )}
      </motion.div>

      {/* View Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth className="request-dialog">
        {selectedRequest && (
          <>
            <DialogTitle className="dialog-header">
              <Box className="dialog-title-content">
                <Avatar src={getEmployee(selectedRequest.employeeId)?.avatar} className="dialog-avatar" />
                <Box>
                  <Typography variant="h6">Promotion Request Details</Typography>
                  <Typography variant="body2" color="textSecondary">{getEmployee(selectedRequest.employeeId)?.name}</Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent className="dialog-content">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper className="detail-section">
                    <Typography variant="h6" className="detail-title">Current Information</Typography>
                    <Box className="detail-item">
                      <Typography variant="body2" color="textSecondary">Position</Typography>
                      <Typography variant="body1">{selectedRequest.currentPosition}</Typography>
                    </Box>
                    <Box className="detail-item">
                      <Typography variant="body2" color="textSecondary">Salary</Typography>
                      <Typography variant="body1">${selectedRequest.currentSalary.toLocaleString()}</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper className="detail-section">
                    <Typography variant="h6" className="detail-title">Requested Changes</Typography>
                    <Box className="detail-item">
                      <Typography variant="body2" color="textSecondary">New Position</Typography>
                      <Typography variant="body1">{selectedRequest.requestedPosition}</Typography>
                    </Box>
                    <Box className="detail-item">
                      <Typography variant="body2" color="textSecondary">New Salary</Typography>
                      <Typography variant="body1">${selectedRequest.requestedSalary.toLocaleString()}</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className="detail-section">
                    <Typography variant="h6" className="detail-title">Justification</Typography>
                    <Typography variant="body1" className="request-reason">{selectedRequest.reason}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper className="detail-section">
                    <Typography variant="h6" className="detail-title">Key Achievements</Typography>
                    {(selectedRequest.achievements || []).map((a, i) => (
                      <Box key={i} className="achievement-item">
                        <CheckCircleIcon className="achievement-icon" />
                        <Typography variant="body2">{a}</Typography>
                      </Box>
                    ))}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper className="detail-section">
                    <Typography variant="h6" className="detail-title">Certifications</Typography>
                    {(selectedRequest.certificates || []).map((cert, i) => (
                      <Chip key={i} label={cert} className="certificate-chip" icon={<EmojiEventsIcon />} />
                    ))}
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="dialog-actions">
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* HR Review Dialog — Stage 1 */}
      <Dialog open={openHrDialog} onClose={() => setOpenHrDialog(false)} maxWidth="sm" fullWidth className="hr-dialog">
        {selectedRequest && (
          <>
            <DialogTitle className="hr-header">
              <BusinessCenterIcon className="hr-icon" />
              <Typography variant="h6">HR Review</Typography>
            </DialogTitle>
            <DialogContent className="hr-content">
              <Typography variant="body1" className="hr-message">
                Reviewing request for <strong>{getEmployee(selectedRequest.employeeId)?.name}</strong>
              </Typography>
              <Typography variant="body2" className="workflow-info">
                Your approval sends this to the Manager for final confirmation.
              </Typography>
              <Box className="hr-form">
                <TextField
                  label="HR Comments"
                  value={hrComments}
                  onChange={(e) => setHrComments(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  variant="outlined"
                  placeholder="Add HR comments about this request..."
                />
              </Box>
            </DialogContent>
            <DialogActions className="hr-actions">
              <Button onClick={() => setOpenHrDialog(false)}>Cancel</Button>
              <Button onClick={() => handleRejectRequest(selectedRequest.id)} variant="outlined" color="error" startIcon={<CancelIcon />}>
                Reject
              </Button>
              <Button onClick={handleHrReview} variant="contained" color="primary" startIcon={<TrendingUpIcon />}>
                Approve & Send to Manager
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Manager Final Approval Dialog — Stage 2 */}
      <Dialog open={openPromoteDialog} onClose={() => setOpenPromoteDialog(false)} maxWidth="sm" fullWidth className="promote-dialog">
        {selectedRequest && (
          <>
            <DialogTitle className="promote-header">
              <EmojiEventsIcon className="promote-icon" />
              <Typography variant="h6">Manager Final Approval</Typography>
            </DialogTitle>
            <DialogContent className="promote-content">
              <Typography variant="body1" className="promote-message">
                Finalizing promotion for <strong>{getEmployee(selectedRequest.employeeId)?.name}</strong>
              </Typography>

              {selectedRequest.hrApproval && (
                <Paper className="approval-summary" sx={{ mt: 2, mb: 2, p: 2 }}>
                  <Typography variant="body2" color="textSecondary">HR Comments:</Typography>
                  <Typography variant="body1">{selectedRequest.hrApproval.comments || '—'}</Typography>
                </Paper>
              )}

              <Box className="promote-form">
                <TextField
                  label="Final Position"
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Final Salary"
                  type="number"
                  value={newSalary}
                  onChange={(e) => setNewSalary(Number(e.target.value))}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputProps={{ startAdornment: <Typography>$</Typography> }}
                />
                <Box className="rating-section">
                  <Typography variant="body2" className="rating-label">Performance Rating</Typography>
                  <Slider
                    value={performanceRating}
                    onChange={(e, value) => setPerformanceRating(value)}
                    min={1}
                    max={5}
                    step={0.1}
                    marks={[{ value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' }, { value: 5, label: '5' }]}
                    valueLabelDisplay="on"
                    className="performance-slider"
                  />
                </Box>
                <TextField
                  label="Manager Comments"
                  value={managerComments}
                  onChange={(e) => setManagerComments(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                  variant="outlined"
                  placeholder="Add final comments..."
                />
              </Box>
            </DialogContent>
            <DialogActions className="promote-actions">
              <Button onClick={() => setOpenPromoteDialog(false)}>Cancel</Button>
              <Button onClick={handleManagerFinalApproval} variant="contained" color="success" startIcon={<CheckCircleIcon />}>
                Confirm Promotion
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alert.severity} sx={{ width: '100%' }}>{alert.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Invoices;