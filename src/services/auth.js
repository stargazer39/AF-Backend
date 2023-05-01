import bcrypt from 'bcrypt'
import { sendMail } from './email'
import { createUser, findOneAndUpdateUser, getOneUser } from '../repository/user'

export const authRegister = async ({ email, username, password }) => {
  const user = await getOneUser({ email })
  if (user) return { status: 400, message: 'User already exists' }
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS), (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })
  const verificationCode = Math.floor(100000 + Math.random() * 900000)

  const registeredUser = await createUser({
    username,
    email,
    password: encryptedPassword,
    verification_code: verificationCode,
    photo_url: '',
    cover_photo_url: '',
  })
  await verifyMailTemplate(email, verificationCode)
  return registeredUser
}

export const verifyUser = async ({ email, verificationCode }) => {
  const user = await getOneUser({ email, verification_code: verificationCode })
  if (!user) return false
  return await findOneAndUpdateUser({ email: user.email }, { is_verified: true })
}

export const authLogin = async ({ email, password }) => {
  const user = await getOneUser({ email }, true)
  if (!user) return false
  const isPasswordMatch = await new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })
  if (!isPasswordMatch) return false
  delete user.password
  return user
}

export const verifyMailTemplate = async (email, verification_code) => {
  const replacements = {
    verification_code: verification_code,
  }
  const attachments = [
    {
      filename: 'verificationCode',
      path: __basedir + '/html/images/verificationCode.png',
      cid: 'verificationCode',
    },
  ]
  const subject = 'Welcome to Edupox'
  await sendMail(email, 'verificationCode', replacements, subject, attachments)
  return true
}
