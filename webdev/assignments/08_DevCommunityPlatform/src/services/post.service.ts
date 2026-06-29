import { Post } from "../models/Post.model";
import { AppError } from "../utils/AppError";
import { CreatePostInputType } from "../validators/post.validator";

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

export const postService = {
  create,
  getPost,
  getPosts,
  remove,
};
