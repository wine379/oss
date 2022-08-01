import React, { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import useRouter from 'next/router';
import Cookies from 'js-cookie';
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
  const {
    userInfo,
    dashboardLocationDetails,
    dashboardTechnologyChoice,
  } = state;

  const {
    registrationProduct,
  } = dashboardTechnologyChoice;

  useEffect(() => {
    dispatch({ type: 'HERO_IMAGE_OFF' });
    dispatch({
      type: 'SET_DASHBOARD_TITLE',
      payload: 'Enrollment | registration',
    });
    // if (!userInfo) {
    //   router.push('/login?redirect=/location');
    // }
    if (!dashboardLocationDetails) {
      router.push('/dashboard/location');
    }
  }, []);

  const classes = useStyles();

  const { products } = props;
  const router = useRouter;

  const addToCartHandler = async (product) => {
    dispatch({ type: 'SAVE_DASHBOARD_TECHNOLOGY_CHOICE_DETAILS', payload: { ...product } });
    Cookies.set(
      'dashboardTechnologyChoice',
      JSON.stringify({ ...product  })
    );

    router.push('/dashboard/payment');
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
            <Typography component={'h3'} variant={'h4'} color={'primary'} >Click <strong>"Choose technology "</strong> button to continue...</Typography>
          </ListItem>
          <ListItem>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item md={4} key={product.name}>
                  <Card>
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
                    <CardActions>
                      <Typography>
                        MWK{dollarUSLocale.format(product.price)}
                      </Typography>
                    </CardActions>
                    <Button
                      variant='contained'
                      size='small'
                      color='primary'
                      fullWidth
                      onClick={() => addToCartHandler(product)}
                    >
                      Choose technology
                    </Button>
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
