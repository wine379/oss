import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  InputLabel,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import Cookies from 'js-cookie';
import Layout from '../components/website/Layout';
import useStyles from '../utils/website/styles';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/website/CheckoutWizard';
import db from '../utils/db';
import Area from '../models/Area';
import Ward from '../models/Ward';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
import axios from 'axios';

let orderItemsArray = [];

const extractOrderItems = (items) => {
  items.map((item) => {
    const productId = item._id
    const quantity = item.quantity

    orderItemsArray.push({ productId, quantity });
  })
}


const PlaceOrder = (props) => {
  const { areas, wards } = props;
    const { state, dispatch } = useContext(Store);
    const router = useRouter;
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const {
      userInfo,
      cart: { cartItems, householdDetails, location, paymentMethod },
    } = state;

    const dateNow = new Date();
    const milliseconds = dateNow.getTime();
    const hexadicmalMilliseconds = milliseconds.toString(16);
    const householdPrefix = 'HH';
    const orderPrefix = 'OD';
    const genRanHex = (size) =>
      [...Array(size)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
    const suffix = genRanHex(1);
    const householdCode = `${householdPrefix}${hexadicmalMilliseconds}${suffix}`;
    const orderNumber = `${orderPrefix}${hexadicmalMilliseconds}${suffix}`;
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    const itemsPrice = round2(
      cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    );

    useEffect(() => {
      if (!userInfo) {
        router.push('/login?redirect=/payment');
      }
      if (!paymentMethod) {
        router.push('/payment');
      }
      if (cartItems.length === 0) {
        router.push('/cart');
      }
    }, []);

    const [loading, setLoading] = useState(false);

    const placeOrderHandler = async () => {
      closeSnackbar();

      const areaData = areas.filter( area => area.name === location.area)
      const wardData = wards.filter( ward => ward.name === location.ward);

      const area = areaData[0]
      const ward = wardData[0]

      const areaId = area._id
      const wardId = ward._id

      const isPoor = householdDetails.isPoor === 'Yes' ? true : false;
      const isVulnerable =
        householdDetails.isVulnerable === 'Yes' ? true : false;
      const blockName = location.blockName;
      const willPayFullForOSS =
        paymentMethod.willPayFullForOSS === 'Yes' ? true : false;

      const householdInput = {
        ...householdDetails,
        code: householdCode,
        blockName,
        isPoor,
        isVulnerable,
        willPayFullForOSS,
        adminNotes:
          'This household was registered through the website on ' +
          new Date().toDateString(),
        enrollmentStatus: 'Pending',
        structureLocationZone: location.structureLocationZone,
        areaId,
        wardId
      };

      extractOrderItems(cartItems)

      const orderDetails = {
        orderItemsArray,
        orderNumber,
        orderStatus: 'Pending',
        paymentOption: paymentMethod.paymentOption,
        willPayFullForOSS,
       };

      try {
        console.log({
          orderDetails,
          householdInput,
        });

        setLoading(true);

        const { orderData } = await axios.post(
          '/api/orders/create',
          {
            orderItemsArray,
            orderNumber,
            orderStatus: 'Pending',
            paymentOption: paymentMethod.paymentOption,
            willPayFullForOSS,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        // code:householdInput.code,
        // enrollmentStatus: householdInput.enrollmentStatus,
        // adminNotes: householdInput.adminNotes,
        // blockName: householdInput.blockName,
        // plotNumber: householdInput.plotNumber,
        // name: householdInput.name,
        // mainSourceOfLiving: householdInput.mainSourceOfLiving,
        // avarageMonthlyIncomeRange: householdInput.avarageMonthlyIncomeRange,
        // homeOwnershipStatus: householdInput.homeOwnershipStatus,
        // structureLocationZone: householdInput.structureLocationZone,
        // currentLatrineType: householdInput.name,
        // isVulnerable: householdInput.name,
        // isPoor: householdInput.name,
        // willPayFullForOSS: householdInput.name,

        console.log(orderData);

        // dispatch({ type: 'CLEAR_CART' });
        // Cookies.remove('cartItems');
        // setLoading(false);
        // router.push(`/order/${orderData._id}`);
      } catch (e) {
        setLoading(false);
        enqueueSnackbar(getError(e), { variant: 'error' });
      }
    };

    return (
      <Layout title='Place Order'>
        <div className={classes.checkoutWizard}></div>
        <CheckoutWizard activeStep={4} />
        <Typography component='h1' variant='h4'>
          Place Order
        </Typography>

        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component='h2' variant='h5'>
                    {' '}
                    Household Details{' '}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    <strong>Household name: </strong>
                    {householdDetails.name}
                    {', '}
                    <strong>Plot number: </strong>
                    {householdDetails.plotNumber}
                    {', '}
                    <strong>Home ownership status: </strong>
                    {householdDetails.homeOwnershipStatus}
                    {', '}
                    <strong>Current currentLatrineType: </strong>
                    {householdDetails.currentLatrineType}
                    {', '}
                    <strong>Is Household Poor?: </strong>
                    {householdDetails.isPoor}
                    {', '}
                    <strong>Is Household Vulnerable?: </strong>
                    {householdDetails.isVulnerable}
                  </Typography>
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component='h2' variant='h5'>
                    {' '}
                    Household Location{' '}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    <strong>Area name: </strong>
                    {location.area}
                    {', '}
                    <strong>Block name: </strong>
                    {location.blockName}
                    {', '}
                    <strong>Ward name: </strong>
                    {location.ward}
                    {', '}
                    <strong>Structure location zone: </strong>
                    {location.structureLocationZone}
                  </Typography>
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component='h2' variant='h5'>
                    {' '}
                    Payment options{' '}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    <strong>Payment Option: </strong>
                    {paymentMethod.paymentOption}
                    {', '}
                    <strong>
                      Can household afford to pay in full for OSS?:{' '}
                    </strong>
                    {paymentMethod.willPayFullForOSS}
                  </Typography>
                </ListItem>
              </List>
            </Card>

            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component='h2' variant='h2'>
                    {' '}
                    Order Items{' '}
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align='right'>Quantity</TableCell>
                          <TableCell align='right'>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align='right'>
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align='right'>
                              <Typography>MWK{item.price}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
              <Grid item md={9} xs={12}></Grid>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component='h2' variant='h4'>
                    Order Summary
                  </Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Items:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='right'>MWK{itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='right'>
                        <strong>MWK{itemsPrice}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={placeOrderHandler}
                    variant='contained'
                    color='primary'
                    fullWidth
                  >
                    Place Order
                  </Button>
                </ListItem>
                {loading && (
                  <ListItem>
                    <CircularProgress />
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    );
};

export const getServerSideProps = async () => {
  await db.connect();
  const areas = await Area.find({}).lean();
  const wards = await Ward.find({}).lean();
  await db.disconnect();
  return {
    props: {
      areas: areas.map((area) => db.convertDocToObj(area)),
      wards: wards.map((ward) => db.convertDocToObj(ward)),
    },
  };
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });


// import React, { useContext, useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';
// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Card,
//   Grid,
//   Link,
//   List,
//   ListItem,
//   Typography,
//   Button,
//   CircularProgress,
// } from '@mui/material';
// import NextLink from 'next/link';
// import Image from 'next/image';
// import useRouter from 'next/router';
// import Layout from '../components/website/Layout';
// import { Store } from '../utils/Store';
// import useStyles from '../utils/website/styles';
// import CheckoutWizard from '../components/website/CheckoutWizard';
// import { useSnackbar } from 'notistack';
// import { getError } from '../utils/error';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import db from '../utils/db';
// import Area from '../models/Area';
// import Ward from '../models/Ward';

// const PlaceOrder = () => {
  // const { state, dispatch } = useContext(Store);
  // const router = useRouter;
  // const classes = useStyles();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const {
  //   userInfo,
  //   cart: { cartItems, householdDetails, location, paymentMethod },
  // } = state;

  // const dateNow = new Date();
  // const milliseconds = dateNow.getTime();
  // const hexadicmalMilliseconds = milliseconds.toString(16);
  // const householdPrefix = 'HH';
  // const orderPrefix = 'OD';
  // const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  // const suffix = genRanHex(1);
  // const householdCode = `${householdPrefix}${hexadicmalMilliseconds}${suffix}`;
  // const orderNumber = `${orderPrefix}${hexadicmalMilliseconds}${suffix}`;
  // const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  // const itemsPrice = round2(
  //   cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  // );

  // useEffect(() => {
  //   if (!userInfo) {
  //     router.push('/login?redirect=/payment');
  //   }
  //   if (!paymentMethod) {
  //     router.push('/payment');
  //   }
  //   if (cartItems.length === 0) {
  //     router.push('/cart');
  //   }
  // }, []);

  // const [loading, setLoading] = useState(false);

  // const placeOrderHandler = async (props) => {
  //   closeSnackbar();

    

  //   // const { areas, wards } = props;
  //   // const area = areas.filter( area => area.name === location.area.name)
  //   // const ward = wards.filter((ward) => ward.name === location.ward.name);

  //   const isPoor = householdDetails.isPoor === 'Yes' ? true : false;
  //   const isVulnerable = householdDetails.isVulnerable === 'Yes' ? true : false;
  //   const blockName = location.blockName;
  //   const willPayFullForOSS = paymentMethod.willPayFullForOSS === 'Yes' ? true : false;
    
  //   const householdInput = {
  //     ...householdDetails,
  //     code: householdCode,
  //     blockName,
  //     isPoor,
  //     isVulnerable,
  //     willPayFullForOSS,
  //     adminNotes: 'This household was registered through the website on ' + new Date().toDateString(),
  //     enrollmentStatus: 'Pending',
  //   };

  //   const orderDetails = {
  //     ...cartItems,
  //     orderNumber,
  //     orderStatus: 'Pending',
  //     paymentOption: paymentMethod.paymentOption,
  //     willPayFullForOSS,
  //   };

    
  //   try {
  //     console.log({
  //       orderDetails,
  //       householdInput,
  //       location,
  //       paymentMethod,
  //     });

  //     console.log(props);

  //     // setLoading(true);
  //     // const { data } = await axios.post(
  //     //   '/api/orders/',
  //     //   {
  //     //     orderItems: { ...cartItems, orderNumber, orderStatus: 'Pending' },
  //     //     householdDetails: {
  //     //       ...householdDetails,
  //     //       code: householdCode,
  //     //       adminNotes:
  //     //         'This household was registered through the website on ' +
  //     //         new Date().toDateString(),
  //     //       enrollmentStatus: 'Pending',
  //     //     },

  //     //     location,
  //     //     paymentMethod,
  //     //   },
  //     //   {
  //     //     headers: {
  //     //       authorization: `Bearer ${userInfo.token}`,
  //     //     },
  //     //   }
  //     // );

  //     // dispatch({ type: 'CLEAR_CART' });
  //     // Cookies.remove('cartItems');
  //     // setLoading(false);
  //     // router.push(`/order/${data._id}`);
  //   } catch (e) {
  //     setLoading(false);
  //     enqueueSnackbar(getError(e), { variant: 'error' });
  //   }
  // };

  

  // return (
  //   <Layout title='Place Order'>
  //     <div className={classes.checkoutWizard}></div>
  //     <CheckoutWizard activeStep={4} />
  //     <Typography component='h1' variant='h4'>
  //       Place Order
  //     </Typography>

  //     <Grid container spacing={1}>
  //       <Grid item md={9} xs={12}>
  //         <Card className={classes.section}>
  //           <List>
  //             <ListItem>
  //               <Typography component='h2' variant='h5'>
  //                 {' '}
  //                 Household Details{' '}
  //               </Typography>
  //             </ListItem>
  //             <ListItem>
  //               <Typography>
  //                 <strong>Household name: </strong>
  //                 {householdDetails.name}
  //                 {', '}
  //                 <strong>Plot number: </strong>
  //                 {householdDetails.plotNumber}
  //                 {', '}
  //                 <strong>Home ownership status: </strong>
  //                 {householdDetails.homeOwnershipStatus}
  //                 {', '}
  //                 <strong>Current currentLatrineType: </strong>
  //                 {householdDetails.currentLatrineType}
  //                 {', '}
  //                 <strong>Is Household Poor?: </strong>
  //                 {householdDetails.isPoor}
  //                 {', '}
  //                 <strong>Is Household Vulnerable?: </strong>
  //                 {householdDetails.isVulnerable}
  //               </Typography>
  //             </ListItem>
  //           </List>
  //         </Card>
  //         <Card className={classes.section}>
  //           <List>
  //             <ListItem>
  //               <Typography component='h2' variant='h5'>
  //                 {' '}
  //                 Household Location{' '}
  //               </Typography>
  //             </ListItem>
  //             <ListItem>
  //               <Typography>
  //                 <strong>Area name: </strong>
  //                 {location.area}
  //                 {', '}
  //                 <strong>Block name: </strong>
  //                 {location.blockName}
  //                 {', '}
  //                 <strong>Ward name: </strong>
  //                 {location.ward}
  //                 {', '}
  //                 <strong>Structure location zone: </strong>
  //                 {location.structureLocationZone}
  //               </Typography>
  //             </ListItem>
  //           </List>
  //         </Card>
  //         <Card className={classes.section}>
  //           <List>
  //             <ListItem>
  //               <Typography component='h2' variant='h5'>
  //                 {' '}
  //                 Payment options{' '}
  //               </Typography>
  //             </ListItem>
  //             <ListItem>
  //               <Typography>
  //                 <strong>Payment Option: </strong>
  //                 {paymentMethod.paymentOption}
  //                 {', '}
  //                 <strong>
  //                   Can household afford to pay in full for OSS?:{' '}
  //                 </strong>
  //                 {paymentMethod.willPayFullForOSS}
  //               </Typography>
  //             </ListItem>
  //           </List>
  //         </Card>

  //         <Card className={classes.section}>
  //           <List>
  //             <ListItem>
  //               <Typography component='h2' variant='h2'>
  //                 {' '}
  //                 Order Items{' '}
  //               </Typography>
  //             </ListItem>
  //             <ListItem>
  //               <TableContainer>
  //                 <Table>
  //                   <TableHead>
  //                     <TableRow>
  //                       <TableCell>Image</TableCell>
  //                       <TableCell>Name</TableCell>
  //                       <TableCell align='right'>Quantity</TableCell>
  //                       <TableCell align='right'>Price</TableCell>
  //                     </TableRow>
  //                   </TableHead>
  //                   <TableBody>
  //                     {cartItems.map((item) => (
  //                       <TableRow key={item._id}>
  //                         <TableCell>
  //                           <NextLink href={`/product/${item.slug}`} passHref>
  //                             <Link>
  //                               <Image
  //                                 src={item.image}
  //                                 alt={item.name}
  //                                 width={50}
  //                                 height={50}
  //                               ></Image>
  //                             </Link>
  //                           </NextLink>
  //                         </TableCell>
  //                         <TableCell>
  //                           <NextLink href={`/product/${item.slug}`} passHref>
  //                             <Link>
  //                               <Typography>{item.name}</Typography>
  //                             </Link>
  //                           </NextLink>
  //                         </TableCell>
  //                         <TableCell align='right'>
  //                           <Typography>{item.quantity}</Typography>
  //                         </TableCell>
  //                         <TableCell align='right'>
  //                           <Typography>MWK{item.price}</Typography>
  //                         </TableCell>
  //                       </TableRow>
  //                     ))}
  //                   </TableBody>
  //                 </Table>
  //               </TableContainer>
  //             </ListItem>
  //           </List>
  //           <Grid item md={9} xs={12}></Grid>
  //         </Card>
  //       </Grid>
  //       <Grid item md={3} xs={12}>
  //         <Card className={classes.section}>
  //           <List>
  //             <ListItem>
  //               <Typography component='h2' variant='h4'>
  //                 Order Summary
  //               </Typography>
  //             </ListItem>
  //             <ListItem>
  //               <Grid container>
  //                 <Grid item xs={6}>
  //                   <Typography>Items:</Typography>
  //                 </Grid>
  //                 <Grid item xs={6}>
  //                   <Typography align='right'>MWK{itemsPrice}</Typography>
  //                 </Grid>
  //               </Grid>
  //             </ListItem>
  //             <ListItem>
  //               <Grid container>
  //                 <Grid item xs={6}>
  //                   <Typography>
  //                     <strong>Total:</strong>
  //                   </Typography>
  //                 </Grid>
  //                 <Grid item xs={6}>
  //                   <Typography align='right'>
  //                     <strong>MWK{itemsPrice}</strong>
  //                   </Typography>
  //                 </Grid>
  //               </Grid>
  //             </ListItem>
  //             <ListItem>
  //               <Button
  //                 onClick={placeOrderHandler}
  //                 variant='contained'
  //                 color='primary'
  //                 fullWidth
  //               >
  //                 Place Order
  //               </Button>
  //             </ListItem>
  //             {loading && (
  //               <ListItem>
  //                 <CircularProgress />
  //               </ListItem>
  //             )}
  //           </List>
  //         </Card>
  //       </Grid>
  //     </Grid>
  //   </Layout>
  // );
// };

// export const getServerSideProps = async () => {
//   await db.connect();
//   const areas = await Area.find({}).lean();
//   const wards = await Ward.find({}).lean();
//   await db.disconnect();
//   return {
//     props: {
//       areas: areas.map((area) => db.convertDocToObj(area)),
//       wards: wards.map((ward) => db.convertDocToObj(ward)),
//     },
//   };
// };

// export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
