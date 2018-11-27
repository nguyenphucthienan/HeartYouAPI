const _ = require('lodash');
const mongoose = require('mongoose');
const Role = mongoose.model('Role');

const RoleNames = require('../constants/RoleNames');

function seedRoles() {
  _.each(RoleNames, async (roleName) => {
    const role = await Role.findOne({ name: roleName });

    if (!role) {
      const newRole = new Role({ name: roleName });
      await newRole.save();
    }
  });
}

seedRoles();
