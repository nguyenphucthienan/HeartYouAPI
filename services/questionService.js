const mongoose = require('mongoose');
const Question = mongoose.model('Question');

exports.getQuestions = (pageNumber, pageSize, filterObj, sortObj) => (
  Question.aggregate([
    { $match: filterObj },
    {
      $lookup: {
        from: 'users',
        localField: 'answerer',
        foreignField: '_id',
        as: 'answerer'
      },
    },
    { $unwind: '$answerer' },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        answered: 1,
        answeredAt: 1,
        questionText: 1,
        questionAudioUrl: 1,
        answerText: 1,
        answerAudioUrl: 1,
        hearts: 1,
        heartCount: { $size: '$hearts' },
        'answerer._id': 1,
        'answerer.username': 1,
        'answerer.photoUrl': 1
      }
    },
    { $sort: sortObj },
    { $skip: (pageNumber - 1) * pageSize },
    { $limit: pageSize }
  ])
);

exports.getQuestionById = (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return Question.findById({ _id })
    .select({
      _id: 1,
      answerer: 1,
      questionText: 1,
      questionAudioUrl: 1,
      createdAt: 1,
      answerText: 1,
      answerAudioUrl: 1,
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

exports.countQuestions = filterObj => (
  Question.find(filterObj)
    .then(question => question.length)
);

exports.answerQuestionById = (id, answerText, answerAudioUrl) => {
  if (answerAudioUrl) {
    return Question.findByIdAndUpdate(id, {
      $set: {
        answered: true,
        answeredAt: Date.now(),
        answerText,
        answerAudioUrl
      }
    }, { new: true }).exec();
  }

  return Question.findByIdAndUpdate(id, {
    $set: {
      answered: true,
      answeredAt: Date.now(),
      answerText,
    }
  }, { new: true }).exec();
};

exports.unanswerQuestionById = id => (
  Question.findByIdAndUpdate(id, {
    $set: {
      answered: false,
      hearts: []
    },
    $unset: {
      answeredAt: 1,
      answerText: 1,
      answerAudioUrl: 1
    }
  }, { new: true }).exec()
);

exports.heartQuestionById = (id, userId, operator) => (
  Question.findByIdAndUpdate(id,
    { [operator]: { hearts: userId } },
    { new: true })
);

exports.deleteQuestionById = id => (
  Question.findByIdAndDelete(id).exec()
);
