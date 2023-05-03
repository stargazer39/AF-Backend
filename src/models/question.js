import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema(
  {
    UserId: {
        type: String,
        required: false,
    },
    UserName: {
      type: String,
      required: false,
    },
    Question: {
      type: String,
      required: false,
    },
    Group: {
      type: String,
      required: false,
    },
    Answers: [{
        answerPersonName:{
          type: String,
          required: false
        },
        answer:{
            type: String,
            required: false
        },
    }],
  },{timestamps : true}
)

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question