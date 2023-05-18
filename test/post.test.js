const request = require('supertest')
const postService = require('../src/services/post')
const Post = require('../src/models/post')
const groupService = require('../src/services/group')
const Group = require('../src/models/group')

//u need this so it starts the server.
const app = require('../src/app')

const TestUserFind = '12345678999e21'
const TestGroupId = '645181b40b132efc8d'
var TestUserID = null
var TestQUestionID = null

describe('getUserPosts', () => {
  const mainTestUser = 'TestUser1'
  const testPosts = [
    {
      userId: mainTestUser,
      groupId: '645181b40b132efc8d',
      contentText:
        'Take a moment for yourself get close with the lights down low you and I and no one else I get the feeling that I wanna explode',
      images: [
        [
          '248aaa4e-edce-4dc2-9a81-6bd2b0050add',
          'https://firebasestorage.googleapis.com/v0/b/ayurvedic-store-ac02e.appspot.com/o/test%2F248aaa4e-edce-4dc2-9a81-6bd2b0050add?alt=media&token=6888387a-416c-4cf7-8ae4-2e46612831ec',
        ],
      ],
      comments: [],
      userName: 'TestUser1',
      photoUrl: '',
    },
    {
      userId: mainTestUser,
      groupId: '645181b40b132efc8d',
      contentText:
        'Take a moment for yourself get close with the lights down low you and I and no one else I get the feeling that I wanna explode',
      images: [
        [
          '248aaa4e-edce-4dc2-9a81-6bd2b0050add',
          'https://firebasestorage.googleapis.com/v0/b/ayurvedic-store-ac02e.appspot.com/o/test%2F248aaa4e-edce-4dc2-9a81-6bd2b0050add?alt=media&token=6888387a-416c-4cf7-8ae4-2e46612831ec',
        ],
      ],
      comments: [],
      userName: 'TestUser',
      photoUrl: '',
    },
    {
      userId: 'TestUser2',
      groupId: '645181b40b132efc8d',
      contentText:
        'Take a moment for yourself get close with the lights down low you and I and no one else I get the feeling that I wanna explode',
      images: [
        [
          '248aaa4e-edce-4dc2-9a81-6bd2b0050add',
          'https://firebasestorage.googleapis.com/v0/b/ayurvedic-store-ac02e.appspot.com/o/test%2F248aaa4e-edce-4dc2-9a81-6bd2b0050add?alt=media&token=6888387a-416c-4cf7-8ae4-2e46612831ec',
        ],
      ],
      comments: [],
      userName: 'TestUser2',
      photoUrl: '',
    },
  ]

  beforeAll(() => {
    Post.insertMany(testPosts)
  }, 10000)

  // Remove the test groups from the database after the tests run
  afterAll(async () => {
    await Post.deleteMany({ userId: { $in: [mainTestUser, 'TestUser2'] } })
  }, 10000)

  // Test that the getAllGroups function returns all groups
  test('get all post posted by the TestUser1', async () => {
    const posts = postService.getUserPosts(mainTestUser)
    expect(posts.length).toHaveLength(2)
  })
})

// describe('create group', () => {
//   test('returns "Group Created" when group is successfully added', async () => {
//     //Define dummy test data to use in the test case
//     const groupName = 'Test Group'
//     const description = 'Test Group Description'
//     const category = 'Test Category'
//     const groupIcon = ['icon1', 'icon2']
//     const adminId = 'admin123'
//     const followersUserId = ['user1', 'user2']

//     // Call the addNewGroup function with test data
//     const result = await groupService.addNewGroup(
//       groupName,
//       description,
//       category,
//       groupIcon,
//       adminId,
//       followersUserId,
//     )

//     // Assert that the result is 'Group Created'
//     expect(result).toEqual('Group Created')
//   })
// })

