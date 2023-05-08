const group = require('../repository/group')

function addNewGroup(groupName, description, category, groupIcon, adminId, followersUserId) {
  return group
    .addNewGroup(groupName, description, category, groupIcon, adminId, followersUserId)
    .then(() => {
      return 'Group Created'
    })
    .catch((err) => {
      console.log(err)
      throw new Error('Failed to create group')
    })
}

function getAllGroups() {
  return group.getAllGroups().catch((err) => {
    console.log(err)
  })
}

function updateGroup(groupId, updatedGroupData) {
  return group
    .updateGroup(groupId, updatedGroupData)
    .then((updatedGroup) => {
      if (!updatedGroup) {
        throw new Error('Group not found')
      }
      return updatedGroup
    })
    .catch((err) => {
      console.log(err)
      throw new Error('Failed to update group')
    })
}

function getOneGroup(groupId) {
  return group
    .getOneGroup(groupId)
    .then((group) => {
      if (!group) {
        throw new Error('Group not found')
      }
      return group
    })
    .catch((err) => {
      console.log(err)
      throw new Error('Failed to get group')
    })
}

function deleteGroup(groupId) {
  return group
    .deleteGroup(groupId)
    .then((result) => {
      if (!result) {
        throw new Error('Group not found')
      }
      return 'Deleted successfully'
    })
    .catch((err) => {
      console.log(err)
      throw new Error('Failed to delete group')
    })
}

function addFollows(groupId, followers) {
  return group
    .addFollows(groupId, followers)
    .then((result) => {
      if (!result) {
        throw new Error('Group not found')
      }
      return result
    })
    .catch((err) => {
      console.log(err)
      throw new Error('Failed to add followers to group')
    })
}

async function removeFollows(groupId, followerId) {
  try {
    const group = await groupRepo.removeFollows(groupId, followerId)
    return group
  } catch (err) {
    throw err
  }
}

function getGroupsByUserId(adminId) {
  return groupRepository.findByAdminId(adminId)
}

module.exports = {
  addNewGroup,
  getAllGroups,
  updateGroup,
  getOneGroup,
  deleteGroup,
  addFollows,
  removeFollows,
  getGroupsByUserId,
}
