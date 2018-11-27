const bcrypt = require('bcrypt-nodejs');

class BcryptHelpers {
  static hashPassword(password) {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (genSaltErr, salt) => {
        if (genSaltErr) {
          return reject(genSaltErr);
        }

        return bcrypt.hash(password, salt, null, (hashErr, hashedPassword) => {
          if (hashErr) {
            return reject(hashErr);
          }

          return resolve(hashedPassword);
        });
      });
    });
  }

  static comparePassword(inputPassword, dbPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(inputPassword, dbPassword, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }
}

module.exports = BcryptHelpers;
