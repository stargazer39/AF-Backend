let Question = require('../models/question')
const mongoose = require('mongoose');

// const Question = require("./models/question");
// const Question = require('../models/Question');

async function addQuestion(data) {
    const newModel = new Question(data);
    await newModel.save();
}

async function addAnswer(data) {
    const QuestionModal = await Question.findOne({ _id : data.id });
    QuestionModal.Answers.push(data.Answers);
    await QuestionModal.save();
}

async function updateAnswer(data){
    const QuestionModal = await Question.findOneAndUpdate(
        { _id : data.id, "Answers._id": data.Answers._id },
        { $set: { "Answers.$": data.Answers } },
        { new: true }
    );
    return QuestionModal;
}

async function deleteAnswer(id, answerId) {
    const question = await Question.updateOne(
        { _id: id },
        { $pull: { Answers: { _id: answerId } } }
    );
    return question;
}

async function getSingleUserQuestions(userID) {
    const questions = await Question.find({UserId : userID }).sort({createdAt: -1});
    return questions;
}

async function getAllQuestions(search) {
    const questions = await Question.find({
        Question: { $regex: new RegExp(search, 'i')}
    }).sort({createdAt: -1});
    return questions;
    
}

const deleteQuestion = async (id) =>  {
    return await Question.findOneAndDelete({_id : id});
}

async function getEveryQuestions(){
    return await Question.find().sort({createdAt: -1});
}

async function searchQuestion(question, group){
    return await Question.find({
        Question: { $regex: new RegExp(question, 'i')},
        Group : group
    }).sort({createdAt: -1});
}

module.exports = {
    addQuestion,
    addAnswer,
    updateAnswer,
    deleteAnswer,
    getSingleUserQuestions,
    getAllQuestions,
    deleteQuestion,
    getEveryQuestions,
    searchQuestion
};