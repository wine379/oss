import { Refresh, Search } from '@mui/icons-material';
import {
  AppBar,
  Card,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  ListItem,
  List,
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import CustomCard from '../../components/dashboard/common/CustomCard';
import CustomTabs from '../../components/dashboard/common/CustomTabs';
import Layout from '../../components/dashboard/Layout';
import styles from '../../styles/Home.module.css';
import EnrollmentWizard from '../../components/dashboard/EnrollmentWizard';
import useStyles from '../../utils/website/styles';
import { Controller } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import DatePicker from 'react-multi-date-picker';
import SearchComponent from '../../components/dashboard/enrollment/SearchComponent';

const EnrollHouseholds = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.checkoutWizard}></div>
      <EnrollmentWizard activeStep={2} />
      <div></div>
      <form className={classes.form}>
        <List>
          <ListItem>
            <SearchComponent />
          </ListItem>
          <ListItem>
            <Button variant='contained' type='submit' fullWidth color='primary'>
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default EnrollHouseholds;
