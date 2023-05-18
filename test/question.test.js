const request = require('supertest')
const QuestionService = require('../src/services/question')
const Question = require('../src/models/question')


//u need this so it starts the server.
const app = require('../src/app')

const TestUserFind = "12345678999e23"
var TestUserID = null
var TestQUestionID = null

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
      Question: 'Huge question',
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

  // Remove the test groups from the database after the tests run
  afterAll(async () => {
    await Question.deleteMany()
    console.log("REMOVED TEST")
  }, 10000)

  // Test that the getAllGroups function returns all groups
  test('get all questions by using getAllTheQuestions method', async () => {
    const questions = await QuestionService.getEveryQuestion()
    expect(questions.length).toBeGreaterThan(0)
  })
})

  
describe('AddQuestion', () => {
  test('returns "Question Added" when question is added', async () => {
    //Define dummy test data to use in the test case
    const data = 
      { 
        id : null,
        UserId: "12345678999e23",
        UserName: 'semora',
        Question: TestUserFind,
        Group: 'test',
        Answers: []
       }
    
    // Call the addNewGroup function with test data
    const result = await QuestionService.addQuestionAnswers(data)
    // Assert that the result is 'Group Created'
    expect(result).toEqual(expect.any(Object))
  })
})

describe('findQuestion', () => {
  test('returns "Question Added" when question is added', async () => {
    //Define dummy test data to use in the test case
    const question = TestUserFind
    const group = "test"
    const singleQuestion = await QuestionService.searchQuestions(question, group)

    TestUserID = singleQuestion[0]._id
    expect(singleQuestion[0]._id).toEqual(TestUserID)
  })
})

describe('getUserQuestion', () => {
  test('returns "Question Added" when question is added', async () => {
    //Define dummy test data to use in the test case

    const UserQuestions = await QuestionService.getUserQuestion(TestUserID)

    expect(UserQuestions).toEqual(expect.any(Object))
  })
})


describe('AddAnswer', () => {
  test('returns "Question Added" when question is added', async () => {
    //Define dummy test data to use in the test case
  
    const array = {
      answerPersonID: TestQUestionID,
      answerPersonName : "Semora chan",
      answer : "yesh the test worked"
    }
    const data = {
      id: TestUserID,
      Answers: array,
    }
    
    // Call the addNewGroup function with test data
    const result = await QuestionService.addQuestionAnswers(data)
    TestQUestionID = result.Answers[0]._id
    console.log("THIS IS TEST Q ID " + TestQUestionID + result.Answers[0]._id)
    // Assert that the result is 'Group Created'
    expect(result).toEqual(expect.any(Object))
  })
})

describe('UpdateAnswer', () => {
  test('returns "Question Added" when question is added', async () => {
    //Define dummy test data to use in the test case
  
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
    
    // Call the addNewGroup function with test data
    const result = await QuestionService.updateAnswers(data)
    // Assert that the result is 'Group Created'
    expect(result.Answers[0].answer).toEqual("updated Data")
  })
})

describe('DeleteAnswer', () => {
  test('returns "Question Added" when question is added', async () => {
    //Define dummy test data to use in the test case
    const id = TestUserID
    const answerId = TestQUestionID
    
    // Call the addNewGroup function with test data
    const result = await QuestionService.deleteQuestionAnswers(id, answerId)
    // Assert that the result is 'Group Created'
    expect(result).toEqual(expect.any(Object));
  })
})

describe('DeleteQuestion', () => {
  test('returns "Question Added" when question is added', async () => {
    //Define dummy test data to use in the test case
    const id = TestUserID
        
    // Call the addNewGroup function with test data
    const result = await QuestionService.deleteQuestions(id)
    // Assert that the result is 'Group Created'
    expect(result).toEqual(expect.any(Object));
  })
})

