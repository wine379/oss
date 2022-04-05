import nc from 'next-connect';
import Area from '../../../models/Area';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const areas = await Area.findById(req.query.id);
  await db.disconnect();
  res.send(areas);
});

export default handler;
