import nc from 'next-connect';
import Ward from '../../../models/Ward';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const ward = await Ward.findById(req.query.id);
  await db.disconnect();
  res.send(ward);
});

export default handler;
