import express from 'express'
import groupRouter from './group.routes'
import questionRouter from './question.routes'

const router = express.Router()
router.use('/group', groupRouter)
router.use('/question', questionRouter)

export default router
