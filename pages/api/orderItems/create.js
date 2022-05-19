import nc from 'next-connect';
import OrderItem from '../../../models/OrderItem';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  const order = req.body.order;
  const product = req.body.product;
  const quantity = req.body.quantity;

  await db.connect();
  const newOrderItem = new OrderItem({
    order,
    product,
    quantity,
    user: req.user._id,
  });
  const orderItem = await newOrderItem.save();
  await db.disconnect();
  res.status(201).send({ orderItem });
});

export default handler;
