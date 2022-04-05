import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import NextLink from 'next/link';
import Image from 'next/image';
import useRouter from 'next/router';
import Layout from '../components/website/Layout';
import { Store } from '../utils/Store';
import useStyles from '../utils/website/styles';
import CheckoutWizard from '../components/website/CheckoutWizard';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';

const PlaceOrder = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter;
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    userInfo,
    cart: { cartItems, householdDetails, location, paymentMethod },
  } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    // if (!paymentMethod) {
    //   router.push('/payment');
    // }
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders/',
        {
          orderItems: cartItems,
          shippingAddress,
          shippingPrice,
          paymentMethod,
          itemsPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: 'CLEAR_CART' });
      Cookies.remove('cartItems');
      setLoading(false);
      router.push(`/order/${data._id}`);
    } catch (e) {
      setLoading(false);
      enqueueSnackbar(getError(e), { variant: 'error' });
    }
  };

  const payment = JSON.parse(paymentMethod)

  return (
    <Layout title='Place Order'>
      <CheckoutWizard activeStep={4} />
      <Typography component='h1' variant='h4'>
        Place Order
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
                  <strong>Household name: </strong>
                  {householdDetails.householdName}
                  {', '}
                  <strong>Plot number: </strong>
                  {householdDetails.plotNumber}
                  {', '}
                  <strong>Home ownership status: </strong>
                  {householdDetails.homeOwnershipStatus}
                  {', '}
                  <strong>Current latrine: </strong>
                  {householdDetails.latrine}
                  {', '}
                  <strong>Is Household Poor?: </strong>
                  {householdDetails.isPoor}
                  {', '}
                  <strong>Is Household Vulnerable?: </strong>
                  {householdDetails.isVulnerable}
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
                  {location.area}
                  {', '}
                  <strong>Ward name: </strong>
                  {location.ward}
                  {', '}
                  <strong>Structure location zone: </strong>
                  {location.structureLocationZone}
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
                  {payment.paymentOption}
                  {', '}
                  <strong>Can household afford to pay in full for OSS?: </strong>
                  {payment.willPayFullForOSS}
                </Typography>
              </ListItem>
            </List>
          </Card>

          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component='h2' variant='h2'>
                  {' '}
                  Order Items{' '}
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Quantity</TableCell>
                        <TableCell align='right'>Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align='right'>
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align='right'>
                            <Typography>MWK{item.price}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
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
                    <Typography>Items:</Typography>
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
                      <strong>Total:</strong>
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
                  Place Order
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

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
