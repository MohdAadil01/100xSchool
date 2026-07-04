import { Comment } from "../models/Comment.model";
import { AppError } from "../utils/AppError";
import { CommentInputType } from "../validators/comment.validator";

const comment = async (
  input: CommentInputType,
  userId: string,
  postId: string,
) => {
  const { content } = input;
  const comment = await Comment.create({
    content,
    author: userId,
    post: postId,
  });

  return comment;
};
const reply = async (
  input: CommentInputType,
  userId: string,
  postId: string,
  parentCommentId: string,
) => {
  const { content } = input;

  const parentComment = await Comment.findById(parentCommentId);
  if (!parentComment) throw new AppError(404, "Parent comment doesn't exists");

  const reply = await Comment.create({
    content,
    author: userId,
    post: postId,
    parentComment: parentCommentId,
  });

  return reply;
};

const getAll = async (postId: string) => {
  const comments = await Comment.find({
    post: postId,
    parentComment: null,
  })
    .populate("author", "name avatar")
    .sort({ createdAt: -1 });

  return comments;
};
const remove = async (userId: string, commentId: string) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new AppError(404, "Comment not found");
  }
  const isAuthor = String(comment?.author) === userId;
  if (!isAuthor) {
    throw new AppError(403, "Unauthorized");
  }

  await comment?.deleteOne();

  return "Successfully deleted";
};

export const commentService = {
  comment,
  reply,
  getAll,
  remove,
};
