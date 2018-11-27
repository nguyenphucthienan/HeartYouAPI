const _ = require('lodash');
const userService = require('../services/userService');

exports.register = async (req, res) => {
  const {
    username,
    password,
    firstName,
    lastName
  } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'You must provide username and password' });
  }

  if (!firstName || !lastName) {
    return res.status(400).send({ message: 'You must provide first name and last name' });
  }

  const user = await userService.getUserByUsername(username);

  if (user) {
    return res.status(409).send({ message: 'Username already exists' });
  }

  const newUser = await userService.createUser(req.body);
  const token = userService.generateTokenForUser(newUser);
  return res.send({ token });
};

exports.checkUsername = async (req, res) => {
  const { username } = req.body;
  const user = await userService.getUserByUsername(username);

  if (!user) {
    return res.send({ result: true });
  }

  return res.send({ result: false });
};

exports.logIn = async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  const token = userService.generateTokenForUser(user);
  return res.send({ token });
};

exports.currentUser = async (req, res) => {
  const returnUser = _.omit(req.user.toObject(), ['password']);
  return res.send(returnUser);
};
