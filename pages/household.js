import React, { useContext, useEffect } from 'react';
import { Button, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import Layout from '../components/website/Layout';
import useStyles from '../utils/website/styles';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/website/CheckoutWizard';

const Household = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { householdDetails },
  } = state;
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/household');
    }
    setValue('householdName', householdDetails.householdName);
    setValue('plotNumber', householdDetails.plotNumber);
    setValue('homeOwnershipStatus', householdDetails.homeOwnershipStatus);
    setValue('latrine', householdDetails.latrine);
    setValue(
      'avarageMonthlyIncomeRange',
      householdDetails.avarageMonthlyIncomeRange
    );
    setValue('isPoor', householdDetails.isPoor);
    setValue('isVulnerable', householdDetails.isVulnerable);
  }, []);

  const classes = useStyles();
  const submitHandler = ({
    householdName,
    plotNumber,
    homeOwnershipStatus,
    latrine,
    avarageMonthlyIncomeRange,
    isPoor,
    isVulnerable,
  }) => {
    dispatch({
      type: 'SAVE_HOUSEHOLD_DETAILS',
      payload: {
        householdName,
        plotNumber,
        homeOwnershipStatus,
        latrine,
        avarageMonthlyIncomeRange,
        isPoor,
        isVulnerable
      },
    });
    Cookies.set(
      'householdDetails',
      JSON.stringify({
        householdName,
        plotNumber,
        homeOwnershipStatus,
        latrine,
        avarageMonthlyIncomeRange,
        isPoor,
        isVulnerable,
    })
    );
    router.push('/location');
  };

  return (
    <Layout title='Household details'>
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component='h1' variant='h4'>
          Household details
        </Typography>
        <List>
          <ListItem>
            <Controller
              name='householdName'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  id='householdName'
                  label='Household name (eg. The Bandas)'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  error={Boolean(errors.householdName)}
                  helperText={
                    errors.householdName
                      ? errors.householdName.type === 'minLength'
                        ? 'Household name should have at least 3 characters'
                        : 'Household name is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='plotNumber'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id='plotNumber'
                  label='Plot number'
                  variant='outlined'
                  fullWidth
                  error={Boolean(errors.plotNumber)}
                  helperText={
                    errors.plotNumber
                      ? errors.plotNumber.type === 'minLength'
                        ? 'Plot number should have at least 2 characters'
                        : 'Plot number is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='homeOwnershipStatus'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='homeOwnershipStatus'
                  label='Select home ownership status'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.homeOwnershipStatus)}
                  helperText={
                    errors.homeOwnershipStatus &&
                    'Home ownership status is required'
                  }
                  {...field}
                >
                  <MenuItem value='Owned'>Owned</MenuItem>
                  <MenuItem value='Being Purchased'>Being Purchased</MenuItem>
                  <MenuItem value='Employer Provided'>
                    Employer Provided
                  </MenuItem>
                  <MenuItem value='Free and Authorised'>
                    Free and Authorised
                  </MenuItem>
                  <MenuItem value='Free NOT Authorised'>
                    Free NOT Authorised
                  </MenuItem>
                  <MenuItem value='Rented'>Rented</MenuItem>
                </TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='latrine'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='latrine'
                  label='Select current household latrine type'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.latrine)}
                  helperText={
                    errors.latrine &&
                    'Current household latrine type is required'
                  }
                  {...field}
                >
                  <MenuItem value='No Latrine'>No Latrine</MenuItem>
                  <MenuItem value='Flush Toilet'>Flush Toilet</MenuItem>
                  <MenuItem value='VIP Latrine'>VIP Latrine</MenuItem>
                  <MenuItem value='Latrine with Roof'>
                    Latrine with Roof
                  </MenuItem>
                  <MenuItem value='Latrine Without Roof'>
                    Latrine Without Roof
                  </MenuItem>
                  <MenuItem value='Shared Latrine with neighbors'>
                    Shared Latrine with neighbors
                  </MenuItem>
                </TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='avarageMonthlyIncomeRange'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='avarageMonthlyIncomeRange'
                  label='Select avarage monthly income range'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.avarageMonthlyIncomeRange)}
                  helperText={
                    errors.avarageMonthlyIncomeRange &&
                    'Avarage monthly income range is required'
                  }
                  {...field}
                >
                  <MenuItem value='At most MK10 000'>At most MK10 000</MenuItem>
                  <MenuItem value='At most MK30 000'>At most MK30 000</MenuItem>
                  <MenuItem value='At most MK50 000'>At most MK50 000</MenuItem>
                  <MenuItem value='At most MK100 000'>
                    At most MK100 000
                  </MenuItem>
                  <MenuItem value='Above MK100 000'>Above MK100 000</MenuItem>
                </TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='isPoor'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='isPoor'
                  label='Is household poor?'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.isPoor)}
                  helperText={errors.isPoor && 'Is household poor? is required'}
                  {...field}
                >
                  <MenuItem value='Yes'>YES</MenuItem>
                  <MenuItem value='No'>NO</MenuItem>
                </TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='isVulnerable'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='isVulnerable'
                  label='Is household vulnerable?'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.isVulnerable)}
                  helperText={
                    errors.isVulnerable &&
                    'Is household vulnerable? is required'
                  }
                  {...field}
                >
                  <MenuItem value='Yes'>YES</MenuItem>
                  <MenuItem value='No'>NO</MenuItem>
                </TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Button variant='contained' type='submit' fullWidth color='primary'>
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Household;
