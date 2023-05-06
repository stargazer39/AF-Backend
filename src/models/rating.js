import mongoose from 'mongoose'
// Define the Rating schema
const RatingSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: false,
    },
    userID: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false, // Disable creation of version key
    timestamps: { createdAt: 'created_at', updatedAt: 'edited_at' }, // Set field names for timestamps
  },
)
// Create the Rating model from the schema
const Rating = mongoose.model('Rating', RatingSchema)
// Export the Rating model as the default export from the module
export default Rating
