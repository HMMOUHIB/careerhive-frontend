import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Header from "../../components/Header";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SendIcon from '@mui/icons-material/Send';
import './promotion-request.css';

const PromotionRequest = () => {
  const [formData, setFormData] = useState({
    currentPosition: 'Développeur Frontend',
    desiredPosition: '',
    department: '',
    justification: '',
    achievements: '',
    skills: [],
    timeline: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const availablePositions = [
    'Senior Développeur Frontend',
    'Lead Développeur',
    'Architecte Frontend',
    'Manager Technique',
    'Chef de Projet',
    'Product Owner',
    'Scrum Master'
  ];

  const departments = [
    'Développement',
    'Product',
    'Design',
    'Data',
    'DevOps',
    'Management'
  ];

  const skillsList = [
    'Leadership', 'Gestion équipe', 'Communication', 'Technique avancée',
    'Gestion projet', 'Mentorat', 'Innovation', 'Stratégie',
    'Architecture', 'Formation', 'Négociation', 'Analyse'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = () => {
    console.log('Promotion request submitted:', formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        currentPosition: 'Développeur Frontend',
        desiredPosition: '',
        department: '',
        justification: '',
        achievements: '',
        skills: [],
        timeline: ''
      });
    }, 3000);
  };

  const isFormValid = () => {
    return formData.desiredPosition && 
           formData.department && 
           formData.justification.trim() && 
           formData.achievements.trim() &&
           formData.skills.length > 0;
  };

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
    <Box m="20px">
      <Header title="DEMANDER PROMOTION" subtitle="Soumettre une demande de changement de poste" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <motion.div variants={itemVariants}>
              <Paper className="promotion-form" elevation={3}>
                <Typography variant="h5" className="form-title">
                  <WorkOutlineIcon /> Demande de Promotion
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Poste Actuel"
                      value={formData.currentPosition}
                      disabled
                      variant="outlined"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Poste Souhaité</InputLabel>
                      <Select
                        value={formData.desiredPosition}
                        onChange={(e) => handleInputChange('desiredPosition', e.target.value)}
                        label="Poste Souhaité"
                      >
                        {availablePositions.map((position) => (
                          <MenuItem key={position} value={position}>
                            {position}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Département</InputLabel>
                      <Select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        label="Département"
                      >
                        {departments.map((dept) => (
                          <MenuItem key={dept} value={dept}>
                            {dept}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Délai Souhaité"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      variant="outlined"
                      placeholder="Ex: Dans les 3 prochains mois"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Justification"
                      value={formData.justification}
                      onChange={(e) => handleInputChange('justification', e.target.value)}
                      variant="outlined"
                      multiline
                      rows={4}
                      placeholder="Expliquez pourquoi vous méritez cette promotion..."
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Réalisations et Contributions"
                      value={formData.achievements}
                      onChange={(e) => handleInputChange('achievements', e.target.value)}
                      variant="outlined"
                      multiline
                      rows={4}
                      placeholder="Décrivez vos principales réalisations..."
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" className="skills-title">
                      Compétences Pertinentes
                    </Typography>
                    <Box className="skills-selection">
                      {skillsList.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          onClick={() => handleSkillToggle(skill)}
                          className={`skill-chip ${formData.skills.includes(skill) ? 'selected' : ''}`}
                          variant={formData.skills.includes(skill) ? 'filled' : 'outlined'}
                        />
                      ))}
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={!isFormValid()}
                      startIcon={<SendIcon />}
                      className="submit-button"
                      fullWidth
                      size="large"
                    >
                      Soumettre la Demande
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} lg={4}>
            <motion.div variants={itemVariants}>
              <Paper className="tips-section" elevation={3}>
                <Typography variant="h6" className="tips-title">
                  Conseils pour votre demande
                </Typography>
                <Box className="tips-list">
                  <Typography variant="body2" className="tip-item">
                    📝 Soyez spécifique sur vos réalisations
                  </Typography>
                  <Typography variant="body2" className="tip-item">
                    📊 Mentionnez des résultats mesurables
                  </Typography>
                  <Typography variant="body2" className="tip-item">
                    🎯 Alignez votre demande avec les objectifs
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
            >
              <Alert severity="success" className="success-alert">
                Demande envoyée avec succès !
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Box>
  );
};

export default PromotionRequest;
