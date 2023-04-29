import express from 'express'
import groupRouter from './group.routes'

const router = express.Router()
router.use('/group', groupRouter)

export default router
