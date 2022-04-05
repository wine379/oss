import nc from 'next-connect';
import Household from '../../../models/Household';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const households = await Household.find({});
  await db.disconnect();
  res.send(households);
});

export default handler;
