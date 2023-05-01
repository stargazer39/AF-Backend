import express from 'express'
import { addQuestion, getQuestions, updateQuestion, deleteQuestion } from '../controller/question'

const questionRouter = express.Router()

questionRouter.post("/addQuestion", addQuestion)
questionRouter.get('/getQuestions', getQuestions)
questionRouter.patch('/updateQuestion/', updateQuestion)
questionRouter.delete('deleteQuestion', deleteQuestion)

export default questionRouter
