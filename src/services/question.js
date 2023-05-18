const { 
    addQuestion, 
    addAnswer, 
    updateAnswer, 
    deleteAnswer, 
    getSingleUserQuestions, 
    getAllQuestions, 
    deleteQuestion,
    getEveryQuestions,
    searchQuestion
   } = require('../repository/question');

async function addQuestionAnswers(data) {
    if (!data.id) {
        return await addQuestion(data);
       
    }
    if (data.id) {
        return await addAnswer(data);
    }
}

async function updateAnswers(data) {
    const updatedQuestion = await updateAnswer(data);
    return updatedQuestion;
}

async function deleteQuestionAnswers(id, answerId) {
    const deletedQuestion = await deleteAnswer(id, answerId);
    return deletedQuestion;
}

async function getUserQuestion(userID) {
    const questions = await getSingleUserQuestions(userID);
    return questions;
}

export async function getAllTheQuestion(search) {
    const questions = await getAllQuestions(search);
    return questions;
}

async function deleteQuestions(id) {
    return await deleteQuestion(id);
}

async function getEveryQuestion(){
    return await getEveryQuestions();
}

async function searchQuestions(question, group){
    return await searchQuestion(question, group);
}

module.exports = {
    getEveryQuestion,
    addQuestionAnswers,
    searchQuestions,
    updateAnswers,
    deleteQuestionAnswers,
    getUserQuestion,
    deleteQuestions
  }
