import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Chip, 
  LinearProgress,
  Card,
  CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from "../../components/Header";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './skills-evolution.css';

const SkillsEvolution = () => {
  const formations = [
    {
      id: 1,
      title: 'Formation React Avancé',
      date: '2024-01-15',
      status: 'Terminée',
      progress: 100,
      skills: ['React', 'JavaScript', 'Redux']
    },
    {
      id: 2,
      title: 'Leadership et Management',
      date: '2024-02-20',
      status: 'En cours',
      progress: 75,
      skills: ['Leadership', 'Communication', 'Gestion équipe']
    }
  ];

  const achievements = [
    {
      date: '2024-01-20',
      title: 'Certification React Developer',
      type: 'certification',
      description: 'Obtention de la certification React Developer avec mention'
    },
    {
      date: '2024-02-15',
      title: 'Promotion Team Lead',
      type: 'promotion',
      description: 'Promotion au poste de Team Lead Frontend'
    }
  ];

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
      <Header title="ÉVOLUTION COMPÉTENCES" subtitle="Suivre l'évolution de ses compétences et formations" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {/* Formations */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper className="formations-section" elevation={3}>
                <Typography variant="h5" className="section-title">
                  <SchoolIcon /> Formations Suivies
                </Typography>
                <Box className="formations-list">
                  {formations.map((formation) => (
                    <Card key={formation.id} className="formation-card">
                      <CardContent>
                        <Box className="formation-header">
                          <Typography variant="h6" className="formation-title">
                            {formation.title}
                          </Typography>
                          <Chip 
                            label={formation.status}
                            className={`status-chip ${formation.status.toLowerCase().replace(' ', '-')}`}
                            size="small"
                          />
                        </Box>
                        <Typography variant="body2" className="formation-date">
                          {new Date(formation.date).toLocaleDateString('fr-FR')}
                        </Typography>
                        <Box className="formation-progress">
                          <LinearProgress 
                            variant="determinate" 
                            value={formation.progress} 
                            className="progress-bar"
                          />
                          <Typography variant="body2">{formation.progress}%</Typography>
                        </Box>
                        <Box className="formation-skills">
                          {formation.skills.map((skill, index) => (
                            <Chip key={index} label={skill} size="small" className="skill-chip" />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Achievements */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper className="achievements-section" elevation={3}>
                <Typography variant="h5" className="section-title">
                  <EmojiEventsIcon /> Réalisations
                </Typography>
                <Box className="achievements-list">
                  {achievements.map((achievement, index) => (
                    <Box key={index} className="achievement-item">
                      <Box className={`timeline-dot ${achievement.type}`} />
                      <Box className="achievement-content">
                        <Typography variant="h6" className="achievement-title">
                          {achievement.title}
                        </Typography>
                        <Typography variant="body2" className="achievement-date">
                          {new Date(achievement.date).toLocaleDateString('fr-FR')}
                        </Typography>
                        <Typography variant="body2" className="achievement-description">
                          {achievement.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default SkillsEvolution;
