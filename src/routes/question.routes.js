import express from 'express'
import { 
    addQuestionAnswer, 
    getAllQuestions, 
    getSingleUserQuestions, 
    getGroupQuestions,   
    updateAnswer, 
    deleteAnswer,
    deleteQuestion,
    searchQuestion
    } from '../controller/question'

const questionRouter = express.Router()

// Add a question or answer
questionRouter.post("/addQuestionAnswer", addQuestionAnswer)

//Updating Answers
questionRouter.put('/updateAnswer/', updateAnswer)

//Getting Questions
questionRouter.get('/getAllQuestions', getAllQuestions)
questionRouter.get('/getSingleUserQuestions', getSingleUserQuestions)
questionRouter.get('/getGroupQuestions', getGroupQuestions)

questionRouter.get('/searchQuestion', searchQuestion)

// Removing
questionRouter.put('/deleteAnswer/', deleteAnswer)
questionRouter.delete('/deleteQuestion', deleteQuestion)

export default questionRouter
