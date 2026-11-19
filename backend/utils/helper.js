const jwt = require('jsonwebtoken')

module.exports.generateJwtToken = async (payload, secret, expire) => {
  return await jwt.sign(payload, secret, { expiresIn: expire });
};

module.exports.verifyAccessToken = async (token) => {
  return await jwt.verify(token, process.env.ACCESS_SECRET);
};

module.exports.verifyRefreshToken = async (token) => {
  return await jwt.verify(token, process.env.REFRESH_SECRET);
};
module.exports.baseUrl = () => {
  return process.env.BASE_URL;
}
