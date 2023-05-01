import express from 'express'
import { pickInterests, editUser, getOneUser, deleteUser } from '../controllers/user'

const userRouter = express.Router()

userRouter.post('/interests', pickInterests)
userRouter.post('/editUser', editUser)
userRouter.post('/getOneUser', getOneUser)
userRouter.post('/delete', deleteUser)

export default userRouter
