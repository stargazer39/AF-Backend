import { getOneUser, findOneAndUpdateUser, deleteUser } from '../repository/user'

export const addInterests = async (email, interests) => {
  const user = await getOneUser({ email })
  if (!user) return false
  if (!user.is_verified)
    return { status: 401, message: 'Please verify your account before adding interests.' }
  return findOneAndUpdateUser({ email: user.email }, { interests })
}

export const updateUser = async (email, data) => {
  const user = await getOneUser({ email })
  if (!user) return false
  if (!user.is_verified)
    return { status: 401, message: 'Please verify your account before adding interests.' }
  return findOneAndUpdateUser({ email: user.email }, { data })
}

export const getUser = async (email) => {
  const user = await getOneUser({ email })
  if (!user) return false
  if (!user.is_verified) return { status: 401, message: 'Please verify your account.' }
  return user
}

export const deleteOne = async (email) => {
  const result = await deleteUser({ email })
  if (!result) return false
  return result
}
