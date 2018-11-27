const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
  name: {
    type: String,
    required: 'Role name is required',
    unique: true,
    trim: true
  }
}, { timestamps: true });

mongoose.model('Role', roleSchema);
