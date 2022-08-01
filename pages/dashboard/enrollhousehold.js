import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  InputLabel,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
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
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import axios from 'axios';



const PlaceOrder = (props) => {
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    dashboardHouseholdHeadDetails,
    dashboardHouseholdDetails,
    dashboardLocationDetails,
    dashboardTechnologyChoice,
    dashboardPaymentDetails,
  } = state;

  const technologyOfChoice = dashboardTechnologyChoice;
  
  const { areas, wards } = props;
    const router = useRouter();
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(
      () => {
        dispatch({ type: 'HERO_IMAGE_OFF' });
        dispatch({
          type: 'SET_DASHBOARD_TITLE',
          payload: 'Enrollment | registration',
        }); 
        // if (!userInfo) {
        //   router.push('/login?redirect=/payment');
        // }
        // if (!householdDetails) {
        //   router.push('/household');
        // }
        // if (!paymentMethod) {
        //   router.push('/payment');
        // }
        // if (!location.area) {
        //   router.push('/location');
        // }
        // if (cartItems.length === 0) {
        //   router.push('/cart');
        // }
      },
      []
    );

    const dateNow = new Date();
    const milliseconds = dateNow.getTime();
    const hexadicmalMilliseconds = milliseconds.toString(16);
    const householdPrefix = 'HH';
    const orderPrefix = 'OD';
    const genRanHex = (size) =>
      [...Array(size)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
    const suffix = genRanHex(1);
    const householdCode = `${householdPrefix}${hexadicmalMilliseconds}${suffix}`;
    const orderNumber = `${orderPrefix}${hexadicmalMilliseconds}${suffix}`;

    // const createdBy = userInfo._id

    

    const [loading, setLoading] = useState(false);

    const createHousehold = async ({
      firstName,
      lastName,
      email,
      dateOfBirth,
      nationalID,
      phone,
      password,

      adminNotes,
      area,
      avarageMonthlyIncomeRange,
      blockName,
      code,
      currentLatrineType,
      homeOwnershipStatus,
      isPoor,
      isVulnerable,
      mainSourceOfLiving,
      name,
      plotNumber,
      structureLocationZone,
      ward: registrationWard,

      orderNumber,
      willPayFullForOSS,
      paymentOption,
      orderStatus,
      product,
      createdBy,
      isDelivered,


      // createdBy: userInfo._id,

    }) => {
      const { householdHeadData } = await axios.post(
        '/api/users/register',
        {
          firstName,
          lastName,
          email,
          dateOfBirth,
          nationalID,
          phone,
          password,
          // createdBy
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const { householdData } = await axios.post(
        '/api/households/create',
        {
          householdHead: householdHeadData._id,

          adminNotes,
          area,
          avarageMonthlyIncomeRange,
          blockName,
          code,
          currentLatrineType,
          homeOwnershipStatus,
          isPoor,
          isVulnerable,
          mainSourceOfLiving,
          name,
          plotNumber,
          structureLocationZone,
          ward,
          // createdBy
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const { orderData } = await axios.post(
        '/api/orders/create',
        {
          household: householdData._id,
          orderNumber,
          willPayFullForOSS,
          paymentOption,
          orderStatus,
          product,
          isDelivered: false,

          // createdBy
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      
    };


    const placeOrderHandler = async () => {
      closeSnackbar();

      const areaData = areas.filter( area => area.name === dashboardLocationDetails.area)
      const wardData = wards.filter( ward => ward.name === dashboardLocationDetails.ward);

      const area = areaData[0]
      const ward = wardData[0]

      const areaId = area._id
      const wardId = ward._id

      const isPoor = dashboardHouseholdDetails.registrationPovertyStatus === 'Yes' ? true : false;
      const isVulnerable =
      dashboardHouseholdDetails.isVulnerable === 'Yes' ? true : false;
      const blockName = location.blockName;
      const willPayFullForOSS =
        paymentMethod.willPayFullForOSS === 'Yes' ? true : false;

      try {
        setLoading(true);
        

        const householdHeadInput = {
          firstName: dashboardHouseholdHeadDetails.registrationFirstName,
          lastName: dashboardHouseholdHeadDetails.registrationLastName,
          email: dashboardHouseholdHeadDetails.registrationEmail,
          dateOfBirth: dashboardHouseholdHeadDetails.registrationDateOfBirth,
          nationalID: dashboardHouseholdHeadDetails.registrationNationalID,
          phone: dashboardHouseholdHeadDetails.registrationPhone,
          password: dashboardHouseholdHeadDetails.registrationPassword,
        }

        const householdInput = {
          adminNotes:
          'This household was registered through the website on ' +
          new Date().toDateString(),
          area: dashboardLocationDetails.registrationArea,
          avarageMonthlyIncomeRange: dashboardHouseholdDetails.registrationIncomeRange,
          blockName: dashboardHouseholdDetails.registrationBlockName,
          code: householdCode,
          currentLatrineType: dashboardHouseholdDetails.registrationLatrineType,
          homeOwnershipStatus: dashboardHouseholdDetails.registrationHomeOwnershipStatus,
          isPoor: dashboardHouseholdDetails.registrationPovertyStatus,
          isVulnerable: dashboardHouseholdDetails.registrationVulnerabilityStatus,
          mainSourceOfLiving: dashboardHouseholdDetails.registrationSourceOfLivelihood,
          name: dashboardHouseholdDetails.registrationHouseholdName,
          plotNumber: dashboardHouseholdDetails.registrationPlotNumber,
          structureLocationZone: dashboardLocationDetails.registrationStructureZone,
          ward: dashboardLocationDetails.registrationWard,
        };

        const orderInput = {
          orderNumber,
          willPayFullForOSS: dashboardPaymentDetails.registrationWillPayInFull,
          paymentOption: dashboardPaymentDetails.registrationPaymentOption,
          orderStatus: 'Pending',
          product: dashboardTechnologyChoice.registrationProduct._id,
        };


        // const newHouseholdInput = { ...householdHeadInput, ...householdInput, ...orderInput, createdBy};
        
        const newHouseholdInput = { ...householdHeadInput, ...householdInput, ...orderInput};

        createHousehold(newHouseholdInput);

        dispatch({ type: 'CLEAR_DASHBOARD_REGISTRATION_DATA' });
        Cookies.remove(
          'dashboardHouseholdHeadDetails',
          'dashboardHouseholdDetails',
          'dashboardLocationDetails',
          'dashboardTechnologyChoice',
          'dashboardPaymentDetails'
          );

        setLoading(false);

        router.push('/dashboard/register');
      } catch (e) {
        setLoading(false);
        enqueueSnackbar(getError(e), { variant: 'error' });
      }
    };

    

    return (
      <Layout title='Enroll household'>
        <div className={classes.checkoutWizard}></div>
        <CheckoutWizard activeStep={5} />
        <Typography component='h1' variant='h4'>
          Enroll household 
        </Typography>

        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component='h2' variant='h5'>
                    {' '}
                    Household Details{' '}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    <strong>Household head: </strong>
                    {dashboardHouseholdHeadDetails.registrationFirstName + " " + dashboardHouseholdHeadDetails.registrationLastName}
                    {', '}
                    <strong>Household phone: </strong>
                    {dashboardHouseholdHeadDetails.registrationPhone}
                    {', '}
                    <strong>Plot number: </strong>
                    {dashboardHouseholdDetails.registrationPlotNumber}
                    {', '}
                    <strong>Home ownership status: </strong>
                    {dashboardHouseholdDetails.registrationHomeOwnershipStatus}
                    {', '}
                    <strong>Current currentLatrineType: </strong>
                    {dashboardHouseholdDetails.registrationLatrineType}
                    {', '}
                    <strong>Is Household Poor?: </strong>
                    {dashboardHouseholdDetails.registrationPovertyStatus}
                    {', '}
                    <strong>Is Household Vulnerable?: </strong>
                    {dashboardHouseholdDetails.registrationVulnerabilityStatus}
                  </Typography>
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component='h2' variant='h5'>
                    {' '}
                    Household Location{' '}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    <strong>Area name: </strong>
                    {dashboardLocationDetails.registrationArea}
                    {', '}
                    <strong>Block name: </strong>
                    {dashboardHouseholdDetails.registrationBlockName}
                    {', '}
                    <strong>Ward name: </strong>
                    {dashboardLocationDetails.registrationWard}
                    {', '}
                    <strong>Structure location zone: </strong>
                    {dashboardLocationDetails.registrationStructureZone}
                  </Typography>
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component='h2' variant='h5'>
                    {' '}
                    Payment options{' '}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    <strong>Payment Option: </strong>
                    {dashboardPaymentDetails.registrationPaymentOption}
                    {', '}
                    <strong>
                      Can household afford to pay in full for OSS?:{' '}
                    </strong>
                    {dashboardPaymentDetails.registrationWillPayInFull}
                  </Typography>
                </ListItem>
              </List>
            </Card>

            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component='h2' variant='h2'>
                    {' '}
                    Technology{' '}
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align='right'>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={technologyOfChoice._id}>
                          <TableCell>
                            <NextLink href={`/product/${technologyOfChoice.slug}`} passHref>
                              <Link>
                                <Image
                                  src={technologyOfChoice.image}
                                  alt={technologyOfChoice.name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/product/${technologyOfChoice.slug}`} passHref>
                              <Link>
                                <Typography>{technologyOfChoice.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align='right'>
                            <Typography>MWK{technologyOfChoice.price}</Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
              <Grid item md={9} xs={12}></Grid>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component='h2' variant='h4'>
                    Order Summary
                  </Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Item:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='right'>MWK{technologyOfChoice.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='right'>
                        <strong>MWK{technologyOfChoice.price}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={placeOrderHandler}
                    variant='contained'
                    color='primary'
                    fullWidth
                  >
                    Enroll
                  </Button>
                </ListItem>
                {loading && (
                  <ListItem>
                    <CircularProgress />
                  </ListItem>
                )}
              </List>
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
                  <ListItem>
                  <Button ariant='outline' fullWidth >
                    Cancel registration
                  </Button>
                  </ListItem>
            </Card>
          </Grid>
        </Grid>
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

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });

