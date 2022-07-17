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
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
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
                  <Button
                    size='small'
                    color='primary'
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
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
