import { Refresh, Search } from '@mui/icons-material'
import { AppBar, Button, Grid, IconButton, Paper, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/dashboard/Layout'
import styles from '../../styles/Home.module.css'

const Home = () => {
  return (
    <Layout>
      <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position='static'
          color='default'
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <Search color='inherit' sx={{ display: 'block' }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder='Search by email address, phone number, or user UID'
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant='standard'
                />
              </Grid>
              <Grid item>
                <Button variant='contained' sx={{ mr: 1 }}>
                  Add user
                </Button>
                <Tooltip title='Reload'>
                  <IconButton>
                    <Refresh color='inherit' sx={{ display: 'block' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color='text.secondary' align='center'>
          No users for this project yet
        </Typography>
      </Paper>
    </Layout>
  );
}

export default Home
