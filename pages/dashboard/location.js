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
import db from '../../utils/db';
import Area from '../../models/Area';
import Ward from '../../models/Ward';

const structureLocationZones = [
  'On Land Zoned as residential area',
  'Within a flood-prone area',
  'Within River Buffer',
  'On Marginal Land',
  'On Reserved Land/Environmental sensitive',
];

const Location = (props) => {
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    dashboardHouseholdDetails,
    dashboardLocationDetails,
  } = state;
  const {
    registrationArea,
    registrationWard,
    registrationBlockName,
    registrationStructureZone,
  } = dashboardLocationDetails;
  const { areas, wards } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  
  const router = useRouter();
  useEffect(() => {
    dispatch({ type: 'HERO_IMAGE_OFF' });
    dispatch({ type: 'SET_DASHBOARD_TITLE', payload: 'Enrollment | registration', });
    // if (!userInfo) {
    //   router.push('/login?redirect=/location');
    // }
    if (!dashboardHouseholdDetails) {
      router.push('/dashboard/household');
    }
    setValue('registrationArea', dashboardLocationDetails.registrationArea);
    setValue('registrationWard', dashboardLocationDetails.registrationWard);
    setValue('registrationBlockName', dashboardLocationDetails.registrationBlockName);
    setValue('registrationStructureZone', dashboardLocationDetails.registrationStructureZone);
  }, []);

  const classes = useStyles();

  const submitHandler = ({ registrationWard, registrationArea, registrationBlockName, registrationStructureZone }) => {
 
    dispatch({
      type: 'SAVE_DASHBOARD_HOUSEHOLD_LOCATION_DETAILS',
      payload: { registrationWard, registrationArea, registrationBlockName, registrationStructureZone },
    });
    Cookies.set(
      'dashboardLocationDetails',
      JSON.stringify({ registrationWard, registrationArea, registrationBlockName, registrationStructureZone })
    );
    router.push('/dashboard/choosetechnology');
  };

  return (
    <Layout title='Location details'>
      <div className={classes.checkoutWizard}></div>
      <CheckoutWizard activeStep={2} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <List>
          <ListItem>
            <Controller
              name='registrationArea'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationArea'
                  label='Select Area'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.registrationArea)}
                  helperText={errors.registrationArea && 'Area is required'}
                  {...field}
                >
                  {areas.map((area) => (
                    <MenuItem key={area.code} value={area.name}>
                      {area.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='registrationWard'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationWard'
                  label='Select Ward'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.registrationWard)}
                  helperText={errors.registrationWard && 'Ward is required'}
                  {...field}
                >
                  {wards.map((ward) => (
                    <MenuItem key={ward.code} value={ward.name}>
                      {ward.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='registrationBlockName'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationBlockName'
                  label='Block name eg: Senti'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  error={Boolean(errors.registrationBlockName)}
                  helperText={errors.registrationBlockName && 'Block name is required'}
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='registrationStructureZone'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='registrationStructureZone'
                  label='Select Structure Location Zone'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.registrationStructureZone)}
                  helperText={
                    errors.registrationStructureZone &&
                    'Structure Location Zone is required'
                  }
                  {...field}
                >
                  {structureLocationZones.map((structureLocationZone) => (
                    <MenuItem
                      key={structureLocationZone}
                      value={structureLocationZone}
                    >
                      {structureLocationZone}
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
              onClick={() => router.push('/dashboard/household')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  await db.connect();
  const areas = await Area.find({}).lean();
  const wards = await Ward.find({}).lean();
  await db.disconnect();
  return {
    props: {
      areas: areas.map((area) => db.convertDocToObj(area)),
      wards: wards.map((ward) => db.convertDocToObj(ward)),
    },
  };
};

export default Location;
