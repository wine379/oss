import nc from 'next-connect';
import Household from '../../models/Household';
import db from '../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const households = await Household.findMany({ user: req.user._id });
  await db.disconnect();
  const household = households[0]
  res.send(household);
});

export default handler;
