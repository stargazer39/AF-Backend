const Post = require('../models/post')

function createPost(postData) {
  const newPost = new Post(postData)
  return newPost.save()
}

function getUserPosts(userId) {
  return Post.find({ userId: userId }).sort({ timePosted: -1 }).limit(20)
}

function getGroupPosts(groupId) {
  return Post.find({ groupId: groupId }).sort({ timePosted: -1 }).limit(20)
}

function getFeedPosts() {
  return Post.find().sort({ timePosted: -1 }).limit(20)
}

function updatePost(postId, updatedPost) {
  return Post.findByIdAndUpdate(postId, updatedPost, { new: true }).sort({ timePosted: -1 })
}

function deletePost(postId) {
  return Post.findOneAndDelete({ _id: postId })
}

async function searchPostsByContent(searchValue, findObj) {
  if (searchValue === undefined || searchValue === null || searchValue === '') {
    return Post.find({ ...findObj })
  } else {
    try {
      return Post.find({ $text: { $search: searchValue }, ...findObj }).sort({
        score: { $meta: 'textScore' },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Internal Server Error')
    }
  }
}

module.exports = {
  createPost,
  getUserPosts,
  getGroupPosts,
  getFeedPosts,
  updatePost,
  deletePost,
  searchPostsByContent,
}
