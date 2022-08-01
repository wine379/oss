import { useContext, useEffect } from 'react';
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
import { Store } from '../../utils/Store';

const Home = () => {
  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    dispatch({ type: 'SET_DASHBOARD_TITLE', payload: 'Dashboard' });
  }, []);
  
  return <Layout>Dashboard Components come here...</Layout>;
};

export default Home;
