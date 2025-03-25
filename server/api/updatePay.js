const Payment = require('../models/payment');

const updatePay = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const payment = await Payment.findByIdAndUpdate(id, { status }, { new: true });

    if (!payment) {
      return res.status(404).send({ message: 'Payment not found' });
    }

    res.status(200).send({ message: 'Payment status updated successfully', payment });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};

module.exports = updatePay;
