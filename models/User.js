const mongoose = require('mongoose');
const { Schema } = mongoose;
const Role = mongoose.model('Role');
const bcrypt = require('bcrypt-nodejs');
const BcryptHelpers = require('../helpers/BcryptHelpers');

const userSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required',
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    required: 'First name is required'
  },
  lastName: {
    type: String,
    required: 'First name is required'
  },
  photoUrl: {
    type: String,
    trim: true
  },
  moodMessage: {
    type: String,
    default: 'Curious? Just ask!'
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

userSchema.pre('save', async function hashPassword(next) {
  const user = this;

  const memberRole = await Role.findOne({ name: 'Member' });
  user.roles.push(memberRole);

  try {
    user.password = await BcryptHelpers.hashPassword(user.password);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function comparePassword(inputPassword, callback) {
  bcrypt.compare(inputPassword, this.password, (err, result) => {
    if (err) {
      return callback(err);
    }

    return callback(null, result);
  });
};

mongoose.model('User', userSchema);
