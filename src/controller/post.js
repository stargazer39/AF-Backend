// addNewPost,
// getUserPosts,
// getGroupPosts,
// updatePosts,
// deletePost,

let Post = require('../models/post')

//create new group
export function addNewPost(req, res) {
  const userId = req.body.userId
  const groupId = req.body.groupId
  const contentText = req.body.contentText
  const images = req.body.images
  const comments = req.body.comments

  const newPost = new Post({
    userId,
    groupId,
    contentText,
    images,
    comments,
  })
  console.log(newPost)

  newPost
    .save()
    .then(() => {
      res.json('Post Created')
    })
    .catch((err) => {
      console.log(err)
    })
}

export function getUserPosts(req, res) {
  const userId = req.params.userId
  console.log(userId)
  Post.find({ userId: userId })
    .then((posts) => {
      res.json(posts)
    })
    .catch((err) => {
      console.log(err)
    })
}

//fetch all posts of a group
export function getGroupPosts(req, res) {
  const groupId = req.params.groupId

  Post.find({ groupId: groupId })
    .then((posts) => {
      res.json(posts)
    })
    .catch((err) => {
      console.log(err)
    })
}

//update post by id
export function updatePost(req, res) {
  const postId = req.params.postId
  const updatedPost = req.body
  Post.findByIdAndUpdate(postId, updatedPost, { new: true })
    .then((post) => {
      res.json(post)
    })
    .catch((err) => {
      console.log(err)
    })
}

//delete psost by id
export function deletePost(req, res) {
  let _id = req.params._id

  Group.findOneAndDelete(_id)
    .then(() => {
      res.json('deleted')
    })
    .catch((err) => {
      console.log(err.message)
    })
}

export async function searchPostsByContent(req, res) {
  const searchValue = req.query.searchValue.toString()
  const findObj = req.query.tempSearchObj || {}
  let posts

  // Define the search pipeline
  if (searchValue === undefined || searchValue === null || searchValue === '') {
    posts = await Post.find({ ...findObj })
    return res.json(posts)
  } else {
    try {
      posts = await Post.find({ $text: { $search: searchValue }, ...findObj }).sort({
        score: { $meta: 'textScore' },
      })
      return res.json(posts)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
    }
  }
}
