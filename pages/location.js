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
import db from '../utils/db';
import Area from '../models/Area';
import Ward from '../models/Ward';

const structureLocationZones = [
        'On Land Zoned as residential area',
        'Within a flood-prone area',
        'Within River Buffer',
        'On Marginal Land',
        'On Reserved Land/Environmental sensitive',
      ]


const Location = (props) => {
  const { state, dispatch } = useContext(Store);
  const { areas, wards  } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  
  const {
    userInfo,
    cart: { location, householdDetails },
  } = state;
  const router = useRouter();
  useEffect(
    () => {
      dispatch({ type: 'HERO_IMAGE_OFF' });
      if (!userInfo) {
        router.push('/login?redirect=/location');
      }
      if (!householdDetails) {
        router.push('/household');
      }
      setValue('ward', location.ward);
      setValue('area', location.area);
      setValue('blockName', location.blockName);
      setValue('structureLocationZone', location.structureLocationZone);
    },
    []
  );

  const classes = useStyles();
  const submitHandler = ({ward, area, blockName, structureLocationZone }) => {
    dispatch({
      type: 'SAVE_LOCATION',
      payload: { ward, area, blockName, structureLocationZone },
    });
    Cookies.set(
      'location',
      JSON.stringify({ ward, area, blockName, structureLocationZone })
    );
    router.push('/payment');
  };
  

  return (
    <Layout title='Location details'>
      <div className={classes.checkoutWizard}></div>
      <CheckoutWizard activeStep={2} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component='h1' variant='h4'>
          Location details for the new proposed toilet
        </Typography>
        <List>
          <ListItem>
            <Controller
              name='area'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='area'
                  label='Select Area'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.area)}
                  helperText={errors.area && 'Area is required'}
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
              name='ward'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='ward'
                  label='Select Ward'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.ward)}
                  helperText={errors.ward && 'Ward is required'}
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
              name='blockName'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='blockName'
                  label='Block name eg: Senti'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  error={Boolean(errors.blockName)}
                  helperText={errors.blockName && 'Block name is required'}
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='structureLocationZone'
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  id='structureLocationZone'
                  label='Select Structure Location Zone'
                  variant='outlined'
                  inputProps={{ type: 'text' }}
                  fullWidth
                  select
                  error={Boolean(errors.structureLocationZone)}
                  helperText={
                    errors.structureLocationZone &&
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
              onClick={() => router.push('/household')}
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
}

export default Location;
