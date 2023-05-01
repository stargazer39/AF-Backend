let Group = require('../models/group')

//create new group
export function addNewGroup(req, res) {
  const groupName = req.body.groupName
  const description = req.body.description
  const category = req.body.category
  const groupIcon = req.body.groupIcon
  const userId = req.body.userId

  const newGroup = new Group({
    groupName,
    description,
    category,
    groupIcon,
    userId,
  })

  newGroup
    .save()
    .then(() => {
      res.json('Group Created')
    })
    .catch((err) => {
      console.log(err)
    })
}

//fetch all groups
export function getAllGroups(req, res) {
  Group.find()
    .then((groups) => {
      res.json(groups)
    })
    .catch((err) => {
      console.log(err)
    })
}

//update group by id
export function updateGroup(req, res, next) {
  Group.findByIdAndUpdate(
    req.params._id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        //return next(error)
        console.log('group not found')
      } else {
        res.json(data)
        console.log('group updated successfully !')
      }
    },
  )
}

//delete the group
export function deleteGroup(req, res) {
  let _id = req.params._id

  Group.findByIdAndDelete(_id)
    .then(() => {
      res.json('deleted')
    })
    .catch((err) => {
      console.log(err.message)
    })
}

//filter by groupId
export function getOneGroup(req, res) {
  let _id = req.params._id

  Group.findById(_id)
    .then((group) => {
      res.json(group)
    })
    .catch((err) => {
      console.log(err.message)
    })
}

//filter by category
export function getGroupsByCategory(req, res) {
  let category = req.params.category

  Group.findOne({ category: category })
    .then((group) => {
      res.json(group)
    })
    .catch((err) => {
      console.log(err.message)
    })
}

//filter by userId
export function getGroupsByUserId(req, res) {
  let userId = req.params.userId

  Group.findOne({ userId: userId })
    .then((group) => {
      res.json(group)
    })
    .catch((err) => {
      console.log(err.message)
    })
}
