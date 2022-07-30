import React, { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import useRouter from 'next/router';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import axios from 'axios';
import useStyles from '../../utils/website/styles';
import Layout from '../../components/dashboard/Layout';
import db from '../../utils/db';
import Product from '../../models/Product';
import { Store } from '../../utils/Store';
import CheckoutWizard from '../../components/dashboard/CheckoutWizard';

const ChooseTechnology = (props) => {
  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    dispatch({ type: 'HERO_IMAGE_OFF' });
  }, []);

  const classes = useStyles();

  const { products } = props;
  const router = useRouter;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.maximumQuantityAllowedPerOrder < quantity) {
      window.alert('Sorry, you cannot add more than 3 items of this product');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  let dollarUSLocale = Intl.NumberFormat('en-US');

  return (
    <Layout title='Choose Technology'>
      <div className={classes.checkoutWizard}></div>
      <CheckoutWizard activeStep={3} />
      <div>
        <List>
          <ListItem>
            <br />
            <Typography component={'h3'} variant={'h4'} color={'primary'} >Click technology image to continue...</Typography>
          </ListItem>
          <ListItem>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item md={4} key={product.name}>
                  <Card>
                    <NextLink href={'/dashboard/payment'} passHref>
                      <CardActionArea>
                        <CardMedia
                          component='img'
                          image={product.image}
                          title={product.name}
                        />
                        <CardContent>
                          <Typography>{product.name}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </NextLink>
                    <CardActions>
                      <Typography>
                        MWK{dollarUSLocale.format(product.price)}
                      </Typography>
                      {/* <Button
                    size='small'
                    color='primary'
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button> */}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </ListItem>
          <ListItem item md={4}>
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
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map((product) => db.convertDocToObj(product)),
    },
  };
};

export default ChooseTechnology;
