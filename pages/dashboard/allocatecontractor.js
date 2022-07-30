import { Refresh, Search } from '@mui/icons-material';
import {
  AppBar,
  Card,
  CardContent,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import CustomCard from '../../components/dashboard/common/CustomCard';
import CustomTabs from '../../components/dashboard/common/CustomTabs';
import AssignContractorTable from '../../components/dashboard/enrollment/AssignContractorTable';
import Layout from '../../components/dashboard/Layout';
import styles from '../../styles/Home.module.css';
import EnrollmentWizard from '../../components/dashboard/EnrollmentWizard';
import useStyles from '../../utils/website/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';


const AllocateContractor = () => {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();

  const submitHandler = () => {
    router.push('/dashboard/enrollhouseholds');
  };

  return (
    <Layout>
      <div className={classes.checkoutWizard}></div>
      <EnrollmentWizard activeStep={1} />
      <div></div>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
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
                    label='Assign contractor'
                    variant='standard'
                    inputProps={{ type: 'text' }}
                    select
                    style={{ width: '40%' }}
                  >
                    <MenuItem key={0} value={'Contractor A'}>
                      Contractor A
                    </MenuItem>
                    <MenuItem key={1} value={'Contractor B'}>
                      Contractor B
                    </MenuItem>
                    <MenuItem key={2} value={'Contractor C'}>
                      Contractor C
                    </MenuItem>
                  </TextField>
                </Grid>
              </CardContent>
              <Grid item>
                <AssignContractorTable />
              </Grid>
              <Grid item>
                <List>
                  <ListItem>
                    <Button
                      variant='contained'
                      type='submit'
                      fullWidth
                      color='primary'
                    >
                      Continue
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      type='button'
                      variant='contained'
                      color='secondary'
                      fullWidth
                      onClick={() => router.push('/dashboard/selecthouseholds')}
                    >
                      Back
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default AllocateContractor;
