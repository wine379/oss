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
import Layout from '../components/website/Layout';
import useStyle from '../utils/website/styles';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const Login = () => {
  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    dispatch({ type: 'HERO_IMAGE_OFF' });
  }, []);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;

  if (userInfo) {
    router.push('/');
  }

  const classes = useStyle();
  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });

      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (e) {
      enqueueSnackbar(e.response.data ? e.response.data.message : e.message, {
        variant: 'error',
      });
    }
  };

  return (
    <Layout title='Login'>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component='h1' variant='h1'>
          Login
        </Typography>
        <List>
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
            <Button variant='contained' type='submit' fullWidth color='primary'>
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don&#39;t have an account? &nbsp;
            <NextLink href={'/register'} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Login;
