const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const roleController = require('../controllers/roleController');
const questionController = require('../controllers/questionController');
const uploadController = require('../controllers/uploadController');
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

router.get('/users/:id/following', userController.getFollowingList);
router.get('/users/:id/followers', userController.getFollowerList);

router.post('/users/:id/follow',
  requireJwtAuth,
  catchErrors(userController.followUser));

router.get('/users/:id/news_feed',
  requireJwtAuth,
  catchErrors(questionController.getNewsFeed));

router.get('/users/:id/unanswered-questions',
  requireJwtAuth,
  catchErrors(questionController.getUnansweredQuestions));

router.get('/users/:id/answered-questions',
  requireJwtAuth,
  catchErrors(questionController.getAnsweredQuestions));

router.get('/questions/:id',
  requireJwtAuth,
  catchErrors(questionController.getQuestion));

router.post('/questions',
  requireJwtAuth,
  catchErrors(questionController.createQuestion));

router.post('/questions/:id/answer',
  requireJwtAuth,
  catchErrors(questionController.answerQuestion));

router.post('/questions/:id/unanswer',
  requireJwtAuth,
  catchErrors(questionController.unanswerQuestion));

router.post('/questions/:id/heart',
  requireJwtAuth,
  catchErrors(questionController.heartQuestion));

router.delete('/questions/:id',
  requireJwtAuth,
  catchErrors(questionController.deleteQuestion));

router.post('/upload/photo',
  requireJwtAuth,
  uploadController.cloudinaryPhotoUpload);

router.post('/upload/audio',
  requireJwtAuth,
  uploadController.cloudinaryAudioUpload);

module.exports = router;
