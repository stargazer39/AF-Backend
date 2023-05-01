import express from 'express'
import groupRouter from './group.routes'
import postRouter from './post.routes'

const router = express.Router()
router.use('/group', groupRouter)
router.use('/post', postRouter)

export default router
