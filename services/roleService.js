const mongoose = require('mongoose');
const Role = mongoose.model('Role');

exports.getRoles = () => Role.find().exec();

exports.getRoleById = id => (
  Role.findById(id).exec()
);

exports.createRole = (role) => {
  const newRole = new Role({ ...role });
  return newRole.save();
};

exports.deleteRoleById = id => (
  Role.findByIdAndDelete(id).exec()
);
