const { types } = require('sharetribe-flex-integration-sdk');
const { getISdk } = require('../api-util/sdk');
const isdk = getISdk();
const { UUID } = types;

const updateTransaction = async (req, res) => {
  const body = req.body;
  try {
    const transaction = await isdk.transactions.updateMetadata({
      id: new UUID(body.id),
      metadata: {
        ...body.mongoTransaction,
      },
    });
    return res.status(200).send({ message: 'Amount refunded successfully', updatedData: '' });
  } catch (error) {
    return res.status(500).send({ message: 'Server error', error: error.message });
  }
};

module.exports = updateTransaction;
