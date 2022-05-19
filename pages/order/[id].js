import React, { useState, useContext, useEffect, useReducer } from 'react';
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
  CircularProgress,
  Button,
} from '@mui/material';
import NextLink from 'next/link';
import Image from 'next/image';
import useRouter from 'next/router';
import Layout from '../../components/website/Layout';
import { Store } from '../../utils/Store';
import useStyles from '../../utils/website/styles';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ORDER_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_ORDER_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_ORDER_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'FETCH_ITEMS_REQUEST':
      return { ...state, loadingItems: true, errorItems: '' };
    case 'FETCH_ITEMS_SUCCESS':
      return {
        ...state,
        loadingItems: false,
        items: action.payload,
        errorItems: '',
      };
    case 'FETCH_ITEMS_FAIL':
      return { ...state, loadingItems: false, errorItems: action.payload };

    case 'FETCH_HOUSEHOLD_REQUEST':
      return { ...state, loadingHousehold: true, errorHousehold: '' };
    case 'FETCH_HOUSEHOLD_SUCCESS':
      return {
        ...state,
        loadingHousehold: false,
        household: action.payload,
        error: '',
      };
    case 'FETCH_HOUSEHOLD_FAIL':
      return {
        ...state,
        loadingHousehold: false,
        errorHousehold: action.payload,
      };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, sucessPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    case 'SET_ORDER_ITEMS':
      return { ...state, orderItems: action.payload };
    default:
      return state;
  }
};

const Order = ({ params }) => {
  const orderId = params.id;
  const { state } = useContext(Store);
  const router = useRouter;
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userInfo } = state;

  const [{ loading, loadingItems,  error, order, items, successPay }, dispatch] = useReducer(
    reducer,
    { loading: true, order: {}, error: '' }
  );

  const {
    orderNumber,
    orderStatus,
    paymentOption,
    willPayFullForOSS,
    isDelivered,
    paidAt,
    isPaid,
    deliveredAt,
    user,
  } = order;

  useEffect(
    () => {
      if (!userInfo) {
        return router.push('/login');
      }

      const fetchOrder = async () => {
        try {
          dispatch({ type: 'FETCH_ORDER_REQUEST' });
          const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: 'FETCH_ORDER_SUCCESS', payload: data });
        } catch (err) {
          dispatch({ type: 'FETCH_ORDER_FAIL', payload: getError(err) });
        }
      };

      const fetchItems = async () => {
        try {
          dispatch({ type: 'FETCH_ITEMS_REQUEST' });
          const { data } = await axios.get(`/api/orderItems/${orderId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: 'FETCH_ITEMS_SUCCESS', payload: data });
        } catch (err) {
          dispatch({ type: 'FETCH_ITEMS_FAIL', payload: getError(err) });
        }
      };

      if (!order._id || successPay || (order._id && order._id !== orderId)) {
        fetchOrder();
        fetchItems();
        if (successPay) {
          dispatch({ type: 'PAY_RESET' });
        }
      }
    },
    [order, items]
  );

  

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        enqueueSnackbar('Order is paid', { variant: 'success' });
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        enqueueSnackbar(getError(err), { variant: 'error' });
      }
    });
  };

  const onError = (err) => {
    enqueueSnackbar(getError(err), { variant: 'error' });
  };

  return (
    <Layout title={`Order ${orderNumber}`}>
      <Typography component='h1' variant='h3'>
        Order: {orderNumber}
      </Typography>

      {loading || loadingItems ? (
        <CircularProgress />
      ) : error ? (
        <Typography className={classes.error}>{error}</Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component='h2' variant='h2'>
                    Order Details:
                  </Typography>
                </ListItem>
                <ListItem>
                  <strong>Order Enrolment Status: </strong>
                  &nbsp;
                  {orderStatus}, &nbsp;
                  <strong>Payment Method: </strong>
                  &nbsp;
                  {paymentOption}, &nbsp;
                  <strong>Payment status: </strong>
                  &nbsp;
                  {isPaid ? `paid at ${paidAt}` : 'not yet paid'}, &nbsp;
                </ListItem>
                <ListItem>
                  <strong>Will be able to pay in full?: </strong>
                  &nbsp;
                  {willPayFullForOSS ? 'Yes' : 'No'}, &nbsp;
                  <strong>Is toilet contructed: </strong>
                  &nbsp;
                  {isDelivered
                    ? `contruction finined at ${deliveredAt}`
                    : 'not contructed yet'}
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
                        {items.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink
                                href={`/product/${item.product.slug}`}
                                passHref
                              >
                                <Link>
                                  <Image
                                    src={item.product.image}
                                    alt={item.product.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <NextLink
                                href={`/product/${item.product.slug}`}
                                passHref
                              >
                                <Link>
                                  <Typography>{item.product.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align='right'>{item.quantity}</TableCell>
                            <TableCell align='right'>
                              MWK{item.product.price * item.quantity}
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
                  <Typography variant='h5'>We will notify you once your order is approved. Thank you.</Typography>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  return { props: { params } };
};

export default dynamic(() => Promise.resolve(Order), { ssr: false });
