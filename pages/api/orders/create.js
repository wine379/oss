import nc from 'next-connect';
import Area from '../../../models/Area';
import Ward from '../../../models/Ward';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import Household from '../../../models/Ward';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  const orderItemsArray = req.body.orderItemsArray
  const orderNumber = req.body.orderNumber
  const orderStatus = req.body.orderStatus
  const paymentOption = req.body.paymentOption
  const willPayFullForOSS = req.body.willPayFullForOSS;
           
  await db.connect();
  const newOrder = new Order({
    orderNumber,
    orderStatus,
    paymentOption,
    willPayFullForOSS,
    user: req.user._id,
  });
  const order = await newOrder.save();
  await db.disconnect();
  res.status(201).send({order});
});

export default handler;
