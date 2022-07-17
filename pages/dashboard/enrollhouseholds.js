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
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import CustomCard from '../../components/dashboard/common/CustomCard';
import CustomTabs from '../../components/dashboard/common/CustomTabs';
import Layout from '../../components/dashboard/Layout';
import styles from '../../styles/Home.module.css';
import EnrollmentWizard from '../../components/dashboard/EnrollmentWizard';
import useStyles from '../../utils/website/styles';

const EnrollHouseholds = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.checkoutWizard}></div>
      <EnrollmentWizard activeStep={2} />
      <div></div>
      Enroll Households Components come here...
    </Layout>
  );
};

export default EnrollHouseholds;
