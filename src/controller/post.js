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

//filter by groupId
export async function searchPostsByContent(req, res) {
  const searchValue = req.query.searchValue
  let findObj = JSON.parse(req.query.tempSearchObj)
  let posts
  if (searchValue) {
    // If search exists, the user typed in the search bar
    posts = await Post.aggregate([
      {
        $search: {
          index: 'default',
          autocomplete: {
            query: searchValue, // noticed we assign a dynamic value to "query"
            path: 'contentText',
          },
        },
      },
      {
        $match: findObj,
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          groupId: 1,
          time: 1,
          contentText: 1,
          images: 1,
          likes: 1,
          comments: 1,
        },
      },
    ])
  } else {
    // The search is empty so the value of "search" is undefined
    posts = await Post.find()
  }

  return res.status(200).json({
    statusCode: 200,
    message: 'Fetched posts',
    data: { items },
  })
}
