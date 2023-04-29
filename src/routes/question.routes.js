import express from 'express'
import {
    addQuestion,
    getQuestions,
    updateQuestion,
    deleteQuestion,
} from '../controller/question'

const questionRouter = express.Router()

groupRouter.post('/addQuestion', addQuestion)
groupRouter.get('/getQuestions', getQuestions)
groupRouter.patch('/updateQuestion/', updateQuestion)
groupRouter.delete('deleteQuestion', deleteQuestion)


export default questionRouter