import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Chip, 
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import './add-skills.css';

const AddSkills = () => {
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState(3);
  const [skillCategory, setSkillCategory] = useState('');
  const [description, setDescription] = useState('');
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'Technique',
    'Communication',
    'Leadership',
    'Gestion de projet',
    'Créativité',
    'Analyse',
    'Langues',
    'Outils'
  ];

  const handleAddSkill = () => {
    if (newSkill.trim() && skillCategory) {
      const skill = {
        id: Date.now(),
        name: newSkill.trim(),
        level: skillLevel,
        category: skillCategory,
        description: description.trim(),
        status: 'En attente'
      };
      
      setSuggestedSkills([...suggestedSkills, skill]);
      setNewSkill('');
      setSkillLevel(3);
      setSkillCategory('');
      setDescription('');
    }
  };

  const handleRemoveSkill = (skillId) => {
    setSuggestedSkills(suggestedSkills.filter(skill => skill.id !== skillId));
  };

  const handleSubmitSuggestions = () => {
    if (suggestedSkills.length > 0) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSuggestedSkills([]);
      }, 3000);
    }
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
      <Header title="AJOUTER COMPÉTENCES" subtitle="Suggérer l'ajout de nouvelles compétences à votre profil" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper className="add-skill-form" elevation={3}>
                <Typography variant="h5" className="form-title">
                  Nouvelle Compétence
                </Typography>
                
                <Box className="form-fields">
                  <TextField
                    fullWidth
                    label="Nom de la compétence"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    variant="outlined"
                    className="skill-input"
                  />

                  <FormControl fullWidth className="category-select">
                    <InputLabel>Catégorie</InputLabel>
                    <Select
                      value={skillCategory}
                      onChange={(e) => setSkillCategory(e.target.value)}
                      label="Catégorie"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box className="skill-level">
                    <Typography variant="body1">Niveau de maîtrise</Typography>
                    <Rating
                      value={skillLevel}
                      onChange={(event, newValue) => setSkillLevel(newValue)}
                      max={5}
                      size="large"
                    />
                    <Typography variant="body2" color="textSecondary">
                      {skillLevel}/5
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    label="Description (optionnel)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    multiline
                    rows={3}
                    className="description-input"
                  />

                  <Button
                    variant="contained"
                    onClick={handleAddSkill}
                    startIcon={<AddIcon />}
                    className="add-button"
                    disabled={!newSkill.trim() || !skillCategory}
                  >
                    Ajouter à la liste
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper className="suggestions-list" elevation={3}>
                <Typography variant="h5" className="form-title">
                  Compétences Suggérées ({suggestedSkills.length})
                </Typography>
                
                <AnimatePresence>
                  {suggestedSkills.length === 0 ? (
                    <Typography variant="body1" className="empty-message">
                      Aucune compétence suggérée pour le moment
                    </Typography>
                  ) : (
                    <Box className="skills-list">
                      {suggestedSkills.map((skill) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="skill-suggestion"
                        >
                          <Box className="skill-info">
                            <Typography variant="h6">{skill.name}</Typography>
                            <Chip label={skill.category} size="small" className="category-chip" />
                            <Box className="skill-rating">
                              <Rating value={skill.level} readOnly size="small" />
                              <Typography variant="body2">({skill.level}/5)</Typography>
                            </Box>
                            {skill.description && (
                              <Typography variant="body2" className="skill-description">
                                {skill.description}
                              </Typography>
                            )}
                          </Box>
                          <Button
                            onClick={() => handleRemoveSkill(skill.id)}
                            className="remove-button"
                            size="small"
                          >
                            <DeleteIcon />
                          </Button>
                        </motion.div>
                      ))}
                    </Box>
                  )}
                </AnimatePresence>

                {suggestedSkills.length > 0 && (
                  <Button
                    variant="contained"
                    onClick={handleSubmitSuggestions}
                    startIcon={<SendIcon />}
                    className="submit-button"
                    fullWidth
                  >
                    Soumettre les suggestions
                  </Button>
                )}
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
                Suggestions envoyées avec succès !
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Box>
  );
};

export default AddSkills;
