import { Refresh, Search } from '@mui/icons-material';
import {
  AppBar,
  Card,
  CardContent,
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
  MenuItem,
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import CustomCard from '../../components/dashboard/common/CustomCard';
import CustomTabs from '../../components/dashboard/common/CustomTabs';
import Layout from '../../components/dashboard/Layout';
import styles from '../../styles/Home.module.css';
import EnrollmentWizard from '../../components/dashboard/EnrollmentWizard';
import useStyles from '../../utils/website/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import SearchComponent from '../../components/dashboard/common/SearchComponent';
import SelectHouseholdTable from '../../components/dashboard/enrollment/SelectHouseholdTable';
import PaymentsTable from '../../components/dashboard/enrollment/PaymentsTable';

const SelectHouseholds = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid
                item
                md={9}
                xs={12}
                style={{ display: 'flex', gap: '1rem' }}
              >
                <TextField
                  id='area'
                  label='Search by'
                  variant='standard'
                  inputProps={{ type: 'text' }}
                  select
                  style={{ width: '40%' }}
                >
                  <MenuItem key={0} value={'Household code'}>
                    Household code
                  </MenuItem>
                  <MenuItem key={1} value={'Household code'}>
                    Household head
                  </MenuItem>
                  <MenuItem key={2} value={'Area'}>
                    Area
                  </MenuItem>
                  <MenuItem key={3} value={'Ward'}>
                    Ward
                  </MenuItem>
                  <MenuItem key={4} value={'Product of choice'}>
                    Product of choice
                  </MenuItem>
                </TextField>
                <SearchComponent
                  variant='standard'
                  label='Type household code'
                />
              </Grid>
            </CardContent>
            <Grid item>
              <PaymentsTable />
            </Grid>
            <Grid item>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SelectHouseholds;
