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
import Layout from '../components/website/Layout';
import useStyles from '../utils/website/styles';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/website/CheckoutWizard';


const Payment = () => {
  const paymentOptions = [
    'Bank transfer',
    'Back deposit',
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

  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { paymentMethod, location},
  } = state;
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/payment');
    }
    if (!location) {
      router.push('/location');
    }
    setValue('paymentOption', paymentMethod.paymentOption);
    setValue('willPayFullForOSS', paymentMethod.willPayFullForOSS);
  }, []);

  const classes = useStyles();
  const submitHandler = ({ paymentOption, willPayFullForOSS }) => {
    dispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: { paymentOption, willPayFullForOSS },
    });
    Cookies.set(
      'paymentMethod',
      JSON.stringify({ paymentOption, willPayFullForOSS })
    );
    router.push('/placeorder');
  };

  return (
    <Layout title='Payment details'>
      <div className={classes.checkoutWizard}></div>
      <CheckoutWizard activeStep={3} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component='h1' variant='h4'>
          Payment details
        </Typography>
        <List>
          <ListItem>
            <Controller
              name='paymentOption'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='paymentOption'
                  label='Select Payment Option'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.paymentOption)}
                  helperText={
                    errors.paymentOption && 'Payment Option is required'
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
              name='willPayFullForOSS'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='willPayFullForOSS'
                  label='Select Payment Option'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.paymentOption)}
                  helperText={
                    errors.paymentOption && 'Payment Option is required'
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
              onClick={() => router.push('/location')}
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
