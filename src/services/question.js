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

export async function addQuestionAnswers(data) {
    if (!data.id) {
        await addQuestion(data);
    }
    if (data.id) {
        await addAnswer(data);
    }
}

export async function updateAnswers(data) {
    const updatedQuestion = await updateAnswer(data);
    return updatedQuestion;
}

export async function deleteQuestionAnswers(id, answerId) {
    const deletedQuestion = await deleteAnswer(id, answerId);
    return deletedQuestion;
}

export async function getUserQuestion(userID) {
    const questions = await getSingleUserQuestions(userID);
    return questions;
}

export async function getGroupQuestion(group) {
    const questions = await getAllQuestions(group);
    return questions;
}

export async function deleteQuestions(id) {
    return await deleteQuestion(id);
}

export async function getEveryQuestion(){
    return await getEveryQuestions();
}

export async function searchQuestions(question, group){
    return await searchQuestion(question, group);
}
