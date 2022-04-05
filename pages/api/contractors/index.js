import nc from 'next-connect';
import Contractor from '../../../models/Contractor';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const contractors = await Contractor.find({});
  await db.disconnect();
  res.send(contractors);
});

export default handler;
