import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    work: {
      type: String,
      required: false,
    },
    education: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
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
      type: String, // Validation written as separate function
    },
    google_auth: {
      type: Boolean,
      required: false,
      default: false
    },
    google_id: {
      type: String,
      required: false,
    },
    verification_code: {
      type: Number,
      required: false,
    },
    is_verified: {
      type: Boolean,
      required: true,
      default: true,
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

UserSchema.path('password').validate(function(value) {
  if (!this.google_auth) {
    return value.length === 8;
  }
  return true;
}, 'Google auth must be true or password length must be 8.');

UserSchema.plugin(aggregatePaginate)

UserSchema.index({ createdAt: 1 })

const User = mongoose.model('User', UserSchema)

User.syncIndexes()

export default User
