require('dotenv').config()
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import connectDB from './database'
import router from './routes/index.routes'
import { isCelebrateError } from 'celebrate'
import { makeResponse } from './utils/response'
import passport from 'passport'
import "./passport";
import logger from './utils/logger'
import session from "express-session"
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
}));

// app.use(passport.authenticate('google'))

app.use(passport.initialize());

app.use(passport.session());

app.use(helmet())

app.use(compression())

app.use(cors({ origin: true, credentials: true }))

app.use(express.json({ limit: '1mb' }))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.status(200).json({ message: 'Bashaway Server Up and Running' }))

app.use('/api', router)

app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message} | Stack: ${err.stack}`)
  if (isCelebrateError(err)) {
    for (const [key, value] of err.details.entries()) {
      return makeResponse({ res, status: 422, message: value.details[0].message })
    }
  } else if (err.expose) {
    return makeResponse({ res, status: err.status, message: err.message })
  } else
    return makeResponse({
      res,
      status: 500,
      message: "Just patching things up. This'll be over soon!",
    })
})

connectDB()

global.__basedir = __dirname

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`AF server successfully started at port ${port}`)
})
