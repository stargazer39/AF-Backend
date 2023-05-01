import User from '../models/user'

export const createUser = async (user) => {
  const userCreated = (await new User(user).save()).toObject()
  delete userCreated.password
  return userCreated
}

export const getOneUser = async (filters, returnPassword) => {
  const user = await User.findOne(filters).lean()
  if (!user) return null

  if (!returnPassword) delete user.password
  return user
}

export const findOneAndUpdateUser = async (filters, { data }) => {
  const user = await User.findOneAndUpdate(filters, data, { new: true }).lean()
  if (!user) return null

  delete user.password
  return user
}

export const deleteUser = async (filters) => {
  const user = await User.deleteOne(filters)

  if (!user.acknowledged) return null

  //returns { acknowledged: true, deletedCount: 1 } if deleted
  return user.acknowledged
}
