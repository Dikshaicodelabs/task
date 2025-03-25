const Payment = require('../models/payment');

const pay = async (req, res) => {
  try {
    const { user, price, token, remainingToken, status, transactionId } = req.body;

    if (!user || !price || !token || !remainingToken || !status ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const payment = new Payment({
      user: user, // Associate payment with user
      price,
      token,
      remainingToken,
      status,
      transactionId
    });

    await payment.save();
    res.status(201).send({ message: 'Payment created successfully', payment });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};

module.exports = pay;

// const Payment = require('../models/payment');

// const pay = async (req, res) => {
//   try {
//     const { price, token, remainingToken, status } = req.body;

//     if (!price || !token || !remainingToken || !status) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const payment = new Payment({
//       price,
//       token,
//       remainingToken,
//       status,
//     });

//     await payment.save();
//     res.status(201).send({ message: 'Payment created successfully', payment });
//   } catch (error) {
//     res.status(500).send({ message: 'Server error', error: error.message });
//   }
// };

// module.exports = pay;
