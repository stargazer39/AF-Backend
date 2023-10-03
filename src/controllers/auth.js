import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import { sendTokenResponse } from '../utils/jwt'
import { authRegister, verifyUser, authLogin } from '../services/auth'
import passport from 'passport';
import { getOneUser, createUser } from '../repository/user'

export const register = asyncHandler(async (req, res) => {
  const result = await authRegister(req.body)
  if (!result) return makeResponse({ res, status: 500, message: 'Registration Failed' })
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({
    res,
    message: 'Registration Successfull. Please check your email to verify your account.',
  })
})

export const verify = asyncHandler(async (req, res) => {
  const result = await verifyUser(req.body)
  if (!result)
    return makeResponse({ res, status: 400, message: 'Verification failed, invalid user' })
  return makeResponse({ res, message: 'Verification Successful' })
})

export const login = asyncHandler(async (req, res) => {
  const user = await authLogin(req.body)
  
  console.log("dfaf", user, req.user, req.body)
  if(user.google_auth && user.google_id == req.session.user.id) {
    return sendTokenResponse(res, user, 'User logged in successfully')
  }

  if (!user)
    return makeResponse({ res, status: 401, message: 'Invalid email or password. Try again!' })
  if (!user.is_verified)
    return makeResponse({
      res,
      status: 401,
      message: 'Account not verified. Please check your email',
    })
  return sendTokenResponse(res, user, 'User logged in successfully')
})


export const loginGoogle = passport.authenticate('google', {
  scope:
      ['email', 'profile']
})

export const googleCallback = passport.authenticate('google', {
  failureRedirect: '/failed',
  successRedirect:  '/api/auth/login/google/success'
});

export const googleAuthSuccess = asyncHandler(async (req, res) => {
  const user = req.user;
  const existingUser = await getOneUser({ email: user.email }, true)
  const redirect = `${process.env.APP_DOMAIN}/login?email=${user.email}&auth=google`;

  if(!existingUser) {
    // No existing user. register.
    const registeredUser = await createUser({
        username: user.displayName,
        email: user.email,
        password: '',
        photo_url: '',
        cover_photo_url: '',
        google_auth: true,
        google_id: user.id
    })

    console.log(registeredUser, "regss no exist")
    req.session.user = registeredUser;
    req.session.save();
    res.redirect(redirect);
    return;
  }

  console.log(user, "fdaadf", existingUser);

  if(existingUser.google_auth && existingUser.google_id == user.id) {
    req.session.user = existingUser;
    req.session.save();
    res.redirect(redirect);
    return;
  }

  return makeResponse({ res, status: 401, message: 'Something went wrong. Try again!' })
})

