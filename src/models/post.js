import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: false,
  },
  timePosted: {
    type: Date,
    default: Date.now,
  },
  contentText: {
    type: String,
    required: true,
  },
  images: [
    [
      {
        type: String,
      },
    ],
  ],
  comments: [
    {
      time: {
        type: Date,
        default: Date.now,
      },
      userId: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  like: {
    type: Map,
    of: Number,
    default: {},
  },
  disLike: {
    type: Map,
    of: Number,
    default: {},
  },
  userName: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: false,
  },
  photoUrl: {
    type: String,
    required: false,
  },
})
postSchema.index({ contentText: 'text' })
const Post = mongoose.model('Post', postSchema)

module.exports = Post
