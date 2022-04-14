import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from './Typography';
import TextField from './TextField';
import Image from 'next/image';
import useStyles from '../../utils/website/styles';

const Copyright = () => {
  return (
    <React.Fragment>
      <br />
      {'© '} &nbsp;
      <Link color='inherit' href='https://lcc.mw/'>
        Lilongwe City Assembly
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
];

const AppFooter = () => {
  const classes = useStyles();
  return (
    // <footer>
    //   <br />
    //   <Box sx={{ display: 'flex', bgcolor: 'secondary.main' }}>
    //     <Container maxWidth='lg'>
    // <Grid container spacing={5}>
    //   <Grid item xs={12} md={4}>
    //     <Box borderBottom={1}>Help</Box>
    //     <Box>
    //       <Link href='/' color='inherit'>
    //         Contact
    //       </Link>
    //     </Box>
    //     <Box>
    //       <Link href='/' color='inherit'>
    //         Support
    //       </Link>
    //     </Box>
    //     <Box>
    //       <Link href='/' color='inherit'>
    //         Privacy
    //       </Link>
    //     </Box>
    //   </Grid>
    //   <Grid item xs={12} md={4}>
    //     <Box borderBottom={1}>Partniers</Box>
    //     <Box>
    //       <Link href='https://lwb.mw' color='inherit'>
    //         Lilongwe Water Board
    //       </Link>
    //     </Box>
    //     <Box>
    //       <Link href='https://lcc.mw' color='inherit'>
    //         Lilongwe City Assembly
    //       </Link>
    //     </Box>
    //     <Box>
    //       <Link href='/' color='inherit'>
    //         Italy
    //       </Link>
    //     </Box>
    //   </Grid>
    //   <Grid item xs={12} md={4}>
    //     <Box borderBottom={1}>Resources</Box>
    //     <Box>
    //       <Link href='/' color='inherit'>
    //         Download product catalogue
    //       </Link>
    //     </Box>
    //     <Box>
    //       <Link href='/' color='inherit'>
    //         Download project leaflet
    //       </Link>
    //     </Box>
    //     <Box>
    //       <Link href='/' color='inherit'>
    //         Download project progress report
    //       </Link>
    //     </Box>
    //   </Grid>
    // </Grid>
    // <Grid
    //   style={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
    // >
    //   <p></p>
    //   <Copyright style='white-space: pre-line' />{' '}
    // </Grid>
    //     </Container>
    //   </Box>
    // </footer>

    <Typography
      component='footer'
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      sx={{ display: 'flex', bgcolor: 'secondary.main', color: 'primary.dark' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box borderBottom={1}>Help</Box>
            <Box>
              <Link href='/' color='inherit'>
                Contact us
              </Link>
            </Box>
            <Box>
              <Link href='/' color='inherit'>
                Support
              </Link>
            </Box>
            <Box>
              <Link href='/' color='inherit'>
                Privacy
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box borderBottom={1}>Partniers</Box>
            <Box>
              <Link href='https://www.lwb.mw' color='inherit'>
                Lilongwe Water Board
              </Link>
            </Box>
            <Box>
              <Link href='https://lcc.mw' color='inherit'>
                Lilongwe City Assembly
              </Link>
            </Box>
            <Box>
              <Link href='/' color='inherit'>
                Italy
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box borderBottom={1}>Resources</Box>
            <Box>
              <Link href='/' color='inherit'>
                Download product catalogue
              </Link>
            </Box>
            <Box>
              <Link href='/' color='inherit'>
                Download project leaflet
              </Link>
            </Box>
            <Box>
              <Link href='/' color='inherit'>
                Download project progress report
              </Link>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              textAlign='center'
              pt={{ xs: 2, sm: 5 }}
            >
              <Copyright />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}

export default  AppFooter;