const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    price: { type: Number },
    token: { type: Number },
    remainingToken: { type: Number },
    status: { type: String },
  },
  { timestamps: true }
);

const Payment = mongoose.model('payments', PaymentSchema);

module.exports = Payment;
