import express from 'express'
import groupRouter from './group.routes'
import postRouter from './post.routes'
import questionRouter from './question.routes'

const router = express.Router()
router.use('/group', groupRouter)
router.use('/post', postRouter)
router.use('/question', questionRouter)

export default router
