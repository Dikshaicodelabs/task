const { types } = require('sharetribe-flex-integration-sdk');
const isdk = getISdk();
const { UUID } = types;

const updateToken = async(req, res) => {
    const body = req.body
    try {
        const resp = await isdk.users.show({ id: new UUID(body.id) });
    } catch (error) {
        
    }
}

module.exports = updateToken