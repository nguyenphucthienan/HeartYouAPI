const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.getUsers = (pageNumber, pageSize, filterObj, sortObj) => (
  User.aggregate([
    { $match: filterObj },
    {
      $lookup: {
        from: 'roles',
        localField: 'roles',
        foreignField: '_id',
        as: 'roles'
      },
    },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
        username: 1,
        firstName: 1,
        lastName: 1,
        photoUrl: 1,
        'roles._id': 1,
        'roles.name': 1,
      }
    },
    { $sort: sortObj },
    { $skip: (pageNumber - 1) * pageSize },
    { $limit: pageSize }
  ])
);

exports.getUserById = (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return User.findById({ _id })
    .populate('roles')
    .exec();
};

exports.getUserByUsername = username => (
  User.findOne({ username })
    .populate('roles')
    .exec()
);

exports.createUser = (user) => {
  const newUser = new User({ ...user });
  return newUser.save();
};

exports.updateUserById = (id, user) => (
  User.findByIdAndUpdate(id, user, { new: true }).exec()
);

exports.deleteUserById = id => (
  User.findByIdAndDelete(id).exec()
);

exports.countUsers = filterObj => (
  User.find(filterObj)
    .then(users => users.length)
);

exports.generateTokenForUser = (user) => {
  const roles = user.roles.map(role => role.name);
  return jwt.sign(
    {
      id: user.id,
      nameid: user.username,
      name: `${user.firstName} ${user.lastName}`,
      role: roles
    },
    config.secretKey,
    { expiresIn: config.token.expirationTime }
  );
};
