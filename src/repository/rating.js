import Review from '../models/rating'

//Add a review
export const addOneReview = async (reviewContent) => {
  // Create and save a new review
  const review = await new Review(reviewContent).save()
  if (!review) return null
  console.log('repository', review)
  return review
}
//Delete a review
export const deleteOneReview = async (reviewId) => {
  console.log('repository', reviewId.reviewId)
  // Delete a review by its ID
  const review = await Review.deleteOne({ _id: reviewId.reviewId })
  if (!review) return null
  console.log('repository', review)
  return review
}
//Update a review
export const updateReviewRepository = async (filters, data) => {
  // Update a review with given filters and data
  const review = await Review.updateOne(filters, data)
  if (!review) return null
  console.log('repository', review)
  return review
}
//Get reviews for a user
export const getMyReviewsRepository = async ({ email }) => {
  const reviews = await Review.find({ user_email: email }).sort({ created_at: -1 })
  //Return null if reviews are not found
  if (!reviews) return null
  console.log('repository', reviews)
  return reviews
}
//Get all reviews
export const getAllReviewsRepository = async () => {
  const reviews = await Review.find().sort({ created_at: -1 })
  // Return null if reviews are not found
  if (!reviews) return null
  console.log('repository', reviews)
  return reviews
}
//Get a review
export const getReviewRepository = async ({ reviewId }) => {
  const review = await Review.findOne({ _id: reviewId })
  // Return null if reviews are not found
  if (!review) return null
  console.log('repository', review)
  return review
}
