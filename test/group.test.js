const request = require('supertest')
const groupRoutes = require('../src/routes/group.routes')
const groupService = require('../src/services/group')
const groupRepo = require('../src/repository/group')
const Group = require('../src/models/group')
const app = require('../src/app')

/*
  test function -- GetAllGroup =======================
*/
describe('getAllGroups', () => {
  // Create dummy test groups to use in the test case
  const testGroups = [
    { groupName: 'Group 1', description: 'Description 1', category: 'Category 1' },
    { groupName: 'Group 2', description: 'Description 2', category: 'Category 2' },
    { groupName: 'Group 3', description: 'Description 3', category: 'Category 3' },
  ]

  // Insert the test groups into the database before the tests run
  beforeAll(() => {
    Group.insertMany(testGroups)
  }, 10000)

  // Remove the test groups from the database after the tests run
  afterAll(async () => {
    await Group.deleteMany()
  }, 10000)

  // Test that the getAllGroups function returns all groups
  test('returns all groups using the getAllGroups function in the service layer', async () => {
    const groups = await groupService.getAllGroups()
    //expect(groups).toEqual(testGroups)
    expect(groups.length).toBeGreaterThan(0)
  })
})

/*
  test function -- CreateGroup =======================
*/
describe('create group', () => {
  test('returns "Group Created" when group is successfully added', async () => {
    //Define dummy test data to use in the test case
    const groupName = 'Test Group'
    const description = 'Test Group Description'
    const category = 'Test Category'
    const groupIcon = ['icon1', 'icon2']
    const adminId = 'admin123'
    const followersUserId = ['user1', 'user2']

    // Call the addNewGroup function with test data
    const result = await groupService.addNewGroup(
      groupName,
      description,
      category,
      groupIcon,
      adminId,
      followersUserId,
    )

    // Assert that the result is 'Group Created'
    expect(result).toEqual('Group Created')
  })
})

/*
  test function -- UpdateGroup =======================
*/
describe('update group', () => {
  //Create dummy test data to use in the test case
  const groupId = '123'
  const updatedGroupData = {
    groupName: 'Updated Group Name',
    description: 'Updated Group Description',
    category: 'Updated Category',
  }

  test('updates an existing group', async () => {
    // Mock the updateGroup function in the group repository
    const mockUpdateGroup = jest.fn(() => Promise.resolve(updatedGroupData))
    const groupRepository = require('../src/repository/group')
    groupRepository.updateGroup = mockUpdateGroup

    const updatedGroup = await groupService.updateGroup(groupId, updatedGroupData)

    // Check that the updateGroup function in the repository was called with the correct arguments
    expect(mockUpdateGroup).toHaveBeenCalledWith(groupId, updatedGroupData)

    // Check that the updated group was returned
    expect(updatedGroup).toEqual(updatedGroupData)
  })

  test('throws an error if the group does not exist', async () => {
    // Mock the updateGroup function in the group repository to return null
    const mockUpdateGroup = jest.fn(() => Promise.resolve(null))
    const groupRepository = require('../src/repository/group')
    groupRepository.updateGroup = mockUpdateGroup

    // Check that the updateGroup function in the service throws an error
    await expect(groupService.updateGroup(groupId, updatedGroupData)).rejects.toThrow(
      'Failed to update group',
    )
  })

  test('throws an error if the group update fails', async () => {
    // Mock the updateGroup function in the group repository to throw an error
    const mockUpdateGroup = jest.fn(() => Promise.reject(new Error('Update failed')))
    const groupRepository = require('../src/repository/group')
    groupRepository.updateGroup = mockUpdateGroup

    // Check that the updateGroup function in the service throws an error
    await expect(groupService.updateGroup(groupId, updatedGroupData)).rejects.toThrow(
      'Failed to update group',
    )
  })
})

/*
  test function -- GetOneGroup =======================
*/
describe('get one group', () => {
  //Create dummy test data to use in the test case
  const testGroup = {
    groupName: 'Test Group',
    description: 'Test Description',
    category: 'test category',
    groupIcon: ['test-icon.jpg'],
    adminId: 'test-admin-id',
    followersUserId: ['test-follower-id'],
  }

  let savedGroup

  //saved a test group to the database before the test run
  beforeAll(async () => {
    await Group.deleteMany({})
    savedGroup = await new Group(testGroup).save()
  })

  //check that the function fetch correct data when correct Id provide
  test('returns the group with the specified ID', async () => {
    const group = await groupService.getOneGroup(savedGroup._id)
    expect(group.groupName).toBe(testGroup.groupName)
    expect(group.description).toBe(testGroup.description)
    expect(group.category).toBe(testGroup.category)
    expect(group.groupIcon).toEqual(testGroup.groupIcon)
    expect(group.adminId).toBe(testGroup.adminId)
    expect(group.followersUserId).toEqual(testGroup.followersUserId)
  })

  //check that the function throw an eror when incorrect Id provide
  test('throws an error if the specified group ID is not found', async () => {
    const fakeId = '0000000'
    await expect(groupService.getOneGroup(fakeId)).rejects.toThrow('Failed to get group')
  })
})

/*
  test function -- DeleteGroup =======================
*/
describe('deleteGroup', () => {
  // Create a dummy test group to be deleted
  let testGroup
  beforeEach(async () => {
    testGroup = new Group({
      groupName: 'Test Group',
      description: 'Test description',
      category: 'Test category',
      groupIcon: 'Test icon',
      adminId: 'Test admin ID',
      followersUserId: [],
    })
    await testGroup.save()
  })

  // Delete the test group after each test
  afterEach(async () => {
    await Group.findByIdAndDelete(testGroup._id)
  })

  // Check that the delete group worked successfully
  test('deletes a group successfully', async () => {
    const result = await groupService.deleteGroup(testGroup._id)
    expect(result).toBe('Deleted successfully')
  })

  // Check that the delete group fails when invalid Id passed
  test('throws an error if the group is not found', async () => {
    const invalidId = '000000'
    await expect(groupService.deleteGroup(invalidId)).rejects.toThrow('Failed to delete group')
  })
})