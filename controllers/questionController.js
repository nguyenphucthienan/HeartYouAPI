const questionService = require('../services/questionService');
const Pagination = require('../helpers/Pagination');

exports.getNewsFeed = async (req, res) => {
  const pageNumber = Math.max(0, parseInt(req.query.pageNumber, 10)) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 5;
  const { following } = req.user;

  const filterObj = {
    answerer: { $in: following },
    answered: true
  };

  const sortObj = {
    answeredAt: -1
  };

  const users = await questionService.getNewsFeed(pageNumber, pageSize, filterObj, sortObj);
  const totalItems = await questionService.countUsers(filterObj);

  const data = {
    items: users,
    pagination: new Pagination(pageNumber, pageSize, totalItems)
  };

  return res.send(data);
};

exports.getQuestion = async (req, res) => {
  const { id } = req.params;

  const question = await questionService.getQuestionById(id);

  if (!question) {
    return res.status(404).send();
  }

  return res.send(question);
};

exports.createQuestion = async (req, res) => {
  const userId = req.user.id;
  const newQuestion = { ...req.body, questioner: userId };

  const question = await questionService.createQuestion(newQuestion);
  const returnQuestion = await questionService.getQuestionById(question.id);

  return res.send(returnQuestion);
};

exports.answerQuestion = async (req, res) => {
  const { id } = req.params;
  const { answerBody } = req.body;
  const { id: userId } = req.user;

  const question = await questionService.getQuestionById(id);

  if (!question) {
    return res.status(404).send();
  }

  if (question.answerer.id !== userId) {
    return res.status(401).send();
  }

  const answeredQuestion = await questionService.answerQuestionById(id, answerBody);

  if (!answeredQuestion) {
    return res.status(404).send();
  }

  const returnQuestion = await questionService.getQuestionById(answeredQuestion.id);
  return res.send(returnQuestion);
};

exports.unanswerQuestion = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const question = await questionService.getQuestionById(id);

  if (!question) {
    return res.status(404).send();
  }

  if (question.answerer.id !== userId) {
    return res.status(401).send();
  }

  const unansweredQuestion = await questionService.unanswerQuestionById(id);

  if (!unansweredQuestion) {
    return res.status(404).send();
  }

  const returnQuestion = await questionService.getQuestionById(unansweredQuestion.id);
  return res.send(returnQuestion);
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const question = await questionService.getQuestionById(id);

  if (!question) {
    return res.status(404).send();
  }

  if (question.answerer.id !== userId) {
    return res.status(401).send();
  }

  const deletedQuestion = await questionService.deleteQuestionById(id);

  if (!deletedQuestion) {
    return res.status(404).send();
  }

  return res.send(deletedQuestion.id);
};
