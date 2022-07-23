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
import EnrollmentWizard from '../../components/dashboard/EnrollmentWizard';
import AssignContractorTable from '../../components/dashboard/enrollment/AssignContractorTable';

const extractOrderItems = (items) => {
  let orderItemsArray = [];

  items.map((item) => {
    const productId = item._id;
    const quantity = item.quantity;

    orderItemsArray.push({ productId, quantity });
  });

  return orderItemsArray;
};

const PlaceOrder = (props) => {
  const { state, dispatch } = useContext(Store);

  const { areas, wards } = props;
  const router = useRouter();
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    userInfo,
    cart: { cartItems, householdDetails, location, paymentMethod },
  } = state;

  useEffect(() => {
    dispatch({ type: 'HERO_IMAGE_OFF' });
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
  }, [householdDetails, paymentMethod, cartItems]);

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
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );

  const [loading, setLoading] = useState(false);

  const createHousehold = async ({
    adminNotes,
    area,
    avarageMonthlyIncomeRange,
    blockName,
    code,
    currentLatrineType,
    enrollmentStatus,
    homeOwnershipStatus,
    isPoor,
    isVulnerable,
    mainSourceOfLiving,
    name,
    order,
    plotNumber,
    structureLocationZone,
    ward,
    willPayFullForOSS,
  }) => {
    const { data } = await axios.post(
      '/api/households/create',
      {
        adminNotes,
        area,
        avarageMonthlyIncomeRange,
        blockName,
        code,
        currentLatrineType,
        enrollmentStatus,
        homeOwnershipStatus,
        isPoor,
        isVulnerable,
        mainSourceOfLiving,
        name,
        order,
        plotNumber,
        structureLocationZone,
        ward,
        willPayFullForOSS,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    return data;
  };

  const placeOrderHandler = async () => {
    closeSnackbar();

    const areaData = areas.filter((area) => area.name === location.area);
    const wardData = wards.filter((ward) => ward.name === location.ward);

    const area = areaData[0];
    const ward = wardData[0];

    const areaId = area._id;
    const wardId = ward._id;

    const isPoor = householdDetails.isPoor === 'Yes' ? true : false;
    const isVulnerable = householdDetails.isVulnerable === 'Yes' ? true : false;
    const blockName = location.blockName;
    const willPayFullForOSS =
      paymentMethod.willPayFullForOSS === 'Yes' ? true : false;

    try {
      setLoading(true);

      const householdInput = {
        ...householdDetails,
        code: householdCode,
        blockName,
        isPoor,
        isVulnerable,
        willPayFullForOSS,
        adminNotes:
          'This household was registered through the website on ' +
          new Date().toDateString(),
        enrollmentStatus: 'Pending',
        structureLocationZone: location.structureLocationZone,
        area: areaId,
        ward: wardId,
      };

      const { data } = await axios.post(
        '/api/orders/create',
        {
          orderNumber,
          orderStatus: 'Pending',
          paymentOption: paymentMethod.paymentOption,
          willPayFullForOSS,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const orderId = data.order._id;

      const createOrderItems = () => {
        cartItems.map(async (item) => {
          const { data } = await axios.post(
            '/api/orderItems/create',
            {
              product: item._id,
              quantity: item.quantity,
              order: orderId,
            },
            {
              headers: {
                authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
        });
      };

      createOrderItems();

      const newHouseholdInput = { ...householdInput, order: data.order._id };

      const household = createHousehold(newHouseholdInput);

      dispatch({ type: 'CLEAR_CART' });
      Cookies.remove('cartItems');
      setLoading(false);

      router.push(`/order/${data.order._id}`);
    } catch (e) {
      setLoading(false);
      enqueueSnackbar(getError(e), { variant: 'error' });
    }
  };

  return (
    <Layout title='Place Order'>
      <div className={classes.checkoutWizard}></div>
      <EnrollmentWizard activeStep={2} />
      <div></div>

      <Grid container spacing={1}>
        <Grid item md={8} xs={12}>
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
                  <strong>Number of households selected: </strong>
                  500
                </Typography>
              </ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component='h2' variant='h4'>
                  {' '}
                  Households list{' '}
                </Typography>
              </ListItem>
              <ListItem>
                <AssignContractorTable />
              </ListItem>
            </List>
            <Grid item md={9} xs={12}></Grid>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component='h2' variant='h4'>
                  Payment details:
                </Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Technologies cost:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>MWK{itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Amount paid:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>MWK{itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Balance payments:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>
                      <strong>MWK{itemsPrice}</strong>
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
                  Register households
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  onClick={placeOrderHandler}
                  variant='contained'
                  color='secondary'
                  fullWidth
                >
                  Cancel registration
                </Button>
              </ListItem>

              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
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
};

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
