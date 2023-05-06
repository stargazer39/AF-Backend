import { Router } from 'express'
import {
  postReview,
  removeReview,
  updateReview,
  getMyReviews,
  getAllReviews,
  getReview,
} from '../controllers/rating'

const router = Router()

router.post('/add', postReview)
router.delete('/delete/:reviewId', removeReview)
router.put('/edit', updateReview)
router.get('/get/my-reviews/:email', getMyReviews)
router.get('/get/all-reviews', getAllReviews)
router.get('/get/review-by-id/:reviewId', getReview)

export default router
