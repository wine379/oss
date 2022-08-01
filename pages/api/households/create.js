import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import Household from '../../../models/Household';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  const adminNotes = req.body.adminNotes
  const area = req.body.area
  const avarageMonthlyIncomeRange = req.body.avarageMonthlyIncomeRange
  const blockName = req.body.blockName
  const code = req.body.code
  const currentLatrineType = req.body.currentLatrineType
  const homeOwnershipStatus = req.body.homeOwnershipStatus
  const isPoor = req.body.isPoor
  const isVulnerable = req.body.isVulnerable
  const mainSourceOfLiving = req.body.mainSourceOfLiving
  const name = req.body.name
  const plotNumber = req.body.plotNumber
  const structureLocationZone = req.body.structureLocationZone
  const ward = req.body.ward
  
  await db.connect();
  const newHousehold = new Household({
    householdHead,
    adminNotes,
    area,
    avarageMonthlyIncomeRange,
    blockName,
    code,
    currentLatrineType,
    homeOwnershipStatus,
    isPoor,
    isVulnerable,
    mainSourceOfLiving,
    name,
    plotNumber,
    structureLocationZone,
    ward,
  });
  const household = await newHousehold.save();
  await db.disconnect();
  res.status(201).send({ household });
});

export default handler;
