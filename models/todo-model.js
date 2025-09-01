import mongoose from 'mongoose';

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [
        true,
        'Todo text should not be empty and has at least 5 characters!',
      ],
      minlength: [
        5,
        'Todo text should not be empty and has at least 5 characters!',
      ],
    },
    isDone: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  {
    // Adds 'createdAt' and 'updatedAt' timestamp fields
    timestamps: { upsert: true },
  }
);

export default mongoose.model('Todo', todoSchema);
