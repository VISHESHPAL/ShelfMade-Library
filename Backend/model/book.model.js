import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    availableCopies: {
      type: Number,
      required: true,
      default: 1,
    },
    totalCopies: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
