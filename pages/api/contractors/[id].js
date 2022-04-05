import nc from 'next-connect';
import Contractor from '../../../models/Contractor';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const contractor = await Contractor.findById(req.query.id);
  await db.disconnect();
  res.send(contractor);
});

export default handler;
