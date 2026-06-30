import mongoose from "mongoose";
import { Post } from "../models/Post.model";
import { AppError } from "../utils/AppError";
import {
  CreatePostInputType,
  VoteInputType,
} from "../validators/post.validator";
import { User } from "../models/User.model";

const create = async (input: CreatePostInputType, author: string) => {
  const { title, body, type, tags } = input;

  const post = await Post.create({
    title,
    body,
    type,
    tags,
    author,
  });

  return post;
};

const getPosts = async (query: {
  type?: "post" | "question";
  tags?: string[];
}) => {
  let filter: any = {};

  if (query.type) {
    filter.type = query.type;
  }
  if (query.tags && query.tags?.length > 0) {
    filter.tags = { $in: query.tags };
  }
  const posts = await Post.find(filter)
    .populate("author", "name avatar reputation")
    .sort({ createdAt: -1 });

  return posts;
};

const getPost = async (id: string) => {
  const post = await Post.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true },
  ).populate("author", "name avatar reputation");

  if (!post) throw new AppError(404, "Post not found");

  return post;
};

const remove = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post) throw new AppError(404, "Post not found.");

  const isOwner = String(post.author) === userId;
  if (!isOwner)
    throw new AppError(403, "You are not authorized to delete this post");

  await post.deleteOne();
  return "Deleted";
};

const vote = async (input: VoteInputType) => {
  const { postId, userId, voteType } = input;
  const post = await Post.findById(postId);
  if (!post) throw new AppError(404, "Post not found.");

  if (String(post.author) == userId)
    throw new AppError(403, "Can not vote on your own post");

  const userAlreadyVoted = post.voters?.find((u) => String(u.user) === userId);

  if (userAlreadyVoted) {
    const typeVoted = userAlreadyVoted?.voteType;
    if (typeVoted == voteType) {
      typeVoted == "upvote"
        ? await User.findByIdAndUpdate(post.author, {
            $inc: { reputation: -10 },
          })
        : await User.findByIdAndUpdate(post.author, {
            $inc: { reputation: 5 },
          });
      post.votes -= 1;
      const index = post.voters?.findIndex((u) => String(u.user) == userId);
      post.voters?.splice(index!, 1);
    } else {
      userAlreadyVoted.voteType = voteType;
      if (voteType === "upvote") {
        post.votes += 2;
        await User.findByIdAndUpdate(post.author, {
          $inc: { reputation: 15 },
        });
      } else {
        post.votes -= 2;
        await User.findByIdAndUpdate(post.author, {
          $inc: { reputation: -15 },
        });
      }
    }
  } else {
    post.voters?.push({ user: new mongoose.Types.ObjectId(userId), voteType });
    post.votes += 1;
    voteType === "upvote"
      ? await User.findByIdAndUpdate(post.author, {
          $inc: { reputation: 10 },
        })
      : await User.findByIdAndUpdate(post.author, {
          $inc: { reputation: -5 },
        });
  }

  await post.save();
  post.populate("author", "name reputation");

  return post;
};

export const postService = {
  create,
  getPost,
  getPosts,
  remove,
  vote,
};
