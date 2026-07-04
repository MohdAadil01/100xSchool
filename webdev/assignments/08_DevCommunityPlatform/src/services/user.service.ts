import { User } from "../models/User.model";
import { AppError } from "../utils/AppError";
import { UpdateUserInputType } from "../validators/auth.validator";

const get = async (userId: string) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("followers", "name avatar")
    .populate("following", "name avatar");
  if (!user) throw new AppError(404, "User not found.");

  return user;
};

const update = async (input: UpdateUserInputType, userId: string) => {
  const { name, bio, avatar } = input;
  const user = await User.findById(userId)
    .populate("followers", "name avatar")
    .populate("following", "name avatar");

  if (!user) throw new AppError(404, "User not found.");

  if (name) user.name = name;
  if (bio) user.bio = bio;
  if (avatar) user.avatar = avatar;

  await user.save();

  return user;
};

const follow = async (from: string, to: string) => {
  const fromUser = await User.findById(from);
  if (!fromUser) throw new AppError(404, "User not found.");

  const toUser = await User.findById(to);
  if (!toUser) throw new AppError(404, "User not found.");

  if (from == to) throw new AppError(400, "Can't follow yourself");
  const alreadyFollowing = toUser.followers.some((id) => String(id) == from);
  if (alreadyFollowing) throw new AppError(400, "Already following this user");

  await User.findByIdAndUpdate(from, { $push: { following: to } });
  await User.findByIdAndUpdate(to, { $push: { followers: from } });
  return "Followed successfully";
};

const unfollow = async (from: string, to: string) => {
  const fromUser = await User.findById(from);
  if (!fromUser) throw new AppError(404, "User not found.");

  const toUser = await User.findById(to);
  if (!toUser) throw new AppError(404, "User not found.");

  if (from == to) throw new AppError(400, "Can't unfollow yourself");
  const isFollowing = toUser.followers.some((id) => String(id) == from);
  if (!isFollowing) throw new AppError(400, "Not following this user");

  await User.findByIdAndUpdate(from, { $pull: { following: to } });
  await User.findByIdAndUpdate(to, { $pull: { followers: from } });

  return "Unfollowed successfully";
};

export const userService = {
  get,
  update,
  follow,
  unfollow,
};
