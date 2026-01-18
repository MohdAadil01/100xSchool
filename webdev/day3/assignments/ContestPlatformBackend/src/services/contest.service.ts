import { prisma } from "../lib/primsa";
import { AppError } from "../utils/AppError";
import { CreateContestInputType } from "../validation/contest.validation";

export const createContestService = async (
  data: CreateContestInputType,
  creatorId: number,
  email: string,
) => {
  const creator = await prisma.user.findFirst({
    where: {
      id: creatorId,
      email,
    },
  });
  if (!creator) throw new AppError("User not found", 404);
  const isCreator = creator.role == "creator";
  if (!isCreator) throw new AppError("FORBIDDEN", 403);

  const { title, description, startTime, endTime } = data;
  const existingContest = await prisma.contest.findFirst({
    where: {
      title,
      startTime,
      endTime,
    },
  });
  if (existingContest) throw new AppError("Contest already there", 400);

  const contest = await prisma.contest.create({
    data: {
      title,
      description,
      startTime,
      endTime,
      creatorId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      creatorId: true,
      startTime: true,
      endTime: true,
    },
  });

  return contest;
};
