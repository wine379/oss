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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    ward: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward' },
  },
  {
    timestamps: true,
  }
);

const Household =
  mongoose.models.Household || mongoose.model('Household', HouseholdSchema);

export default Household;
