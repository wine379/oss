import React, {useContext} from 'react';
import AppFooter from './AppFooter';
import ProductHero from './ProductHero';
import AppAppBar from './AppAppBar';
import { Container, CssBaseline,  TableContainer, ThemeProvider } from '@mui/material';
import theme from '../../utils/website/theme';
import Head from 'next/head';
import {Store} from '../../utils/Store';
import useStyles from '../../utils/website/styles';

const Layout = ({ title, children, description }) => {
  const { state, dispatch } = useContext(Store);
  const {cart: {cartIsEmpty}} = state;
  const { showHeroImage } = state;
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>{title ? `${title} - satination` : 'satination'}</title>
        {description && (
          <meta name='description' component={description}></meta>
        )}
      </Head>
      <ThemeProvider theme={theme}>
        <AppAppBar />
        {showHeroImage ? <ProductHero /> : ''}
        <Container>{children}</Container>
        {<><br /><br /></> }
        <AppFooter className={classes.footer} />
      </ThemeProvider>
    </>
  );
};

export default Layout;
