import nc from 'next-connect';
import Ward from '../../../models/Ward';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const wards = await Ward.find({});
  await db.disconnect();
  res.send(wards);
});

export default handler;
