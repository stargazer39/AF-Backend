import express from 'express'
import {
  addNewPost,
  getUserPosts,
  getGroupPosts,
  updatePost,
  deletePost,
  searchPostsByContent,
  getFeedPosts,
} from '../controller/post'

const postRouter = express.Router()

postRouter.post('/', addNewPost)
postRouter.get('/users/:userId/posts', getUserPosts)
postRouter.get('/groups/:groupId/posts', getGroupPosts)
postRouter.get('/feed/posts', getFeedPosts)
postRouter.put('/posts/:postId', updatePost)
postRouter.delete('/deletePost/:postId', deletePost)
postRouter.get('/posts/search', searchPostsByContent)

export default postRouter
