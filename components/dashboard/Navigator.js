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
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PaymentIcon from '@mui/icons-material/Payment';
import AddTaskIcon from '@mui/icons-material/AddTask';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CasesIcon from '@mui/icons-material/Cases';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GavelIcon from '@mui/icons-material/Gavel';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';

const categories = [
  {
    id: 'Enrollment',
    children: [
      {
        id: 'Register new household',
        icon: <FamilyRestroomIcon />,
        active: true,
        link: '/dashboard/register',
      },
      {
        id: 'Create contracts',
        icon: <GavelIcon />,
        link: '/dashboard/selecthouseholds',
      },
      {
        id: 'Manage payments',
        icon: <PaymentIcon />,
        link: '/dashboard/managepayments',
      },
    ],
  },
  {
    id: 'OSS projects',
    children: [
      {
        id: 'Create projects',
        icon: <EditNotificationsIcon />,
        link: '/dashboard/selectcontracts',
      },
      {
        id: 'Manage projects',
        icon: <WorkHistoryIcon />,
        link: '/dashboard/projects',
      },
      {
        id: 'Certify completed projects',
        icon: <VerifiedUserIcon />,
        link: '/dashboard/certify',
      },
      {
        id: 'Manage cases',
        icon: <CasesIcon />,
        link: '/dashboard/casemanagement',
      },
      {
        id: 'Reports',
        icon: <AssessmentIcon />,
        link: '/dashboard/reports',
      },
    ],
  },
  {
    id: 'System',
    children: [
      {
        id: 'Manage contractors',
        icon: <SettingsIcon />,
        link: '/dashboard/contractors',
      },
      {
        id: 'Manage products',
        icon: <ProductionQuantityLimitsIcon />,
        link: '/dashboard/products',
      },
      {
        id: 'Manage locations',
        icon: <EditLocationAltIcon />,
        link: '/dashboard/locations',
      },
      {
        id: 'Manage users',
        icon: <ManageAccountsIcon />,
        link: '/dashboard/users',
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
