import nc from 'next-connect';
import OrderItem from '../../../../models/OrderItem';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';

const handler = nc();
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const orderItems = await OrderItem.find({ order: req.query.id }).populate(
    'product',
    ['slug', 'name', 'price', 'image']
  );
  await db.disconnect();
  res.send(orderItems);
});

export default handler;
