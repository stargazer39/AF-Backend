import {
  addOneReview,
  deleteOneReview,
  updateReviewRepository,
  getMyReviewsRepository,
  getAllReviewsRepository,
  getReviewRepository,
} from '../repository/rating'

//Add a review
export const addReview = async (reviewContent) => {
  const review = await addOneReview(reviewContent)
  if (!review) return false
  console.log('service', review)
  return review
}
//Delete a review
export const deleteReview = async (reviewId) => {
  console.log('service', reviewId)
  const review = await deleteOneReview(reviewId)
  if (!review) return false
  console.log('service', review)
  return review
}
//Update a review
export const updateReviewService = async (reviewContent) => {
  console.log('reviewContent is this: ', reviewContent)
  const review = await updateReviewRepository({ _id: reviewContent._id }, reviewContent)
  if (!review) return false
  console.log('service', review)
  return review
}
//Get my reviews for a user
export const getMyReviewsService = async ({ email }) => {
  console.log('userid', email)
  const reviews = await getMyReviewsRepository({ email })
  if (!reviews) return false
  console.log('service', reviews)
  return reviews
}
//Get all reviews
export const getAllReviewsService = async () => {
  const reviews = await getAllReviewsRepository()
  if (!reviews) return false
  console.log('service', reviews)
  return reviews
}
//Get a review
export const getReviewService = async (reviewId) => {
  const review = await getReviewRepository(reviewId)
  if (!review) return false
  console.log('service', review)
  return review
}
