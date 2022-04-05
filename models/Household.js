import mongoose from 'mongoose';

const HouseholdSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    enrollmentStatus: {
      type: String,
      required: true,
    },
    adminNotes: {
      type: String,
      required: true,
    },
    blockName: {
      type: String,
      required: true,
    },
    plotNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    headName: {
      type: String,
      required: true,
    },
    headNatioalID: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    headPhone: {
      type: String,
      required: true,
    },
    headDateOfBirth: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mainSourceOfLiving: {
      type: String,
      required: true,
    },
    avarageMonthlyIncomeRange: {
      type: String,
      required: true,
    },
    homeOwnershipStatus: {
      type: String,
      required: true,
    },
    structureLocationZone: {
      type: String,
      required: true,
    },
    currentLatrineType: {
      type: String,
      required: true,
    },
    isVulnerable: {
      type: Boolean,
      required: true,
    },
    isPoor: {
      type: Boolean,
      required: true,
    },
    willPayFullForOSS: {
      type: Boolean,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const Household =
  mongoose.models.Contractor || mongoose.model('Household', HouseholdSchema);

export default Household;
