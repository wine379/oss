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
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    dispatch({ type: 'HERO_IMAGE_OFF' });
    dispatch({
      type: 'SET_DASHBOARD_TITLE',
      payload: 'Enrollment',
    });
    // if (userInfo) {
    //   router.push('/');
    // }
  }, []);

  const classes = useStyle();
  const submitHandler = () => {
    router.push(redirect || '/dashboard/household');
  }
  // const submitHandler = async ({
  //   firstName,
  //   lastName,
  //   nationalID,
  //   dateOfBirth,
  //   phone,
  //   email,
  //   password,
  //   confirmPassword,
  // }) => {
  //   closeSnackbar();
  //   if (password !== confirmPassword) {
  //     enqueueSnackbar('Passwords do not match', { variant: 'error' });
  //     return;
  //   }
  //   try {
  //     const { data } = await axios.post('/api/users/register', {
  //       firstName,
  //       lastName,
  //       dateOfBirth,
  //       phone,
  //       nationalID,
  //       email,
  //       password,
  //     });


  //     dispatch({ type: 'USER_LOGIN', payload: data });
  //     Cookies.set('userInfo', JSON.stringify(data));
  //     router.push(redirect || '/cart');
  //   } catch (e) {
  //     enqueueSnackbar(e.response.data ? e.response.data.message : e.message, {
  //       variant: 'error',
  //     });
  //   }
  // };


  return (
    <Layout title='Register Household'>
      <div className={classes.checkoutWizard}></div>
      <CheckoutWizard activeStep={0} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <List>
          <ListItem>
            <Controller
              name='firstName'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id='firstName'
                  label='First name'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  on
                  fullWidth
                  error={Boolean(errors.firstName)}
                  helperText={
                    errors.firstName
                      ? errors.firstName.type === 'minLength'
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
              name='lastName'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id='lastName'
                  label='Last name'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  error={Boolean(errors.lastName)}
                  helperText={
                    errors.lastName
                      ? errors.lastName.type === 'minLength'
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
                name='dateOfBirth'
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
              name='phone'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 10,
                maxLength: 13,
              }}
              render={({ field }) => (
                <TextField
                  id='phone'
                  label='Phone number (eg +265123456789)'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  error={Boolean(errors.phone)}
                  helperText={
                    errors.phone
                      ? errors.phone.type === 'minLength'
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
              name='nationalID'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 10,
                maxLength: 13,
              }}
              render={({ field }) => (
                <TextField
                  id='nationalID'
                  label='National ID (eg XGF5THY4)'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  error={Boolean(errors.nationalID)}
                  helperText={
                    errors.nationalID
                      ? errors.nationalID.type === 'minLength'
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
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              }}
              render={({ field }) => (
                <TextField
                  id='email'
                  label='Email'
                  variant='outlined'
                  inputProps={{ type: 'email' }}
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
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
              name='password'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field }) => (
                <TextField
                  id='password'
                  label='Password'
                  variant='outlined'
                  inputProps={{ type: 'password' }}
                  fullWidth
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
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
              name='confirmPassword'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field }) => (
                <TextField
                  id='confirmPassword'
                  label='ConfirmPassword'
                  variant='outlined'
                  inputProps={{ type: 'password' }}
                  fullWidth
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
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
