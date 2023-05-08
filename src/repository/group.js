const Group = require('../models/group')

function addNewGroup(groupName, description, category, groupIcon, adminId, followersUserId) {
  const newGroup = new Group({
    groupName,
    description,
    category,
    groupIcon,
    adminId,
    followersUserId,
  })

  return newGroup.save()
}

function getAllGroups() {
  return Group.find()
}

function updateGroup(groupId, updatedGroupData) {
  return Group.findByIdAndUpdate(groupId, updatedGroupData)
}

function getOneGroup(groupId) {
  return Group.findById(groupId)
}

function deleteGroup(groupId) {
  return Group.findByIdAndDelete(groupId)
}

function addFollows(groupId, followers) {
  return Group.findByIdAndUpdate(groupId, { $set: { followersUserId: followers } }, { new: true })
}

async function removeFollows(groupId, followerId) {
  try {
    const group = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { followersUserId: followerId } },
      { new: true }, // to return the updated document
    )
    return group
  } catch (err) {
    throw err
  }
}

function findByAdminId(adminId) {
  return Group.findOne({ adminId }).exec()
}

module.exports = {
  addNewGroup,
  getAllGroups,
  updateGroup,
  getOneGroup,
  deleteGroup,
  addFollows,
  removeFollows,
  findByAdminId,
}
