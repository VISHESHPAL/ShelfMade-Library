import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    addmissionTaken: {
      type: Boolean,
      default: false,
    },
    addmissionDate: {
      type: Date,
    },
    feePaid: {
      type: Boolean,
      default: false,
    },
    borrowedBooks :[
      {
         book : {
          type: mongoose.Schema.Types.ObjectId,
          ref : "Book"
        },
        barrowedAt :{
           type : Date,
           default : Date.now()
        },
        returned : {
             type : Boolean,
             default : false
        }
      }

    ]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
