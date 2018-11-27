const _ = require('lodash');
const userService = require('../services/userService');
const Pagination = require('../helpers/Pagination');
const ServiceHelpers = require('../helpers/ServiceHelpers');
const BcryptHelpers = require('../helpers/BcryptHelpers');

exports.getUsers = async (req, res) => {
  const pageNumber = Math.max(0, parseInt(req.query.pageNumber, 10)) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 5;

  const { filter, sort } = req.query;
  const filterObj = ServiceHelpers.createUserFilterObject(filter);
  const sortObj = ServiceHelpers.createSortObject(sort);

  const users = await userService.getUsers(pageNumber, pageSize, filterObj, sortObj);
  const totalItems = await userService.countUsers(filterObj);

  const data = {
    items: users,
    pagination: new Pagination(pageNumber, pageSize, totalItems)
  };

  return res.send(data);
};

exports.getUser = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).send();
  }

  return res.send(user);
};

exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'You must provide username and password' });
  }

  const user = await userService.getUserByUsername(username);

  if (user) {
    return res.status(409).send({ message: 'Username already exists' });
  }

  const newUser = await userService.createUser(req.body);
  const returnUser = _.omit(newUser.toObject(), ['password']);
  return res.send(returnUser);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const hashedPassword = await BcryptHelpers.hashPassword(req.body.password);
  if (!hashedPassword) {
    return res.status(500).send();
  }

  const user = { ...req.body, password: hashedPassword };
  const updatedUser = await userService.updateUserById(id, user);

  if (!user) {
    return res.status(404).send();
  }

  const returnUser = _.omit(updatedUser.toObject(), ['password']);
  return res.send(returnUser);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await userService.deleteUserById(id);

  if (!user) {
    return res.status(404).send();
  }

  return res.send(user);
};
