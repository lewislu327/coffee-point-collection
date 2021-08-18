const mongoose = require('mongoose')
const { Schema } = mongoose
const pointSchema = new Schema({
  Number: {
    type: Number,
    default: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Point', pointSchema)
