const mongoose = require('mongoose');

const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: STATUSES,
        message: 'Status must be one of: Wishlist, Applied, Interview, Offer, Rejected',
      },
      default: 'Wishlist',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    link: {
      type: String,
      trim: true,
      default: '',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
module.exports.STATUSES = STATUSES;
