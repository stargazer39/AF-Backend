import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema(
  {
    UserId: {
        type: String,
        required: false,
    },
    Question: {
      type: String,
      required: false,
    },
    Answers: [{
        answerPersonID:{
            type: String,
            required: false
        },
        answer:{
            type: String,
            required: false
        },
    }],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question