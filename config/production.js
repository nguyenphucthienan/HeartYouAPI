module.exports = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  secretKey: process.env.SECRET_KEY,
  token: {
    expirationTime: process.env.TOKEN_EXPIRATION_TIME
  }
};
