const request = require('supertest')
const QuestionService = require('../src/services/question')
const Question = require('../src/models/question')


//u need this so it starts the server.
const app = require('../src/app')

const TestUserFind = "12345678999e23"
var TestUserID = null
var TestQUestionID = null



// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[    TESTING THE SERVICES    ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

// Test get every question
describe('getEveryQuestion', () => {
  const testQuestions = [
    { 
      UserId: '123123123123123',
      UserName: 'semora',
      Question: 'Huge question',
      Group: 'test',
      Answers: [{
          answerPersonName: 'test',
          answerPersonID: "123123123123",
          answer: 'this is answer'
      }]
      },
      { 
      UserId: '444444444444444',
      UserName: 'semora',
      Question: 'Smol question',
      Group: 'test',
      Answers: [{
          answerPersonName: 'test',
          answerPersonID: "123123123123",
          answer: 'this is answer'
      }]
      },
  ]
  
  beforeAll(() => {
      Question.insertMany(testQuestions)
  }, 10000)

  afterAll(async () => {
    await Question.deleteMany()
    console.log("REMOVED TEST")
  }, 10000)

  test('get all questions by using getAllTheQuestions method', async () => {
    const questions = await QuestionService.getEveryQuestion()
    // expects the length of the question to be more then 0 since we added some data
    expect(questions.length).toBeGreaterThan(0)
  })
})

// Test adding a question
describe('AddQuestion', () => {
  test('returns object with the new question', async () => {
    const data = 
      { 
        id : null,
        UserId: "12345678999e23",
        UserName: 'semora',
        Question: TestUserFind,
        Group: 'test',
        Answers: []
       }
    
    const result = await QuestionService.addQuestionAnswers(data)
    // expects an object to be retured after creating a question
    expect(result).toEqual(expect.any(Object))
  })
})

// Test finding a question
describe('findQuestion', () => {
  test('returns array of objects', async () => {
    const question = TestUserFind
    const group = "test"
    const singleQuestion = await QuestionService.searchQuestions(question, group)

    TestUserID = singleQuestion[0]._id
    expect(singleQuestion[0]._id).toEqual(TestUserID)
  })
})

// Test getting user questions
describe('getUserQuestion', () => {
  test('returns objects of questions', async () => {
    const UserQuestions = await QuestionService.getUserQuestion(TestUserID)
    // check if the userQuestion returns any objects.
    expect(UserQuestions).toEqual(expect.any(Object))
  })
})

// Test adding a qustion
describe('AddAnswer', () => {
  test('returns object which contains the new answer', async () => {
    const array = {
      answerPersonID: TestQUestionID,
      answerPersonName : "Semora chan",
      answer : "yesh the test worked"
    }
    const data = {
      id: TestUserID,
      Answers: array,
    }

    const result = await QuestionService.addQuestionAnswers(data)
    TestQUestionID = result.Answers[0]._id
    console.log("THIS IS TEST Q ID " + TestQUestionID + result.Answers[0]._id)
    // check if result contains an object
    expect(result).toEqual(expect.any(Object))
  })
})

//Test updating an answeer
describe('UpdateAnswer', () => {
  test('returns object with updated data', async () => {

    const array = {
      answerPersonID: TestQUestionID,
      answerPersonName : "Semora chan",
      answer : "updated Data",
      _id : TestQUestionID
    }
    const data = {
      id: TestUserID,
      Answers: array,
    }

    const result = await QuestionService.updateAnswers(data)
    // check if the updated value eauzls to "updated data"
    expect(result.Answers[0].answer).toEqual("updated Data")
  })
})

//test deleting an answer
describe('DeleteAnswer', () => {
  test('returns object when deleting an answer', async () => {
    const id = TestUserID
    const answerId = TestQUestionID

    const result = await QuestionService.deleteQuestionAnswers(id, answerId)
    // check if result contains an object
    expect(result).toEqual(expect.any(Object));
  })
})

//Test deleting a question
describe('DeleteQuestion', () => {
  test('returns object when deleting a question', async () => {
    const id = TestUserID

    const result = await QuestionService.deleteQuestions(id)
    // check if result contains an object
    expect(result).toEqual(expect.any(Object));
  })
})

//Test searching for something
describe('SearchQuestion', () => {
  test('returns search output array', async () => {
    const search = "Huge"
        
    const result = await QuestionService.getAllTheQuestion(search)
    // checks if the output size is equal to only one and if the output matches with the search term
    expect(result.length).toEqual(1);
    expect(result[0].Question).toEqual("Huge question");
  })
})


