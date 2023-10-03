import { getOneUser } from '../repository/user'
import { decodeJwtToken } from '../utils/jwt'
import { makeResponse } from '../utils/response'
import asyncHandler from './async'
import rateLimit from 'express-rate-limit'

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]
      : null
    : null
  if (!token) return makeResponse({ res, status: 403, message: 'Unauthorized' })
  const decodedUser = decodeJwtToken(token).data
  const user = decodedUser ? await getOneUser({ _id: decodedUser._id }, false) : null
  if (!user) return makeResponse({ res, status: 403, message: 'Unauthorized' })
  req.user = user
  next()
})

const rLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-7', 
	legacyHeaders: false,
})

export { rLimit as rateLimit }