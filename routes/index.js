const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const roleController = require('../controllers/roleController');
const { catchErrors } = require('../handlers/errorHandlers');

const {
  requireLocalAuth,
  requireJwtAuth
} = require('../middlewares/passportAuth');

const requireRoles = require('../middlewares/requireRoles');
const RoleNames = require('../constants/RoleNames');

router.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

router.post('/auth/register',
  catchErrors(authController.register));

router.post('/auth/check-username',
  catchErrors(authController.checkUsername));

router.post('/auth/login',
  requireLocalAuth,
  catchErrors(authController.logIn));

router.get('/auth/me',
  requireJwtAuth,
  catchErrors(authController.currentUser));

router.get('/users',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(userController.getUsers));

router.get('/users/:id',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(userController.getUser));

router.post('/users',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(userController.createUser));

router.put('/users/:id',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(userController.updateUser));

router.delete('/users/:id',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(userController.deleteUser));

router.get('/roles',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(roleController.getRoles));

router.get('/roles/:id',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(roleController.getRole));

router.post('/roles',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(roleController.createRole));

router.delete('/roles/:id',
  requireJwtAuth,
  requireRoles([RoleNames.ADMIN]),
  catchErrors(roleController.deleteRole));

module.exports = router;
