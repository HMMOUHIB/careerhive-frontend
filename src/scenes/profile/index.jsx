import {
  Box,
  Typography,
  useTheme,
  TextField,
  Avatar,
  Grid,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";
import { useProfile } from "../../context/ProfileContext";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useState, useRef } from "react";
import "./profile.css";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    profileData,
    updateProfileData,
    updateProfilePhoto,
    updateCoverPhoto,
    addSkill,
    removeSkill,
    addCertificate,
    removeCertificate,
    saving,
    saveError,
  } = useProfile();

  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(profileData);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [newCertInput, setNewCertInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const handleEditToggle = () => {
    setTempData(profileData);
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    await updateProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handlePhotoClick = () => fileInputRef.current.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfilePhoto(reader.result);
        if (isEditing) setTempData({ ...tempData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverClick = () => coverInputRef.current.click();

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCoverPhoto(reader.result);
        if (isEditing) setTempData({ ...tempData, coverPhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim()) {
      addSkill(newSkillInput.trim());
      setNewSkillInput("");
    }
  };

  const handleAddCertificate = () => {
    if (newCertInput.trim()) {
      addCertificate(newCertInput.trim());
      setNewCertInput("");
    }
  };

  const infoRow = (Icon, name, value, editable = true) => (
    <Box className="info-row">
      <Icon className="info-icon" />
      {isEditing && editable ? (
        <TextField
          name={name}
          value={tempData[name] || ""}
          onChange={handleInputChange}
          variant="standard"
          fullWidth
        />
      ) : (
        <Typography className="info-value">{value || "—"}</Typography>
      )}
    </Box>
  );

  return (
    <Box m="20px">
      <Header title="PROFILE" subtitle="Manage Your Profile Information" />

      <Box className="profile-shell">
        {/* Cover photo */}
        <Box
          className="profile-cover"
          style={
            profileData.coverPhoto
              ? {
                  backgroundImage: `url(${profileData.coverPhoto})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          {!profileData.coverPhoto && <Box className="cover-gradient" />}

          <Box className="cover-edit-layer" />

          <Box className="cover-camera-badge" onClick={handleCoverClick}>
            <PhotoCameraIcon fontSize="small" />
            <input
              type="file"
              ref={coverInputRef}
              onChange={handleCoverChange}
              style={{ display: "none" }}
              accept="image/*"
            />
          </Box>

          <Box className="avatar-float" onClick={handlePhotoClick}>
            <Avatar src={profileData.profilePhoto} alt="Profile" className="avatar-img" />
            <Box className="avatar-hover">
              <PhotoCameraIcon fontSize="small" />
            </Box>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              style={{ display: "none" }}
              accept="image/*"
            />
          </Box>
        </Box>

        {/* Name + position + edit controls */}
        <Box className="profile-name-bar">
          <Box className="profile-name-block">
            {isEditing ? (
              <Box display="flex" gap={1} flexWrap="wrap">
                <TextField
                  name="firstName"
                  label="First Name"
                  value={tempData.firstName}
                  onChange={handleInputChange}
                  size="small"
                  variant="outlined"
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={tempData.lastName}
                  onChange={handleInputChange}
                  size="small"
                  variant="outlined"
                />
              </Box>
            ) : (
              <Typography variant="h2" className="profile-name">
                {profileData.firstName} {profileData.lastName}
              </Typography>
            )}
            {isEditing ? (
              <TextField
                name="position"
                value={tempData.position}
                onChange={handleInputChange}
                size="small"
                variant="standard"
                placeholder="Position"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography variant="h5" className="profile-position">
                {profileData.position || "Add your position"}
              </Typography>
            )}
          </Box>

          <Box className="profile-actions">
            {isEditing ? (
              <>
                <IconButton onClick={handleSave} disabled={saving} className="action-btn save-btn">
                  {saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                </IconButton>
                <IconButton onClick={handleCancel} className="action-btn cancel-btn">
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <IconButton onClick={handleEditToggle} className="action-btn edit-btn">
                <EditIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        {saveError && <Typography className="save-error">{saveError}</Typography>}

        <Grid container spacing={3} className="profile-grid">
          {/* Personal Information */}
          <Grid item xs={12} md={6}>
            <Box className="glass-card">
              <Typography variant="h5" className="card-title">
                Personal Information
              </Typography>
              {infoRow(EmailIcon, "email", profileData.email, false)}
              {infoRow(PhoneIcon, "phone", profileData.phone)}
              {infoRow(LocationOnIcon, "location", profileData.location)}
            </Box>
          </Grid>

          {/* Professional Information */}
          <Grid item xs={12} md={6}>
            <Box className="glass-card">
              <Typography variant="h5" className="card-title">
                Professional Information
              </Typography>
              {infoRow(WorkIcon, "department", profileData.department)}
              {infoRow(SchoolIcon, "education", profileData.education)}
            </Box>
          </Grid>

          {/* Bio */}
          <Grid item xs={12}>
            <Box className="glass-card">
              <Typography variant="h5" className="card-title">
                Bio
              </Typography>
              {isEditing ? (
                <TextField
                  name="bio"
                  value={tempData.bio}
                  onChange={handleInputChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                />
              ) : (
                <Typography className="bio-text">
                  {profileData.bio || "Tell people about yourself..."}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Skills */}
          <Grid item xs={12} md={6}>
            <Box className="glass-card">
              <Typography variant="h5" className="card-title">
                Skills
              </Typography>
              <Box className="chip-row">
                {(profileData.skills || []).length === 0 ? (
                  <Typography className="empty-text">No skills added yet</Typography>
                ) : (
                  profileData.skills.map((skill) => (
                    <Box key={skill.id} className="glow-chip">
                      {skill.name}
                      {isEditing && (
                        <CancelIcon
                          className="chip-remove"
                          onClick={() => removeSkill(skill.id)}
                        />
                      )}
                    </Box>
                  ))
                )}
              </Box>
              {isEditing && (
                <Box className="add-item-row">
                  <TextField
                    className="add-item-input"
                    size="small"
                    placeholder="Add a skill..."
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button className="add-item-btn" onClick={handleAddSkill}>
                    Add
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Certificates */}
          <Grid item xs={12} md={6}>
            <Box className="glass-card">
              <Typography variant="h5" className="card-title">
                Certificates
              </Typography>
              {(profileData.certificates || []).length === 0 ? (
                <Typography className="empty-text">No certificates added yet</Typography>
              ) : (
                profileData.certificates.map((cert) => (
                  <Box key={cert.id} className="cert-line">
                    <span>• {cert.name}</span>
                    {isEditing && (
                      <CancelIcon
                        className="chip-remove"
                        onClick={() => removeCertificate(cert.id)}
                      />
                    )}
                  </Box>
                ))
              )}
              {isEditing && (
                <Box className="add-item-row">
                  <TextField
                    className="add-item-input"
                    size="small"
                    placeholder="Add a certificate..."
                    value={newCertInput}
                    onChange={(e) => setNewCertInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCertificate();
                      }
                    }}
                  />
                  <Button className="add-item-btn" onClick={handleAddCertificate}>
                    Add
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;