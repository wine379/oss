import React, { useContext, useEffect } from 'react';
import {
  Button,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import Layout from '../../components/dashboard/Layout';
import useStyles from '../../utils/website/styles';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../../components/dashboard/CheckoutWizard';

const Payment = () => {
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    dashboardTechnologyChoice,
    dashboardPaymentDetails,
  } = state;
  const {registrationPaymentOption, registrationWillPayInFull} = dashboardPaymentDetails;


  const paymentOptions = [
    'Bank transfer',
    'Bank deposit',
    'Cash',
    'Airtel money',
    'TNM mpamba',
  ];
  const willPayFullForOSSs = ['Yes', 'No'];

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: 'HERO_IMAGE_OFF' });
    dispatch({
      type: 'SET_DASHBOARD_TITLE',
      payload: 'Enrollment | registration',
    });
    // if (!userInfo) {
    //   router.push('/login?redirect=/payment');
    // }
    if (!dashboardTechnologyChoice) {
      router.push('/dashboard/choosetechnology');
    }
    setValue('registrationPaymentOption', dashboardPaymentDetails.registrationPaymentOption);
    setValue('registrationWillPayInFull', dashboardPaymentDetails.registrationWillPayInFull);
  }, []);

  const classes = useStyles();

  const submitHandler = ({ registrationPaymentOption, registrationWillPayInFull }) => {

    
    dispatch({
      type: 'SAVE_DASHBOARD_REGISTRATION_PAYMENT_DETAILS',
      payload: { registrationPaymentOption, registrationWillPayInFull },
    });
    Cookies.set(
      'dashboardPaymentDetails',
      JSON.stringify({ registrationPaymentOption, registrationWillPayInFull  })
    );

    router.push('/dashboard/enrollhousehold');
  };



  return (
    <Layout title='Payment details'>
      <div className={classes.checkoutWizard}></div>
      <CheckoutWizard activeStep={4} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component='h1' variant='h4'>
          Payment details
        </Typography>
        <List>
          <ListItem>
            <Controller
              name='registrationPaymentOption'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationPaymentOption'
                  label='Select Payment Option'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.registrationPaymentOption)}
                  helperText={
                    errors.registrationPaymentOption && 'Payment Option is required'
                  }
                  {...field}
                >
                  {paymentOptions.map((paymentOption) => (
                    <MenuItem key={paymentOption} value={paymentOption}>
                      {paymentOption}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='registrationWillPayInFull'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationWillPayInFull'
                  label='Will pay full for OSS service?'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.registrationWillPayInFull)}
                  helperText={
                    errors.registrationWillPayInFull && 'Payment Option is required'
                  }
                  {...field}
                >
                  {willPayFullForOSSs.map((willPayFullForOSS) => (
                    <MenuItem key={willPayFullForOSS} value={willPayFullForOSS}>
                      {willPayFullForOSS}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Button variant='contained' type='submit' fullWidth color='primary'>
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              type='button'
              variant='contained'
              color='secondary'
              fullWidth
              onClick={() => router.push('/dashboard/choosetechnology')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Payment;
