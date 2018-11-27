const questionService = require('../services/questionService');

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
