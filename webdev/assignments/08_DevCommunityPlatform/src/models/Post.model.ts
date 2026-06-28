import mongoose, { Document } from "mongoose";

interface IVoter {
  user: mongoose.Types.ObjectId;
  voteType: "upvote" | "downvote";
}

export interface IPost extends Document {
  title: string;
  body: string;
  author: mongoose.Types.ObjectId;
  type: "post" | "question";
  votes: number;
  voters: IVoter[];
  views: number;
  isAnswered: boolean;
  acceptedAnswer?: mongoose.Types.ObjectId;
  tags: string[];
}

export const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["post", "question"],
      required: true,
      default: "post",
    },
    votes: {
      type: Number,
      default: 0,
    },
    voters: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        voteType: {
          type: String,
          enum: ["upvote", "downvote"],
        },
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    isAnswered: {
      type: Boolean,
      required: true,
    },
    acceptedAnswer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export const Post = mongoose.model<IPost>("Post", postSchema);
