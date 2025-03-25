const { types } = require('sharetribe-flex-integration-sdk');
const { getISdk } = require('../api-util/sdk');
const isdk = getISdk();
const { UUID } = types;

/**
 * @function updateToken
 * @description Updates a user's token balance by adding a refund amount to their existing token balance.
 * @param {Object} req - Express request object containing the user ID and refund amount in the request body.
 * @param {Object} res - Express response object to send back the success or error response.
 * @returns {Object} JSON response with a success message and updated user data, or an error message.
 */
const updateToken = async (req, res) => {
  const body = req.body;

  try {
    // Fetch the user details using the provided user ID
    const resp = await isdk.users.show({ id: new UUID(body.id) });
    const { data } = resp || {};
    const { data: respData } = data || {};
    const { attributes } = respData || {};
    const { profile } = attributes || {};
    const { publicData } = profile || {};
    const { token } = publicData || {};

    // Calculate the updated token balance
    const updatedToken = Number(token) + Number(body?.refundAmount); // Ensure numerical addition
    console.log(updateToken, 'updated Token ');
    // Update the user's profile with the new token balance
    const updatedData = await isdk.users.updateProfile({
      id: new UUID(body.id),
      publicData: { ...publicData, token: updatedToken },
    });

    // Send a success response with updated data
    return res.status(200).send({ message: 'Amount refunded successfully', updatedData });
  } catch (error) {
    // Handle errors and send a server error response
    return res.status(500).send({ message: 'Server error', error: error.message });
  }
};

// Export the function for external usage
module.exports = updateToken;
