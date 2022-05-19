import nc from 'next-connect';
import bcrypt from 'bcrypt';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

export default handler;
