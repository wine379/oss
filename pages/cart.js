import React, { useContext } from 'react';
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
  Select,
  MenuItem,
} from '@mui/material';
import NextLink from 'next/link';
import Image from 'next/image';
import useRouter from 'next/router';
import axios from 'axios';
import Layout from '../components/website/Layout';
import { Store } from '../utils/Store';

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter;
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.maximumQuantityAllowedPerOrder < quantity) {
      window.alert('Sorry, you cannot add more than 3 items of this product');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    router.push('/household');
  };


  return (
    <Layout title='Shopping Cart'>
      <Typography component='h1' variant='h2'>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty.{' '}
          <NextLink href='/products' passHref>
            <Link>
              <strong>Continue Shopping</strong>
            </Link>
          </NextLink>{' '}
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Grid item md={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align='right'>Quantity</TableCell>
                      <TableCell align='right'>Price</TableCell>
                      <TableCell align='right'>Action</TableCell>
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
                          <Select
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartHandler(item, e.target.value)
                            }
                          >
                            {[
                              ...Array(
                                item.maximumQuantityAllowedPerOrder
                              ).keys(),
                            ].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell align='right'>MWK{item.price}</TableCell>
                        <TableCell align='right'>
                          <Button
                            variant='contained'
                            color='secondary'
                            onClick={() => removeItemHandler(item)}
                          >
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant='h6'>
                    Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)}{' '}
                    items) : MWK
                    {cartItems.reduce((a, b) => a + b.price * b.quantity, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={() => checkoutHandler()}
                  >
                    Checkout
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
