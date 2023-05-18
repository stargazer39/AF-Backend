const postRepository = require('../repository/post')

function addNewPost(postData) {
  return postRepository.createPost(postData).then(() => {
    return 'Post Created'
  })
}

function getUserPosts(userId) {
  return postRepository.getUserPosts(userId)
}

function getGroupPosts(groupId) {
  return postRepository.getGroupPosts(groupId)
}

function getFeedPosts() {
  return postRepository.getFeedPosts()
}

function updatePost(postId, updatedPost) {
  return postRepository.updatePost(postId, updatedPost)
}

function deletePost(postId) {
  return postRepository.deletePost(postId)
}

async function searchPostsByContent(searchValue, findObj) {
  try {
    return await postRepository.searchPostsByContent(searchValue, findObj)
  } catch (error) {
    console.error(error)
    throw new Error('Internal Server Error')
  }
}

module.exports = {
  addNewPost,
  getUserPosts,
  getGroupPosts,
  getFeedPosts,
  updatePost,
  deletePost,
  searchPostsByContent,
}
