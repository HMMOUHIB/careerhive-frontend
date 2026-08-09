import React from 'react';
import { Box, Typography, Paper, Grid, Chip, Rating, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import Header from "../../components/Header";
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './evaluations.css';

const Evaluations = () => {
  // Sample evaluation data
  const evaluations = [
    {
      id: 1,
      date: '2024-01-15',
      evaluator: 'Marie Dubois',
      role: 'Manager',
      period: 'Q4 2023',
      overallRating: 4.5,
      competences: [
        { name: 'Communication', rating: 5, validated: true },
        { name: 'Leadership', rating: 4, validated: true },
        { name: 'Technique', rating: 4.5, validated: true },
        { name: 'Innovation', rating: 4, validated: false }
      ],
      feedback: 'Excellent travail cette année. Très bon leadership et communication avec l\'équipe.',
      objectives: [
        { name: 'Améliorer les compétences techniques', progress: 85, completed: false },
        { name: 'Développer le leadership', progress: 100, completed: true },
        { name: 'Formation en gestion de projet', progress: 60, completed: false }
      ]
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
      <Header title="MES ÉVALUATIONS" subtitle="Suivre ses évaluations et compétences" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {evaluations.map((evaluation) => (
            <Grid item xs={12} key={evaluation.id}>
              <motion.div variants={itemVariants}>
                <Paper className="evaluation-card" elevation={3}>
                  <Box className="evaluation-header">
                    <Box className="evaluation-info">
                      <Typography variant="h5" className="evaluation-title">
                        <AssessmentIcon /> Évaluation {evaluation.period}
                      </Typography>
                      <Box className="evaluation-meta">
                        <Chip 
                          icon={<DateRangeIcon />} 
                          label={new Date(evaluation.date).toLocaleDateString('fr-FR')}
                          variant="outlined"
                          size="small"
                        />
                        <Chip 
                          icon={<PersonIcon />} 
                          label={`${evaluation.evaluator} - ${evaluation.role}`}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    </Box>
                    <Box className="overall-rating">
                      <Typography variant="h6">Note Globale</Typography>
                      <Rating value={evaluation.overallRating} readOnly precision={0.5} />
                      <Typography variant="h4" color="primary">
                        {evaluation.overallRating}/5
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box className="competences-section">
                        <Typography variant="h6" className="section-title">
                          Compétences Évaluées
                        </Typography>
                        {evaluation.competences.map((comp, index) => (
                          <Box key={index} className="competence-item">
                            <Box className="competence-header">
                              <Typography variant="body1">{comp.name}</Typography>
                              {comp.validated && <CheckCircleIcon className="validated-icon" />}
                            </Box>
                            <Box className="competence-rating">
                              <Rating value={comp.rating} readOnly precision={0.5} size="small" />
                              <Typography variant="body2">{comp.rating}/5</Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box className="objectives-section">
                        <Typography variant="h6" className="section-title">
                          Objectifs
                        </Typography>
                        {evaluation.objectives.map((obj, index) => (
                          <Box key={index} className="objective-item">
                            <Box className="objective-header">
                              <Typography variant="body1">{obj.name}</Typography>
                              {obj.completed && <CheckCircleIcon className="completed-icon" />}
                            </Box>
                            <Box className="objective-progress">
                              <LinearProgress 
                                variant="determinate" 
                                value={obj.progress} 
                                className="progress-bar"
                              />
                              <Typography variant="body2">{obj.progress}%</Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>

                  <Box className="feedback-section">
                    <Typography variant="h6" className="section-title">
                      Retours du Manager
                    </Typography>
                    <Typography variant="body1" className="feedback-text">
                      {evaluation.feedback}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Evaluations;
