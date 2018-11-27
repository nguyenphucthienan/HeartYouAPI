const mongoose = require('mongoose');
const Question = mongoose.model('Question');

exports.getQuestionById = (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return Question.findById({ _id })
    .select({
      _id: 1,
      answerer: 1,
      questionBody: 1,
      createdAt: 1,
      answerBody: 1,
      answered: 1,
      answeredAt: 1,
      hearts: 1
    })
    .populate('answerer', '_id username photoUrl')
    .exec();
};

exports.createQuestion = (question) => {
  const newQuestion = new Question({ ...question });
  return newQuestion.save();
};

exports.answerQuestionById = (id, answerBody) => (
  Question.findByIdAndUpdate(id, {
    $set: {
      answered: true,
      answeredAt: Date.now(),
      answerBody
    }
  }, { new: true }).exec()
);

exports.unanswerQuestionById = id => (
  Question.findByIdAndUpdate(id, {
    $set: {
      answered: false,
      hearts: []
    },
    $unset: {
      answeredAt: 1,
      answerBody: 1
    }
  }, { new: true }).exec()
);

exports.deleteQuestionById = id => (
  Question.findByIdAndDelete(id).exec()
);
