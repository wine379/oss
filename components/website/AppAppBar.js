import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from './AppBar';
import Cookies from 'js-cookie';
import Toolbar from './Toolbar';
import { Badge, List, ListItem, Switch, Typography } from '@mui/material';
import NextLink from 'next/link';
import LoginUserButton from '../LoginUserButton';
import { Store } from '../../utils/Store';
import Image from 'next/image';
import useStyles from '../../utils/website/styles';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

const logo = '/images/logo.png';
const logo2 = '/images/logo2.png';

const AppAppBar = () => {
  const { state, dispatch } = React.useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const classes = useStyles();

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF', { expires: 365 });
  };
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          &nbsp;
          <Image src={logo} alt={'logo'} width={70} height={70}></Image>
          <Box sx={{ flex: 1 }} />
          <Link
            variant='h6'
            underline='none'
            color='inherit'
            href='/'
            sx={{ fontSize: 24 }}
          >
            {'OSS Platform'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <div className={classes.grow}></div>
            <List className={classes.flexContainer}>
              <ListItem>
                <NextLink href='/cart' passHref>
                  <Link>
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        badgeContent={cart.cartItems.length}
                        color='secondary'
                      >
                        <Typography color={'secondary'}>Cart</Typography>
                      </Badge>
                    ) : (
                      <Typography color={'secondary'}>Cart</Typography>
                    )}
                  </Link>
                </NextLink>
              </ListItem>
              <ListItem>
                {userInfo ? (
                  <LoginUserButton />
                ) : (
                  <NextLink href='/login' passHref>
                    <Link>
                      <Typography color={'secondary'}>Login</Typography>
                    </Link>
                  </NextLink>
                )}
              </ListItem>
            </List>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
