import express from 'express'
import {
  addNewGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
  getGroupsByCategory,
  getOneGroup,
  getGroupsByUserId,
} from '../controller/group'

const groupRouter = express.Router()

groupRouter.post('/addgroup', addNewGroup)
groupRouter.get('/getGroups', getAllGroups)
groupRouter.patch('/updateGroup/:_id', updateGroup)
groupRouter.delete('/deleteGroup/:_id', deleteGroup)
groupRouter.get('/getGroupByCate/:category', getGroupsByCategory)
groupRouter.get('/getOneGroup/:_id', getOneGroup)
groupRouter.get('/getGroupByUserId/:userId', getGroupsByUserId)

export default groupRouter
