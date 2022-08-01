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

const Household = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const mainSourcesOfLiving = [
    'Begging',
    'Ganyu',
    'Petty Trading',
    'Formal Employment',
    'Informal Employment',
    'Remittances',
    'Pension',
    'Subsistence Farming',
  ];
  const {
    userInfo,
    dashboardHouseholdHeadDetails,
    dashboardHouseholdDetails,
  } = state;

  const {
    registrationHouseholdName,
    registrationPlotNumber,
    registrationHomeOwnershipStatus,
    registrationLatrineType,
    registrationIncomeRange,
    registrationSourceOfLivelihood,
    registrationPovertyStatus,
    registrationVulnerabilityStatus
  } = dashboardHouseholdDetails;

  const router = useRouter();
  useEffect(() => {
    dispatch({ type: 'HERO_IMAGE_OFF' });
    dispatch({
      type: 'SET_DASHBOARD_TITLE',
      payload: 'Enrollment | registration',
    });
    // if (!userInfo) {
    //   router.push('/login?redirect=/household');
    // }
    
    if (!dashboardHouseholdHeadDetails) {
      router.push('/dashboard/register');
    }

    setValue('registrationHouseholdName', dashboardHouseholdDetails.registrationHouseholdName);
    setValue('registrationPlotNumber', dashboardHouseholdDetails.registrationPlotNumber);
    setValue('registrationHomeOwnershipStatus', dashboardHouseholdDetails.registrationHomeOwnershipStatus);
    setValue('registrationLatrineType', dashboardHouseholdDetails.registrationLatrineType);
    setValue('registrationIncomeRange', dashboardHouseholdDetails.registrationIncomeRange );
    setValue('registrationSourceOfLivelihood', dashboardHouseholdDetails.registrationSourceOfLivelihood);
    setValue('registrationPovertyStatus', dashboardHouseholdDetails.registrationPovertyStatus);
    setValue('registrationVulnerabilityStatus', dashboardHouseholdDetails.registrationVulnerabilityStatus);
  }, []);

  const classes = useStyles();
  
  const submitHandler = ({
    registrationHouseholdName,
    registrationPlotNumber,
    registrationHomeOwnershipStatus,
    registrationLatrineType,
    registrationIncomeRange,
    registrationSourceOfLivelihood,
    registrationPovertyStatus,
    registrationVulnerabilityStatus,
  }) => {
    dispatch({
      type: 'SAVE_DASHBOARD_HOUSEHOLD_DETAILS',
      payload: {
        registrationHouseholdName,
        registrationPlotNumber,
        registrationHomeOwnershipStatus,
        registrationLatrineType,
        registrationIncomeRange,
        registrationSourceOfLivelihood,
        registrationPovertyStatus,
        registrationVulnerabilityStatus,
      },
    });
    Cookies.set(
      'dashboardHouseholdDetails',
      JSON.stringify({
        registrationHouseholdName,
        registrationPlotNumber,
        registrationHomeOwnershipStatus,
        registrationLatrineType,
        registrationIncomeRange,
        registrationSourceOfLivelihood,
        registrationPovertyStatus,
        registrationVulnerabilityStatus,
      })
    );
    router.push('/dashboard/location');
  };

  return (
    <Layout title='Household details'>
      <div className={classes.checkoutWizard}></div>
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <List>
          <ListItem>
            <Controller
              name='registrationHouseholdName'
              control={control}
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationHouseholdName'
                  label='Household name (eg. The Bandas)'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  error={Boolean(errors.registrationHouseholdName)}
                  helperText={
                    errors.registrationHouseholdName
                      ? errors.registrationHouseholdName.type === 'minLength'
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
              name='registrationPlotNumber'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationPlotNumber'
                  label='Plot number'
                  variant='outlined'
                  fullWidth
                  error={Boolean(errors.registrationPlotNumber)}
                  helperText={
                    errors.registrationPlotNumber
                      ? errors.registrationPlotNumber.type === 'minLength'
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
              name='registrationHomeOwnershipStatus'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationHomeOwnershipStatus'
                  label='Select home ownership status'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.registrationHomeOwnershipStatus)}
                  helperText={
                    errors.registrationHomeOwnershipStatus &&
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
              name='registrationLatrineType'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationLatrineType'
                  label='Select current household latrine type'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.registrationLatrineType)}
                  helperText={
                    errors.registrationLatrineType &&
                    'Current household currentLatrineType type is required'
                  }
                  {...field}
                >
                  <MenuItem value='No latrine'>No latrine</MenuItem>
                  <MenuItem value='Flush Toilet'>Flush Toilet</MenuItem>
                  <MenuItem value='VIP latrine'>VIP latrine</MenuItem>
                  <MenuItem value='Latrine with Roof'>
                    Latrine with Roof
                  </MenuItem>
                  <MenuItem value='Latrine Without Roof'>
                    Latrine Without Roof
                  </MenuItem>
                  <MenuItem value='Shared latrine with neighbors'>
                    Shared latrine with neighbors
                  </MenuItem>
                </TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='registrationIncomeRange'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationIncomeRange'
                  label='Select avarage monthly income range'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.registrationIncomeRange)}
                  helperText={
                    errors.registrationIncomeRange &&
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
              name='registrationPovertyStatus'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationPovertyStatus'
                  label='Is household poor?'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.registrationPovertyStatus)}
                  helperText={errors.registrationPovertyStatus && 'Is household poor? is required'}
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
              name='registrationSourceOfLivelihood'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationSourceOfLivelihood'
                  label='Select main source of living'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.registrationSourceOfLivelihood)}
                  helperText={
                    errors.registrationSourceOfLivelihood &&
                    'Structure Location Zone is required'
                  }
                  {...field}
                >
                  {mainSourcesOfLiving.map((mainSourceOfLiving) => (
                    <MenuItem
                      key={mainSourceOfLiving}
                      value={mainSourceOfLiving}
                    >
                      {mainSourceOfLiving}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='registrationVulnerabilityStatus'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationVulnerabilityStatus'
                  label='Is household vulnerable?'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.registrationVulnerabilityStatus)}
                  helperText={
                    errors.registrationVulnerabilityStatus &&
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
          <ListItem>
            <Button
              type='button'
              variant='contained'
              color='secondary'
              fullWidth
              onClick={() => router.push('/dashboard/register')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Household;
