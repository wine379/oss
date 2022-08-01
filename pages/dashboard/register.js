import React, { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import Layout from '../../components/dashboard/Layout';
import useStyle from '../../utils/website/styles';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import CheckoutWizard from '../../components/dashboard/CheckoutWizard';
import useStyles from '../../utils/website/styles';

const Register = () => {
  const [dateOfBirth, setDateOfBirth] = React.useState(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const { userInfo, dashboardHouseholdHeadDetails } = state;
  const { 
    registrationFirstName,
	  registrationLastName,
	  registrationDateOfBirth,
   	registrationPhone,
    registrationNationalID,
    registrationEmail,
    registrationPassword,
    registrationConfirmPassword,
    } = dashboardHouseholdHeadDetails
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    dispatch({ type: 'HERO_IMAGE_OFF' });
    dispatch({
      type: 'SET_DASHBOARD_TITLE',
      payload: 'Enrollment | registration',
    });
    // if (userInfo) {
    //   router.push('/');
    // }
    setValue('registrationFirstName', dashboardHouseholdHeadDetails.registrationFirstName);
    setValue('registrationLastName', dashboardHouseholdHeadDetails.registrationLastName);
    setValue('registrationDateOfBirth', dashboardHouseholdHeadDetails.registrationDateOfBirth);
    setValue('registrationPhone', dashboardHouseholdHeadDetails.registrationPhone);
    setValue('registrationNationalID', dashboardHouseholdHeadDetails.registrationNationalID );
    setValue('registrationEmail', dashboardHouseholdHeadDetails.registrationEmail);
    setValue('registrationPassword', dashboardHouseholdHeadDetails.registrationPassword);
    setValue('registrationConfirmPassword', dashboardHouseholdHeadDetails.registrationConfirmPassword);
  }, []);

  const classes = useStyle();
  const submitHandler = ({
    registrationFirstName,
	  registrationLastName,
	  registrationDateOfBirth,
   	registrationPhone,
    registrationNationalID,
    registrationEmail,
    registrationPassword,
    registrationConfirmPassword, 
  }) => {
    dispatch({
      type: 'SAVE_DASHBOARD_HOUSEHOLD_HEAD_DETAILS',
      payload: { 
        registrationFirstName,
        registrationLastName,
        registrationDateOfBirth,
        registrationPhone,
        registrationNationalID,
        registrationEmail,
        registrationPassword,
        registrationConfirmPassword
      },
    });
    Cookies.set(
      'dashboardHouseholdHeadDetails',
      JSON.stringify({ 
        registrationFirstName,
        registrationLastName,
        registrationDateOfBirth,
        registrationPhone,
        registrationNationalID,
        registrationEmail,
        registrationPassword,
        registrationConfirmPassword
      })
    );
    router.push('/dashboard/household');
  };


  return (
    <Layout title='Register Household'>
      <div className={classes.checkoutWizard}></div>
      <CheckoutWizard activeStep={0} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <List>
          <ListItem>
            <Controller
              name='registrationFirstName'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationFirstName'
                  label='First name'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  on
                  fullWidth
                  error={Boolean(errors.registrationFirstName)}
                  helperText={
                    errors.registrationFirstName
                      ? errors.registrationFirstName.type === 'minLength'
                        ? 'First name should have at least 2 characters'
                        : 'First name is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='registrationLastName'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationLastName'
                  label='Last name'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  error={Boolean(errors.registrationLastName)}
                  helperText={
                    errors.registrationLastName
                      ? errors.registrationLastName.type === 'minLength'
                        ? 'Last name should have at least 2 characters'
                        : 'Last name is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name='registrationDateOfBirth'
                control={control}
                defaultValue={null}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid },
                }) => (
                  <DatePicker
                    label='Date of birth'
                    disableFuture
                    value={value}
                    onChange={(value) =>
                      onChange(moment(value).format('YYYY-MM-DD'))
                    }
                    renderInput={(params) => (
                      <TextField
                        error={invalid}
                        helperText={invalid ? error.message : null}
                        id='dateOfBirth'
                        variant='standard'
                        margin='dense'
                        fullWidth
                        color='primary'
                        autoComplete='bday'
                        {...params}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          </ListItem>
          <ListItem>
            <Controller
              name='registrationPhone'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 10,
                maxLength: 13,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationPhone'
                  label='Phone number (eg +265123456789)'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  error={Boolean(errors.registrationPhone)}
                  helperText={
                    errors.registrationPhone
                      ? errors.registrationPhone.type === 'minLength'
                        ? 'Phone number should have at least 10 characters'
                        : 'Phone number is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='registrationNationalID'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 10,
                maxLength: 13,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationNationalID'
                  label='National ID (eg XGF5THY4)'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  error={Boolean(errors.registrationNationalID)}
                  helperText={
                    errors.registrationNationalID
                      ? errors.registrationNationalID.type === 'minLength'
                        ? 'National ID should have at least 10 characters'
                        : 'National ID is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='registrationEmail'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationEmail'
                  label='Email'
                  variant='outlined'
                  inputProps={{ type: 'email' }}
                  fullWidth
                  error={Boolean(errors.registrationEmail)}
                  helperText={
                    errors.registrationEmail
                      ? errors.registrationEmail.type === 'pattern'
                        ? 'Email is invalid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='registrationPassword'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationPassword'
                  label='Password'
                  variant='outlined'
                  inputProps={{ type: 'password' }}
                  fullWidth
                  error={Boolean(errors.registrationPassword)}
                  helperText={
                    errors.registrationPassword
                      ? errors.registrationPassword.type === 'minLength'
                        ? 'Password should have at least 8 characters'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='registrationConfirmPassword'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationConfirmPassword'
                  label='ConfirmPassword'
                  variant='outlined'
                  inputProps={{ type: 'password' }}
                  fullWidth
                  error={Boolean(errors.registrationConfirmPassword)}
                  helperText={
                    errors.registrationConfirmPassword
                      ? errors.registrationConfirmPassword.type === 'minLength'
                        ? 'Confirm password should have at least 8 characters'
                        : 'Confirm password is required'
                      : ''
                  }
                  {...field}
                />
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

export default Register;
