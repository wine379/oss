import React, {useContext} from 'react';
import AppFooter from './AppFooter';
import ProductHero from './ProductHero';
import AppAppBar from './AppAppBar';
import { Container, CssBaseline,  TableContainer, ThemeProvider } from '@mui/material';
import theme from '../../utils/website/theme';
import Head from 'next/head';
import {Store} from '../../utils/Store';

const Layout = ({ title, children, description }) => {
  const { state, dispatch } = useContext(Store);
  const { showHeroImage } = state;
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
        <AppFooter />
      </ThemeProvider>
    </>
  );
};

export default Layout;
