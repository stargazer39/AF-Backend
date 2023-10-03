import express from 'express'
import { register, verify, login, logout,loginGoogle, googleAuthSuccess, googleCallback } from '../controllers/auth'
import { celebrate, Segments } from 'celebrate'
import { registerSchema, loginSchema } from '../validations/user'
import { rateLimit } from "../middleware/auth";
const authRouter = express.Router()

authRouter.post('/register', rateLimit, celebrate({ [Segments.BODY]: registerSchema }), register)
authRouter.post('/register/verify', rateLimit, verify)
authRouter.post('/login', rateLimit, celebrate({ [Segments.BODY]: loginSchema }), login)
authRouter.get('/login/google', loginGoogle)
authRouter.get("/login/google/success", googleAuthSuccess)
authRouter.get("/login/google/callback", googleCallback)
// authRoute
export default authRouter
