import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import useStyles from '../../utils/website/styles';

const CheckoutWizard = ({ activeStep = 0 }) => {
  const classes = useStyles();
  return (
    <Stepper
      className={classes.transparentBackground}
      activeStep={activeStep}
      alternativeLabel
    >
      {[
        'Login',
        'Household details',
        'Location details',
        'Payment option',
        'Place Order',
      ].map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutWizard;
