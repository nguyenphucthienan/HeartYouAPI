const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  answerer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: 'Answerer is required'
  },
  questioner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: 'Answerer is required'
  },
  answered: {
    type: Boolean,
    default: false
  },
  answeredAt: {
    type: Date
  },
  questionBody: {
    type: String,
    require: 'Question is required',
    trim: true
  },
  answerBody: {
    type: String,
    trim: true
  },
  hearts: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

mongoose.model('Question', questionSchema);
