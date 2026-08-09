import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Box, Typography, Grid, Button, Chip, Card, CardContent, CardActions,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, LinearProgress, Avatar,
  Tabs, Tab, IconButton, Tooltip,
} from "@mui/material";
import gsap from "gsap";
import { useAuth } from "../../context/AuthContext";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import "./formations.css";

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const Formations = () => {
  const { token, user } = useAuth();
  const role = user?.role || "student";
  const isManagerOrHr = role === "manager" || role === "hr";
  const isHr = role === "hr";
  const isManager = role === "manager";

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroIconRefs = useRef([]);
  heroIconRefs.current = [];
  const addHeroIconRef = (el) => el && !heroIconRefs.current.includes(el) && heroIconRefs.current.push(el);
  const statNumberRefs = useRef([]);
  statNumberRefs.current = [];
  const addStatRef = (el) => el && !statNumberRefs.current.includes(el) && statNumberRefs.current.push(el);

  const catalogRefs = useRef([]);
  catalogRefs.current = [];
  const addCatalogRef = (el) => el && !catalogRefs.current.includes(el) && catalogRefs.current.push(el);

  const [tab, setTab] = useState(0);
  const [formations, setFormations] = useState([]);
  const [myFormations, setMyFormations] = useState([]);
  const [formationRequests, setFormationRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [motivation, setMotivation] = useState("");

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newFormation, setNewFormation] = useState({
    title: "", description: "", duration: "", instructor: "", level: "Intermédiaire", category: "",
  });

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [assignFormation, setAssignFormation] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const [snack, setSnack] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      try {
        const calls = [fetch(`${API_BASE}/formations`, { headers: { Authorization: `Bearer ${token}` } })];
        if (isManagerOrHr) {
          calls.push(fetch(`${API_BASE}/formation-requests`, { headers: { Authorization: `Bearer ${token}` } }));
          calls.push(fetch(`${API_BASE}/employees`, { headers: { Authorization: `Bearer ${token}` } }));
        } else {
          calls.push(fetch(`${API_BASE}/my-formations`, { headers: { Authorization: `Bearer ${token}` } }));
        }
        const results = await Promise.all(calls);
        const formationsData = await results[0].json();
        setFormations(formationsData.formations || []);
        if (isManagerOrHr) {
          const reqData = await results[1].json();
          const empData = await results[2].json();
          setFormationRequests(reqData.requests || []);
          setEmployees(empData.employees || []);
        } else {
          const mineData = await results[1].json();
          setMyFormations(mineData.formations || []);
        }
      } catch (err) {
        console.error("Failed to load formations data", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token, isManagerOrHr]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.2")
        .fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .fromTo(
          heroIconRefs.current,
          { opacity: 0, scale: 0, rotate: -90 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.6, stagger: 0.12, ease: "back.out(2.4)" },
          "-=0.3"
        )
        .fromTo(
          statNumberRefs.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        );

      heroIconRefs.current.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -12 : 10,
          rotate: i % 2 === 0 ? 6 : -6,
          duration: 2.6 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.15,
        });
      });

      gsap.to(heroRef.current, {
        backgroundPosition: "80% 60%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      statNumberRefs.current.forEach((el) => {
        const target = parseInt(el.dataset.target || "0", 10);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.4,
          onUpdate: () => {
            el.textContent = Math.round(counter.val);
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        catalogRefs.current,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [loading, tab, formations, myFormations, formationRequests]);

  const getLevelColor = (level) => {
    switch (level) {
      case "Débutant": return "#4cceac";
      case "Intermédiaire": return "#ff9f43";
      case "Avancé": return "#ee5253";
      default: return "#6870fa";
    }
  };

  const getStatusChip = (status) => {
    const map = {
      pending: { label: "AWAITING HR", color: "#ff9800", icon: <HourglassTopIcon fontSize="small" /> },
      "on-hold": { label: "AWAITING MANAGER", color: "#2196f3", icon: <HourglassTopIcon fontSize="small" /> },
      approved: { label: "APPROVED", color: "#4caf50", icon: <CheckCircleIcon fontSize="small" /> },
      rejected: { label: "REJECTED", color: "#f44336", icon: <CancelIcon fontSize="small" /> },
    };
    return map[status] || map.pending;
  };

  const handleOpenRequest = (formation) => {
    setSelectedFormation(formation);
    setMotivation("");
    setRequestDialogOpen(true);
  };

  const handleSubmitRequest = async () => {
    if (!selectedFormation || !motivation.trim()) return;
    try {
      await fetch(`${API_BASE}/formation-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ formationId: selectedFormation.id, motivation }),
      });
      setSnack(`Request sent for "${selectedFormation.title}" — awaiting HR review.`);
      setRequestDialogOpen(false);
      setSelectedFormation(null);
      setMotivation("");
    } catch (err) {
      console.error("Failed to submit request", err);
    }
  };

  const handleUpdateProgress = async (myFormation, newProgress) => {
    try {
      await fetch(`${API_BASE}/my-formations/${myFormation.id}/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ progress: newProgress }),
      });
      setMyFormations((prev) =>
        prev.map((f) =>
          f.id === myFormation.id
            ? { ...f, progress: newProgress, status: newProgress >= 100 ? "Terminée" : "En cours" }
            : f
        )
      );
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  const handleCreateFormation = async () => {
    if (!newFormation.title.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/formations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newFormation),
      });
      const data = await res.json();
      setFormations((prev) => [{ id: data.id, ...newFormation, available: true, skills: [] }, ...prev]);
      setCreateDialogOpen(false);
      setNewFormation({ title: "", description: "", duration: "", instructor: "", level: "Intermédiaire", category: "" });
      setSnack("Formation added to the catalog.");
    } catch (err) {
      console.error("Failed to create formation", err);
    }
  };

  const handleOpenAssign = (formation) => {
    setAssignFormation(formation);
    setSelectedEmployeeId("");
    setAssignDialogOpen(true);
  };

  const handleAssign = async () => {
    if (!assignFormation || !selectedEmployeeId) return;
    try {
      const res = await fetch(`${API_BASE}/formations/${assignFormation.id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: selectedEmployeeId }),
      });
      if (!res.ok) {
        const err = await res.json();
        setSnack(err.message || "Failed to assign.");
        return;
      }
      const emp = employees.find((e) => e.id === parseInt(selectedEmployeeId));
      setSnack(`"${assignFormation.title}" assigned to ${emp?.name}.`);
      setAssignDialogOpen(false);
      setAssignFormation(null);
      setSelectedEmployeeId("");
    } catch (err) {
      console.error("Failed to assign formation", err);
    }
  };

  const handleHrReviewRequest = async (requestId) => {
    try {
      await fetch(`${API_BASE}/formation-requests/${requestId}/hr-review`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      setFormationRequests((prev) => prev.map((r) => (r.id === requestId ? { ...r, status: "on-hold" } : r)));
      setSnack("Reviewed — sent to Manager for final confirmation.");
    } catch (err) {
      console.error("Failed to review request", err);
    }
  };

  const handleManagerConfirmRequest = async (requestId) => {
    try {
      await fetch(`${API_BASE}/formation-requests/${requestId}/manager-confirm`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      setFormationRequests((prev) => prev.map((r) => (r.id === requestId ? { ...r, status: "approved" } : r)));
      setSnack("Confirmed — employee enrolled.");
    } catch (err) {
      console.error("Failed to confirm request", err);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await fetch(`${API_BASE}/formation-requests/${requestId}/reject`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      setFormationRequests((prev) => prev.map((r) => (r.id === requestId ? { ...r, status: "rejected" } : r)));
      setSnack("Request rejected.");
    } catch (err) {
      console.error("Failed to reject request", err);
    }
  };

  const totalFormations = formations.length;
  const activeCount = isManagerOrHr
    ? formationRequests.filter((r) => r.status === "pending" || r.status === "on-hold").length
    : myFormations.filter((f) => f.status !== "Terminée").length;
  const completedCount = isManagerOrHr
    ? formationRequests.filter((r) => r.status === "approved").length
    : myFormations.filter((f) => f.status === "Terminée").length;

  return (
    <Box m="20px" ref={containerRef}>
      {/* ===== ANIMATED HERO SECTION ===== */}
      <Box className="formations-hero" ref={heroRef}>
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="hero-grid-overlay"></div>

        <Box className="hero-content">
          <Box className="hero-text-block">
            <Typography className="hero-eyebrow">
              {isManagerOrHr ? "Talent Development" : "Grow Your Career"}
            </Typography>
            <Typography variant="h1" className="hero-title" ref={heroTitleRef}>
              Formations
            </Typography>
            <Typography className="hero-subtitle" ref={heroSubRef}>
              {isManagerOrHr
                ? "Create formations, assign them to your team, and review enrollment requests."
                : "Browse formations, track your progress, and level up your skills."}
            </Typography>

            {isManagerOrHr && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                className="add-formation-btn"
                onClick={() => setCreateDialogOpen(true)}
              >
                New Formation
              </Button>
            )}
          </Box>

          <Box className="hero-icon-cluster">
            <div className="hero-icon-circle circle-a" ref={addHeroIconRef}>
              <SchoolIcon />
            </div>
            <div className="hero-icon-circle circle-b" ref={addHeroIconRef}>
              <WorkspacePremiumIcon />
            </div>
            <div className="hero-icon-circle circle-c" ref={addHeroIconRef}>
              <AutoStoriesIcon />
            </div>
            <div className="hero-icon-circle circle-d" ref={addHeroIconRef}>
              <RocketLaunchIcon />
            </div>
            <div className="hero-icon-circle circle-e" ref={addHeroIconRef}>
              <EmojiObjectsIcon />
            </div>
          </Box>
        </Box>

        <Box className="hero-stats-row">
          <Box className="hero-stat">
            <Typography className="hero-stat-number" ref={addStatRef} data-target={totalFormations}>
              0
            </Typography>
            <Typography className="hero-stat-label">Formations Available</Typography>
          </Box>
          <Box className="hero-stat-divider" />
          <Box className="hero-stat">
            <Typography className="hero-stat-number" ref={addStatRef} data-target={activeCount}>
              0
            </Typography>
            <Typography className="hero-stat-label">{isManagerOrHr ? "Pending Reviews" : "In Progress"}</Typography>
          </Box>
          <Box className="hero-stat-divider" />
          <Box className="hero-stat">
            <Typography className="hero-stat-number" ref={addStatRef} data-target={completedCount}>
              0
            </Typography>
            <Typography className="hero-stat-label">{isManagerOrHr ? "Approved" : "Completed"}</Typography>
          </Box>
        </Box>
      </Box>

      {snack && (
        <Box className="snack-banner">
          <Typography variant="body2">{snack}</Typography>
          <IconButton size="small" onClick={() => setSnack("")}>
            <CancelIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Tabs value={tab} onChange={(e, v) => setTab(v)} className="formation-tabs" sx={{ mt: 3, mb: 3 }}>
        <Tab label="Catalog" />
        <Tab label={isManagerOrHr ? "Enrollment Requests" : "My Formations"} />
      </Tabs>

      {loading ? (
        <Typography sx={{ color: "rgba(255,255,255,0.6)", textAlign: "center", mt: 6 }}>
          Loading...
        </Typography>
      ) : (
        <>
          {tab === 0 && (
            <Grid container spacing={3}>
              {formations.length === 0 ? (
                <Grid item xs={12}>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center", mt: 4 }}>
                    No formations available yet{isManagerOrHr ? " — create one to get started." : "."}
                  </Typography>
                </Grid>
              ) : (
                formations.map((formation) => (
                  <Grid item xs={12} md={6} lg={4} key={formation.id}>
                    <div ref={addCatalogRef}>
                      <Card className="formation-card" elevation={3}>
                        <CardContent>
                          <Box className="formation-header">
                            <Typography variant="h6" className="formation-title">
                              <SchoolIcon /> {formation.title}
                            </Typography>
                            <Chip
                              label={formation.level}
                              style={{ backgroundColor: getLevelColor(formation.level), color: "#fff" }}
                              size="small"
                            />
                          </Box>
                          <Typography variant="body2" className="formation-description">
                            {formation.description}
                          </Typography>
                          <Box className="formation-meta">
                            <Box className="meta-item">
                              <AccessTimeIcon />
                              <Typography variant="body2">{formation.duration}</Typography>
                            </Box>
                            <Box className="meta-item">
                              <PersonIcon />
                              <Typography variant="body2">{formation.instructor}</Typography>
                            </Box>
                          </Box>
                          <Box className="formation-skills">
                            {(formation.skills || []).map((skill, index) => (
                              <Chip key={index} label={skill} size="small" className="skill-chip" />
                            ))}
                          </Box>
                        </CardContent>
                        <CardActions>
                          {isManagerOrHr ? (
                            <Button
                              variant="contained"
                              onClick={() => handleOpenAssign(formation)}
                              startIcon={<GroupAddIcon />}
                              className="request-button"
                              fullWidth
                            >
                              Assign to Employee
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() => handleOpenRequest(formation)}
                              startIcon={<SendIcon />}
                              className="request-button"
                              fullWidth
                            >
                              Request Enrollment
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    </div>
                  </Grid>
                ))
              )}
            </Grid>
          )}

          {tab === 1 && !isManagerOrHr && (
            <Grid container spacing={3}>
              {myFormations.length === 0 ? (
                <Grid item xs={12}>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center", mt: 4 }}>
                    No formations assigned or approved yet. Browse the catalog to request one.
                  </Typography>
                </Grid>
              ) : (
                myFormations.map((mf) => (
                  <Grid item xs={12} md={6} key={mf.id}>
                    <div ref={addCatalogRef}>
                      <Card className="formation-card my-formation-card" elevation={3}>
                        <CardContent>
                          <Box className="formation-header">
                            <Typography variant="h6" className="formation-title">
                              <PlayCircleIcon /> {mf.title}
                            </Typography>
                            <Chip
                              label={mf.status}
                              className={`status-pill ${mf.status === "Terminée" ? "done" : "progress"}`}
                              size="small"
                            />
                          </Box>
                          <Typography variant="body2" className="formation-description">
                            {mf.description}
                          </Typography>
                          <Box className="progress-row">
                            <LinearProgress variant="determinate" value={mf.progress} className="formation-progress-bar" />
                            <Typography variant="body2">{mf.progress}%</Typography>
                          </Box>
                          <Box className="progress-actions">
                            <Button size="small" onClick={() => handleUpdateProgress(mf, Math.min(100, mf.progress + 25))}>
                              +25%
                            </Button>
                            <Button size="small" onClick={() => handleUpdateProgress(mf, 100)} disabled={mf.progress >= 100}>
                              Mark Complete
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </div>
                  </Grid>
                ))
              )}
            </Grid>
          )}

          {tab === 1 && isManagerOrHr && (
            <Grid container spacing={3}>
              {formationRequests.length === 0 ? (
                <Grid item xs={12}>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center", mt: 4 }}>
                    No enrollment requests yet.
                  </Typography>
                </Grid>
              ) : (
                formationRequests.map((req) => {
                  const statusInfo = getStatusChip(req.status);
                  return (
                    <Grid item xs={12} md={6} key={req.id}>
                      <div ref={addCatalogRef}>
                        <Card className="formation-card request-card-item" elevation={3}>
                          <CardContent>
                            <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                              <Avatar src={req.employeeAvatar} sx={{ width: 40, height: 40 }} />
                              <Box flex={1}>
                                <Typography variant="subtitle1" fontWeight={700}>
                                  {req.employeeName}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                                  {req.formationTitle}
                                </Typography>
                              </Box>
                              <Chip
                                icon={statusInfo.icon}
                                label={statusInfo.label}
                                size="small"
                                sx={{ backgroundColor: statusInfo.color, color: "#fff" }}
                              />
                            </Box>
                            <Typography variant="body2" className="formation-description" sx={{ fontStyle: "italic" }}>
                              "{req.motivation}"
                            </Typography>
                          </CardContent>
                          <CardActions>
                            {isHr && req.status === "pending" && (
                              <>
                                <Tooltip title="Review (send to Manager)">
                                  <IconButton onClick={() => handleHrReviewRequest(req.id)} className="action-btn approve-btn">
                                    <CheckCircleIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Reject">
                                  <IconButton onClick={() => handleRejectRequest(req.id)} className="action-btn reject-btn">
                                    <CancelIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            {isManager && req.status === "on-hold" && (
                              <>
                                <Tooltip title="Confirm & Enroll">
                                  <IconButton onClick={() => handleManagerConfirmRequest(req.id)} className="action-btn approve-btn">
                                    <CheckCircleIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Reject">
                                  <IconButton onClick={() => handleRejectRequest(req.id)} className="action-btn reject-btn">
                                    <CancelIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          </CardActions>
                        </Card>
                      </div>
                    </Grid>
                  );
                })
              )}
            </Grid>
          )}
        </>
      )}

      {/* ===== Employee: Request Enrollment Dialog ===== */}
      <Dialog
        open={requestDialogOpen}
        onClose={() => setRequestDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        className="formation-dialog"
        PaperProps={{ className: "formation-dialog-paper" }}
      >
        <DialogTitle className="formation-dialog-title">
          <Box className="dialog-title-icon">
            <SendIcon />
          </Box>
          <Box>
            <Typography variant="h6" className="dialog-title-text">Request Enrollment</Typography>
            <Typography variant="caption" className="dialog-title-sub">{selectedFormation?.title}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent className="formation-dialog-content">
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: 2 }}>
            Explain your motivation. HR will review first, then your Manager gives final confirmation.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Motivation"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            variant="outlined"
            placeholder="Why do you want to join this formation?"
          />
        </DialogContent>
        <DialogActions className="formation-dialog-actions">
          <Button onClick={() => setRequestDialogOpen(false)} className="dialog-cancel-btn">Cancel</Button>
          <Button onClick={handleSubmitRequest} variant="contained" disabled={!motivation.trim()} className="dialog-create-btn">
            Send Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== Manager/HR: Create Formation Dialog ===== */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        className="formation-dialog"
        PaperProps={{ className: "formation-dialog-paper" }}
      >
        <DialogTitle className="formation-dialog-title">
          <Box className="dialog-title-icon">
            <AddIcon />
          </Box>
          <Box>
            <Typography variant="h6" className="dialog-title-text">New Formation</Typography>
            <Typography variant="caption" className="dialog-title-sub">Add a new training program to the catalog</Typography>
          </Box>
        </DialogTitle>
        <DialogContent className="formation-dialog-content">
          <TextField
            fullWidth margin="normal" label="Title" variant="outlined"
            value={newFormation.title}
            onChange={(e) => setNewFormation({ ...newFormation, title: e.target.value })}
          />
          <TextField
            fullWidth margin="normal" label="Description" variant="outlined" multiline rows={3}
            value={newFormation.description}
            onChange={(e) => setNewFormation({ ...newFormation, description: e.target.value })}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth margin="normal" label="Duration" variant="outlined" placeholder="e.g. 40 heures"
                value={newFormation.duration}
                onChange={(e) => setNewFormation({ ...newFormation, duration: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth margin="normal" label="Instructor" variant="outlined"
                value={newFormation.instructor}
                onChange={(e) => setNewFormation({ ...newFormation, instructor: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Level</InputLabel>
                <Select
                  value={newFormation.level} label="Level"
                  onChange={(e) => setNewFormation({ ...newFormation, level: e.target.value })}
                >
                  <MenuItem value="Débutant">Débutant</MenuItem>
                  <MenuItem value="Intermédiaire">Intermédiaire</MenuItem>
                  <MenuItem value="Avancé">Avancé</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth margin="normal" label="Category" variant="outlined"
                value={newFormation.category}
                onChange={(e) => setNewFormation({ ...newFormation, category: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="formation-dialog-actions">
          <Button onClick={() => setCreateDialogOpen(false)} className="dialog-cancel-btn">Cancel</Button>
          <Button onClick={handleCreateFormation} variant="contained" disabled={!newFormation.title.trim()} className="dialog-create-btn">
            Create Formation
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== Manager/HR: Assign to Employee Dialog ===== */}
      <Dialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        className="formation-dialog"
        PaperProps={{ className: "formation-dialog-paper" }}
      >
        <DialogTitle className="formation-dialog-title">
          <Box className="dialog-title-icon assign-icon">
            <GroupAddIcon />
          </Box>
          <Box>
            <Typography variant="h6" className="dialog-title-text">Assign Formation</Typography>
            <Typography variant="caption" className="dialog-title-sub">{assignFormation?.title}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent className="formation-dialog-content">
          <FormControl fullWidth margin="normal">
            <InputLabel>Employee</InputLabel>
            <Select
              value={selectedEmployeeId} label="Employee"
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
            >
              {employees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar src={emp.avatar} sx={{ width: 28, height: 28 }} />
                    <Box>
                      <Typography variant="body2">{emp.name}</Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                        {emp.currentPosition}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className="formation-dialog-actions">
          <Button onClick={() => setAssignDialogOpen(false)} className="dialog-cancel-btn">Cancel</Button>
          <Button onClick={handleAssign} variant="contained" disabled={!selectedEmployeeId} className="dialog-create-btn">
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Formations;