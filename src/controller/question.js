let Question = require('../models/question')
import mongoose from 'mongoose';

// Add a question or answer a question
export async function addQuestionAnswer(req, res) {
    let data = req.body;
    console.log(data.Answers)
    try{
        // Adding new question
        if (!data.id){
            const newModel = new Question(data);
            await newModel.save();
        }
        // Adding answers
        if (data.id) {
            const QuestionModal = await Question.findOne({ _id : data.id })
            QuestionModal.Answers.push(data.Answers)
            await QuestionModal.save();
        } 
        res.status(200).send("Sequence commenced successfully!");
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal server error");
    }
}

//update an Answer
export async function updateAnswer(req, res) {
    let data = req.body;
    try {
        const QuestionModal = await Question.findOneAndUpdate(
          { _id : data.id, "Answers._id": data.Answers._id },
          { $set: { "Answers.$": data.Answers } },
          { new: true }
        );
    
        if (!QuestionModal) {
          return res.status(404).json({ error: "No data found" });
        }
    
        return res.status(200).json(QuestionModal);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
      } 
}

// Delete an answer
export async function deleteAnswer(req, res) {
    try {
      const id = mongoose.Types.ObjectId(req.query.id);
      const answerId = mongoose.Types.ObjectId(req.query.answerId);
      const question = await Question.updateOne(
        { _id: id },
        { $pull: { Answers: { _id: answerId } } }
      );
      if (!question || question.nModified === 0) {
        return res.status(404).json({ error: 'No matching question found or answer not found' });
      }
      return res.status(200).json({ message: 'Answer deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
}

//get ALL questions
export async function getAllQuestions(req, res) {
    try {
        const QuestionModal = await Question.find()
        res.status(200).json(QuestionModal)
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal server error");
    }
}

//get questions of a single USER
export async function getSingleUserQuestions(req, res) {
    try {
        const QuestionModal = await Question.find({UserId : req.query.userID}).sort({createdAt: -1})
        res.status(200).json(QuestionModal)
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal server error");
    }
}

//get questions of a Groups
export async function getGroupQuestions(req, res) {
    try {
        const QuestionModal = await Question.find({Group : req.query.group}).sort({createdAt: -1})
        res.status(200).json(QuestionModal)
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal server error");
    }
}

//delete a question
export async function deleteQuestion(req, res) {
    const QuestionModal = await Question.findOneAndDelete({_id : req.query.id})
    if(!QuestionModal){
        return res.status(404).json({error:'no post'})
    }
    return res.status(200).json(QuestionModal)
}

//Searching
export async function searchQuestion(req, res) {
    try {
      const questions = await Question.find({
        Question: { $regex: new RegExp(req.query.question, 'i') }
      });
      if (questions.length === 0) {
        return res.status(404).json({ message: 'Try different keywords' });
      }
      res.json(questions);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
}



