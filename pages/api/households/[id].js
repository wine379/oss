import nc from 'next-connect';
import Household from '../../../models/Household';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const household = await Household.findById(req.query.id);
  await db.disconnect();
  res.send(household);
});

export default handler;