describe('create post', () => {
  test('returns "post Created" when group is successfully added', async () => {
    //Define dummy test data to use in the test case
    const postData = {
      userId: '644fa4b113991f548fa15527',
      groupId: 'feedPost',
      contentText: 'test',
      images: [],
      comments: [],
      userName: 'test',
      photoUrl: 'test',
    }

    // Call the addNewGroup function with test data
    const result = await postService.addNewPost(postData)

    // Assert that the result is 'Group Created'
    expect(result).toEqual('Post Created')
  }, 10000)
})
// describe('AddQuestion', () => {
//   test('returns "Question Added" when question is added', async () => {
//     //Define dummy test data to use in the test case
//     const data =
//       {
//         id : null,
//         UserId: "12345678999e23",
//         UserName: 'semora',
//         Question: TestUserFind,
//         Group: 'test',
//         Answers: []
//        }

//     // Call the addNewGroup function with test data
//     const result = await QuestionService.addQuestionAnswers(data)
//     // Assert that the result is 'Group Created'
//     expect(result).toEqual(expect.any(Object))
//   })
// })

// describe('findQuestion', () => {
//   test('returns "Question Added" when question is added', async () => {
//     //Define dummy test data to use in the test case
//     const question = TestUserFind
//     const group = "test"
//     const singleQuestion = await QuestionService.searchQuestions(question, group)

//     TestUserID = singleQuestion[0]._id
//     expect(singleQuestion[0]._id).toEqual(TestUserID)
//   })
// })

// describe('getUserQuestion', () => {
//   test('returns "Question Added" when question is added', async () => {
//     //Define dummy test data to use in the test case

//     const UserQuestions = await QuestionService.getUserQuestion(TestUserID)

//     expect(UserQuestions).toEqual(expect.any(Object))
//   })
// })

// describe('AddAnswer', () => {
//   test('returns "Question Added" when question is added', async () => {
//     //Define dummy test data to use in the test case

//     const array = {
//       answerPersonID: TestQUestionID,
//       answerPersonName : "Semora chan",
//       answer : "yesh the test worked"
//     }
//     const data = {
//       id: TestUserID,
//       Answers: array,
//     }

//     // Call the addNewGroup function with test data
//     const result = await QuestionService.addQuestionAnswers(data)
//     TestQUestionID = result.Answers[0]._id
//     console.log("THIS IS TEST Q ID " + TestQUestionID + result.Answers[0]._id)
//     // Assert that the result is 'Group Created'
//     expect(result).toEqual(expect.any(Object))
//   })
// })

// describe('UpdateAnswer', () => {
//   test('returns "Question Added" when question is added', async () => {
//     //Define dummy test data to use in the test case

//     const array = {
//       answerPersonID: TestQUestionID,
//       answerPersonName : "Semora chan",
//       answer : "updated Data",
//       _id : TestQUestionID
//     }
//     const data = {
//       id: TestUserID,
//       Answers: array,
//     }

//     // Call the addNewGroup function with test data
//     const result = await QuestionService.updateAnswers(data)
//     // Assert that the result is 'Group Created'
//     expect(result.Answers[0].answer).toEqual("updated Data")
//   })
// })

// describe('DeleteAnswer', () => {
//   test('returns "Question Added" when question is added', async () => {
//     //Define dummy test data to use in the test case
//     const id = TestUserID
//     const answerId = TestQUestionID

//     // Call the addNewGroup function with test data
//     const result = await QuestionService.deleteQuestionAnswers(id, answerId)
//     // Assert that the result is 'Group Created'
//     expect(result).toEqual(expect.any(Object));
//   })
// })

// describe('DeleteQuestion', () => {
//   test('returns "Question Added" when question is added', async () => {
//     //Define dummy test data to use in the test case
//     const id = TestUserID

//     // Call the addNewGroup function with test data
//     const result = await QuestionService.deleteQuestions(id)
//     // Assert that the result is 'Group Created'
//     expect(result).toEqual(expect.any(Object));
//   })
// })
