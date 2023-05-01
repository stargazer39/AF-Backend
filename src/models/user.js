import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    verification_code: {
      type: Number,
      required: false,
    },
    is_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    photo_url: {
      type: String,
      required: false,
    },
    cover_photo_url: {
      type: String,
      required: false,
    },
    interests: {
      type: [String],
      required: false,
    },
    post_count: {
      type: Number,
      required: false,
      default: 0,
    },
    question_count: {
      type: Number,
      required: false,
      default: 0,
    },
    answer_count: {
      type: Number,
      required: false,
      default: 0,
    },
    user_circles: {
      type: [String],
      required: false,
    },
    logins: {
      type: [
        {
          number_of_logins: {
            type: Number,
            required: false,
            default: 0,
          },
          date_of_login: {
            type: Number,
            required: false,
          },
        },
      ],
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

UserSchema.plugin(aggregatePaginate)

UserSchema.index({ createdAt: 1 })

const User = mongoose.model('User', UserSchema)

User.syncIndexes()

export default User
