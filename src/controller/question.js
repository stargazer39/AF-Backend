let Question = require('../models/question')

// Add a question
export async function addQuestion(req, res) {
    let data = req.body;
    try{
        const QuestionModal = await Question.findOne({ UserId: data.userId })
    
        // Adding new question
        if (!QuestionModal){
            const newModel = new Question(data);
            await newModel.save();
        }
        // Adding answers
        if (QuestionModal) {
            QuestionModal.Addresses.push(data.Addresses)
            await QuestionModal.save();
        } else {
        console.log('Unable to locate the document. Sequence will now terminate');
        }
        res.status(200).send("Sequence commenced successfully!");
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal server error");
    }
}


//get all questions
export function getQuestions(req, res) {

}

//update a question or Add answer
export function updateQuestion(req, res) {

}

//delete a question
export function deleteQuestion(req, res) {

}


