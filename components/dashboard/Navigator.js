import * as React from 'react';
import NextLink from 'next/link';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';

const categories = [
  {
    id: 'Enrollment',
    children: [
      {
        id: 'Register new households',
        icon: <PeopleIcon />,
        active: true,
        link: '/dashboard/register',
      },
      {
        id: 'Enroll households',
        icon: <DnsRoundedIcon />,
        link: '/dashboard/selecthouseholds',
      },
      {
        id: 'Manage payments',
        icon: <PermMediaOutlinedIcon />,
        link: '/dashboard/managepayments',
      },
    ],
  },
  {
    id: 'OSS projects',
    children: [
      {
        id: 'Approve projects',
        icon: <PublicIcon />,
        link: '/dashboard/register',
      },
      {
        id: 'Manage works',
        icon: <SettingsEthernetIcon />,
        link: '/dashboard/register',
      },
      {
        id: 'Certify completed works',
        icon: <SettingsInputComponentIcon />,
        link: '/dashboard/register',
      },
      {
        id: 'Manage cases',
        icon: <SettingsInputComponentIcon />,
        link: '/dashboard/register',
      },
      {
        id: 'Reports',
        icon: <SettingsInputComponentIcon />,
        link: '/dashboard/register',
      },
    ],
  },
  {
    id: 'System',
    children: [
      {
        id: 'Manage contractors',
        icon: <SettingsIcon />,
        link: '/dashboard/register',
      },
      {
        id: 'Manage products',
        icon: <TimerIcon />,
        link: '/dashboard/register',
      },
      {
        id: 'Manage locations',
        icon: <PhonelinkSetupIcon />,
        link: '/dashboard/register',
      },
      {
        id: 'Manage users',
        icon: <PhonelinkSetupIcon />,
        link: '/dashboard/register',
      },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const Navigator = (props) => {
  const { ...other } = props;

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}
        >
          OSS Administration
        </ListItem>
        <NextLink href={`/dashboard`} passHref>
          <Link>
            <ListItem sx={{ ...item, ...itemCategory }}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Project Overview</ListItemText>
            </ListItem>
          </Link>
        </NextLink>

        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, link, active }) => (
              <NextLink href={link} passHref key={childId}>
                <Link>
                  <ListItem disablePadding key={childId}>
                    <ListItemButton selected={active} sx={item}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </NextLink>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

export default Navigator
