import nc from 'next-connect';
import Product from '../../models/Product';
import User from '../../models/User';
import Area from '../../models/Area';
import Contractor from '../../models/Contractor';
import Household from '../../models/Household';
import Ward from '../../models/Ward';
import db from '../../utils/db';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await User.deleteMany();
  await User.insertMany(data.users);
  await Area.deleteMany();
  await Area.insertMany(data.areas);
  await Contractor.deleteMany();
  await Contractor.insertMany(data.contractors);
  await Household.deleteMany();
  await Household.insertMany(data.households);
  await Ward.deleteMany();
  await Ward.insertMany(data.wards);
  await db.disconnect();
     
  res.send({ message: 'Database seeded successfully' });
});

export default handler;
