import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Cookies from 'js-cookie';
import useRouter from 'next/router';
import { Store } from '../utils/Store';
import useStyle from '../utils/website/styles';
import { Typography } from '@mui/material';

export default function LoginUserButton() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const classes = useStyle();
  const router = useRouter;

  const logoutClickHandler = () => {
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };
  const loginMenuCloseHandler = (e, redirect) => {
    if (redirect) {
      router.push(redirect);
    }
  };

  const userEmail = userInfo.email;

  return (
    <PopupState variant='popover' popupId='demo-popup-menu'>
      {(popupState) => (
        <>
          <Button className={classes.navbarButton} {...bindTrigger(popupState)}>
            <Typography color={'secondary'}>{userEmail}</Typography>
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={(e) => {
                loginMenuCloseHandler(e, '/profile');
                popupState.close;
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                popupState.close;
                loginMenuCloseHandler(e, '/order-history');
              }}
            >
              Order History
            </MenuItem>
            <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}
