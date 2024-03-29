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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

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
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const classes = useStyle();
  const submitHandler = async ({
    firstName,
    lastName,
    nationalID,
    dateOfBirth,
    phone,
    email,
    password,
    confirmPassword,
  }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        firstName,
        lastName,
        dateOfBirth,
        phone,
        nationalID,
        email,
        password,
      });


      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/cart');
    } catch (e) {
      enqueueSnackbar(e.response.data ? e.response.data.message : e.message, {
        variant: 'error',
      });
    }
  };


  return (
    <Layout title='Register'>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component='h1' variant='h1'>
          Register
        </Typography>
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
                      
                      (
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
                      )
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
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Register;

// import React, { useState, useContext, useEffect } from 'react';
// import NextLink from 'next/link';
// import {
//   Button,
//   Link,
//   List,
//   ListItem,
//   TextField,
//   Typography,
// } from '@mui/material';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import Layout from '../components/website/Layout';
// import useStyle from '../utils/website/styles';
// import { Store } from '../utils/Store';
// import { useRouter } from 'next/router';
// import { Controller, useForm } from 'react-hook-form';
// import { useSnackbar } from 'notistack';
// import BasicDatePicker from '../components/BasicDataPicker';

// const Register = () => {
//   useEffect(() => {
//     if(userInfo){
//       router.push('/')
//     }
//     dispatch({ type: 'HERO_IMAGE_OFF' });
//   }, []);

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [phone, setPhone] = useState('');
//   const [houseHoldName, setHouseHoldName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   let eighteenYearsAgo = new Date();
//   eighteenYearsAgo = eighteenYearsAgo.setFullYear(
//     eighteenYearsAgo.getFullYear() - 18
//   );

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const { state, dispatch } = useContext(Store);
//   const { userInfo } = state;
//   const router = useRouter();
//   const { redirect } = router.query;

//   if (userInfo) {
//     router.push('/');
//   }

//   const classes = useStyle();
//   const submitHandler = async ({
//     firstName,
//     lastName,
//     dateOfBirth,
//     phone,
//     houseHoldName,
//     email,
//     password,
//     confirmPassword,
//   }) => {
//     closeSnackbar();

//     let dob = new Date(dateOfBirth);
//     dob = dob.setFullYear(dob.getFullYear());

//     if (dob > eighteenYearsAgo) {
//       enqueueSnackbar('Applicant must be 18 years or above', { variant: 'error' });
//       return;
//     }
//     if (password !== dateOfBirth) {
//       enqueueSnackbar('Passwords do not match', { variant: 'error' });
//       return;
//     }
//     try {
//       const { data } = await axios.post('/api/users/register', {
//         firstName,
//         lastName,
//         dateOfBirth,
//         phone,
//         houseHoldName,
//         email,
//         password,
//       });

//       dispatch({ type: 'USER_LOGIN', payload: data });
//       Cookies.set('userInfo', JSON.stringify(data));
//       router.push(redirect || '/');
//     } catch (e) {
//       enqueueSnackbar(e.response.data ? e.response.data.message : e.message, {
//         variant: 'error',
//       });
//     }
//   };

//   return (
//     <Layout title='Register'>
//       <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
//         <Typography component='h1' variant='h1'>
//           Register
//         </Typography>
//         <List>
//           <ListItem>
//             <Controller
//               name='firstName'
//               control={control}
//               defaultValue=''
//               rules={{
//                 required: true,
//                 minLength: 2,
//               }}
//               render={({ field }) => (
//                 <TextField
//                   id='firstName'
//                   label='First name'
//                   variant='outlined'
//                   inputProps={{ type: 'text' }}
//                   on
//                   fullWidth
//                   error={Boolean(errors.firstName)}
//                   helperText={
//                     errors.firstName
//                       ? errors.firstName.type === 'minLength'
//                         ? 'First name should have at least 2 characters'
//                         : 'First name is required'
//                       : ''
//                   }
//                   {...field}
//                 />
//               )}
//             />
//           </ListItem>
//           <ListItem>
//             <Controller
//               name='lastName'
//               control={control}
//               defaultValue=''
//               rules={{
//                 required: true,
//                 minLength: 2,
//               }}
//               render={({ field }) => (
//                 <TextField
//                   id='lastName'
//                   label='Last name'
//                   variant='outlined'
//                   inputProps={{ type: 'text' }}
//                   fullWidth
//                   error={Boolean(errors.lastName)}
//                   helperText={
//                     errors.lastName
//                       ? errors.lastName.type === 'minLength'
//                         ? 'Last name should have at least 2 characters'
//                         : 'Last name is required'
//                       : ''
//                   }
//                   {...field}
//                 />
//               )}
//             />
//           </ListItem>
//           <ListItem>
//             <Controller
//               name='dateOfBirth'
//               control={control}
//               fullWidth
//               defaultValue=''
//               rules={{
//                 required: true,
//               }}
//               render={({ field }) => (
//                 <BasicDatePicker
//                   id='dateOfBirth'
//                   label='Date of birth'
//                   variant='outlined'
//                   inputProps={{ type: 'text' }}
//                   error={Boolean(errors.dateOfBirth)}
//                   helperText={errors.dateOfBirth ? 'Last name is required' : ''}
//                   {...field}
//                 />
//               )}
//             />
//           </ListItem>

//           <ListItem>
//             <Controller
//               name='phone'
//               control={control}
//               defaultValue=''
//               rules={{
//                 required: true,
//                 minLength: 10,
//                 maxLength: 13,
//               }}
//               render={({ field }) => (
//                 <TextField
//                   id='phone'
//                   label='Phone number (eg +265123456789)'
//                   variant='outlined'
//                   inputProps={{ type: 'text' }}
//                   fullWidth
//                   error={Boolean(errors.phone)}
//                   helperText={
//                     errors.phone
//                       ? errors.phone.type === 'minLength'
//                         ? 'Phone number should have at least 10 characters'
//                         : 'Phone number is required'
//                       : ''
//                   }
//                   {...field}
//                 />
//               )}
//             />
//           </ListItem>
//           <ListItem>
//             <Controller
//               name='nationalID'
//               control={control}
//               defaultValue=''
//               rules={{
//                 required: true,
//                 minLength: 10,
//                 maxLength: 13,
//               }}
//               render={({ field }) => (
//                 <TextField
//                   id='nationalID'
//                   label='National ID (eg XGF5THY4)'
//                   variant='outlined'
//                   inputProps={{ type: 'text' }}
//                   fullWidth
//                   error={Boolean(errors.nationalID)}
//                   helperText={
//                     errors.nationalID
//                       ? errors.nationalID.type === 'minLength'
//                         ? 'National ID should have at least 10 characters'
//                         : 'National ID is required'
//                       : ''
//                   }
//                   {...field}
//                 />
//               )}
//             />
//           </ListItem>
//           <ListItem>
//             <Controller
//               name='email'
//               control={control}
//               defaultValue=''
//               rules={{
//                 pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//               }}
//               render={({ field }) => (
//                 <TextField
//                   id='email'
//                   label='Email'
//                   variant='outlined'
//                   inputProps={{ type: 'email' }}
//                   fullWidth
//                   error={Boolean(errors.email)}
//                   helperText={
//                     errors.email
//                       ? errors.email.type === 'pattern'
//                         ? 'Email is invalid'
//                         : 'Email is required'
//                       : ''
//                   }
//                   {...field}
//                 />
//               )}
//             />
//           </ListItem>
//           <ListItem>
//             <Controller
//               name='password'
//               control={control}
//               defaultValue=''
//               rules={{
//                 required: true,
//                 minLength: 6,
//               }}
//               render={({ field }) => (
//                 <TextField
//                   id='password'
//                   label='Password'
//                   variant='outlined'
//                   inputProps={{ type: 'password' }}
//                   fullWidth
//                   error={Boolean(errors.password)}
//                   helperText={
//                     errors.password
//                       ? errors.password.type === 'minLength'
//                         ? 'Password should have at least 6 characters'
//                         : 'Password is required'
//                       : ''
//                   }
//                   {...field}
//                 />
//               )}
//             />
//           </ListItem>
//           <ListItem>
//             <Controller
//               name='confirmPassword'
//               control={control}
//               defaultValue=''
//               rules={{
//                 required: true,
//                 minLength: 8,
//               }}
//               render={({ field }) => (
//                 <TextField
//                   id='confirmPassword'
//                   label='ConfirmPassword'
//                   variant='outlined'
//                   inputProps={{ type: 'password' }}
//                   fullWidth
//                   error={Boolean(errors.confirmPassword)}
//                   helperText={
//                     errors.confirmPassword
//                       ? errors.confirmPassword.type === 'minLength'
//                         ? 'Confirm password should have at least 8 characters'
//                         : 'Confirm password is required'
//                       : ''
//                   }
//                   {...field}
//                 />
//               )}
//             />
//           </ListItem>
//           <ListItem>
//             <Button variant='contained' type='submit' fullWidth color='primary'>
//               Register
//             </Button>
//           </ListItem>
//           <ListItem>
//             Already have an account? &nbsp;
//             <NextLink
//               href={`/login?redirect=${redirect || '/products'}`}
//               passHref
//             >
//               <Link>Login</Link>
//             </NextLink>
//           </ListItem>
//         </List>
//       </form>
//     </Layout>
//   );
// };

// export default Register;

// import React, { useContext, useEffect } from 'react';
// import { Refresh, Search } from '@mui/icons-material';
// import {
//   AppBar,
//   Button,
//   Grid,
//   IconButton,
//   Link,
//   List,
//   ListItem,
//   Paper,
//   TextField,
//   Toolbar,
//   Tooltip,
//   Typography,
// } from '@mui/material';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import NextLink from 'next/link';
// import Head from 'next/head';
// import Image from 'next/image';
// import { Controller, useForm } from 'react-hook-form';
// import { useSnackbar } from 'notistack';
// import Layout from '../components/website/Layout';
// import useStyle from '../utils/website/styles';
// import styles from '../styles/Home.module.css';
// import {Store} from '../utils/Store';
// import Cookies from 'js-cookie';
// import BasicDatePicker from '../components/BasicDataPicker';

// const Registration = () => {
// let eighteenYearsAgo = new Date();
// eighteenYearsAgo = eighteenYearsAgo.setFullYear(
//   eighteenYearsAgo.getFullYear() - 18
// );

//   const classes = useStyle();
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const {dispatch} = useContext(Store);

//   useEffect(() => {
//     dispatch({ type: 'HERO_IMAGE_OFF' });
//   }, []);

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();

//   const router = useRouter();
//   const { redirect } = router.query;

//   const submitHandler = async ({
// firstName,
// lastName,
// dateOfBirth,
// phone,
// houseHoldName,
// email,
// password,
// confirmPassword
//   }) => {
//     console.log('Password: ', confirmPassword);
//     closeSnackbar();
// if (password !== confirmPassword) {
//   enqueueSnackbar('Passwords do not match', { variant: 'error' });
//   return;
// }
//     try {
//       const { data } = await axios.post('/api/users/register', {
//         firstName,
//         lastName,
//         dateOfBirth,
//         phone,
//         houseHoldName,
//         email,
//         password,
//       });

//       console.log(data)

//       dispatch({ type: 'USER_LOGIN', payload: data });
//       Cookies.set('userInfo', JSON.stringify(data));
//       router.push(redirect || '/');
//     } catch (e) {
//       enqueueSnackbar(e.message, {
//         variant: 'error',
//       });
//     }
//   };
//   return (
//     <Layout title='Registration' description='Client registration form'>
//       <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
//         <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
//           <Typography component='h1' variant='h1'>
//             Register
//           </Typography>
// <List>
//   <ListItem>
//     <Controller
//       name='firstName'
//       control={control}
//       defaultValue=''
//       rules={{
//         required: true,
//         minLength: 2,
//       }}
//       render={({ field }) => (
//         <TextField
//           id='firstName'
//           label='First name'
//           variant='outlined'
//           inputProps={{ type: 'text' }}
//           fullWidth
//           error={Boolean(errors.firstName)}
//           helperText={
//             errors.firstName
//               ? errors.firstName.type === 'minLength'
//                 ? 'First name should have at least 2 characters'
//                 : 'First name is required'
//               : ''
//           }
//           {...field}
//         />
//       )}
//     />
//   </ListItem>
//   <ListItem>
//     <Controller
//       name='lastName'
//       control={control}
//       defaultValue=''
//       rules={{
//         required: true,
//         minLength: 2,
//       }}
//       render={({ field }) => (
//         <TextField
//           id='lastName'
//           label='Last name'
//           variant='outlined'
//           inputProps={{ type: 'text' }}
//           fullWidth
//           error={Boolean(errors.lastName)}
//           helperText={
//             errors.lastName
//               ? errors.lastName.type === 'minLength'
//                 ? 'Last name should have at least 2 characters'
//                 : 'Last name is required'
//               : ''
//           }
//           {...field}
//         />
//       )}
//     />
//   </ListItem>
//   <ListItem>
//     <Controller
//       name='dateOfBirth'
//       control={control}
//       fullWidth
//       defaultValue=''
//       rules={{
//         required: true,
//       }}
//       render={({ field }) => (
//         <BasicDatePicker
//           id='dateOfBirth'
//           label='Date of birth'
//           variant='outlined'
//           inputProps={{ type: 'text' }}
//           error={Boolean(errors.dateOfBirth)}
//           helperText={
//             errors.dateOfBirth ? 'Last name is required' : ''
//           }
//           {...field}
//         />
//       )}
//     />
//   </ListItem>

//   <ListItem>
//     <Controller
//       name='phone'
//       control={control}
//       defaultValue=''
//       rules={{
//         required: true,
//         minLength: 10,
//         maxLength: 13,
//       }}
//       render={({ field }) => (
//         <TextField
//           id='phone'
//           label='Phone number (eg +265123456789)'
//           variant='outlined'
//           inputProps={{ type: 'text' }}
//           fullWidth
//           error={Boolean(errors.phone)}
//           helperText={
//             errors.phone
//               ? errors.phone.type === 'minLength'
//                 ? 'Phone number should have at least 10 characters'
//                 : 'Phone number is required'
//               : ''
//           }
//           {...field}
//         />
//       )}
//     />
//   </ListItem>
//   <ListItem>
//     <Controller
//       name='nationalID'
//       control={control}
//       defaultValue=''
//       rules={{
//         required: true,
//         minLength: 10,
//         maxLength: 13,
//       }}
//       render={({ field }) => (
//         <TextField
//           id='nationalID'
//           label='National ID (eg XGF5THY4)'
//           variant='outlined'
//           inputProps={{ type: 'text' }}
//           fullWidth
//           error={Boolean(errors.nationalID)}
//           helperText={
//             errors.nationalID
//               ? errors.nationalID.type === 'minLength'
//                 ? 'National ID should have at least 10 characters'
//                 : 'National ID is required'
//               : ''
//           }
//           {...field}
//         />
//       )}
//     />
//   </ListItem>
//   <ListItem>
//     <Controller
//       name='email'
//       control={control}
//       defaultValue=''
//       rules={{
//         required: true,
//         pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//       }}
//       render={({ field }) => (
//         <TextField
//           id='email'
//           label='Email'
//           variant='outlined'
//           inputProps={{ type: 'email' }}
//           fullWidth
//           error={Boolean(errors.email)}
//           helperText={
//             errors.email
//               ? errors.email.type === 'pattern'
//                 ? 'Email is invalid'
//                 : 'Email is required'
//               : ''
//           }
//           {...field}
//         />
//       )}
//     />
//   </ListItem>
//   <ListItem>
//     <Controller
//       name='password'
//       control={control}
//       defaultValue=''
//       rules={{
//         required: true,
//         minLength: 6,
//       }}
//       render={({ field }) => (
//         <TextField
//           id='password'
//           label='Password'
//           variant='outlined'
//           inputProps={{ type: 'password' }}
//           fullWidth
//           error={Boolean(errors.password)}
//           helperText={
//             errors.password
//               ? errors.password.type === 'minLength'
//                 ? 'Password should have at least 6 characters'
//                 : 'Password is required'
//               : ''
//           }
//           {...field}
//         />
//       )}
//     />
//   </ListItem>
//   <ListItem>
//     <Controller
//       name='confirmPassword'
//       control={control}
//       defaultValue=''
//       rules={{
//         required: true,
//         minLength: 8,
//       }}
//       render={({ field }) => (
//         <TextField
//           id='confirmPassword'
//           label='ConfirmPassword'
//           variant='outlined'
//           inputProps={{ type: 'password' }}
//           fullWidth
//           error={Boolean(errors.confirmPassword)}
//           helperText={
//             errors.confirmPassword
//               ? errors.confirmPassword.type === 'minLength'
//                 ? 'Confirm password should have at least 8 characters'
//                 : 'Confirm password is required'
//               : ''
//           }
//           {...field}
//         />
//       )}
//     />
//   </ListItem>
//   <ListItem>
//     <Button
//       variant='contained'
//       type='submit'
//       fullWidth
//       color='primary'
//     >
//       Register
//     </Button>
//   </ListItem>
//   <ListItem>
//     Already have an account? &nbsp;
//     <NextLink
//       href={`/login?redirect=${redirect || '/products'}`}
//       passHref
//     >
//       <Link>Login</Link>
//     </NextLink>
//   </ListItem>
// </List>
//         </form>
//       </Paper>
//     </Layout>
//   );
// };

// export default Registration;
