import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import useStyles from '../../utils/website/styles';

const EnrollmentWizard = ({ activeStep = 0 }) => {
  const classes = useStyles();
  return (
    <Stepper
      className={classes.transparentBackground}
      activeStep={activeStep}
      alternativeLabel
    >
      {[
        'Select households',
        'Allocate contractor',
        'Create contracts',
      ].map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default EnrollmentWizard;
