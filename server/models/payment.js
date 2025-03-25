const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, // Reference to User
    price: { type: Number, required: true },
    token: { type: Number, required: true },
    remainingToken: { type: Number, required: true },
    status: { type: String, required: true },
    transactionId: {type:String, required:true}
  },
  { timestamps: true }
);

const Payment = mongoose.model('payments', PaymentSchema);

module.exports = Payment;
