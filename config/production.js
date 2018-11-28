module.exports = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  secretKey: process.env.SECRET_KEY,
  token: {
    expirationTime: process.env.TOKEN_EXPIRATION_TIME
  },
  corsWhitelist: [process.env.CORS_WHITELIST],
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  }
};
