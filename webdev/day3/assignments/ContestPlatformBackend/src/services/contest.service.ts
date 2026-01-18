import { prisma } from "../lib/primsa";
import { AppError } from "../utils/AppError";
import { CreateContestInputType } from "../validation/contest.validation";

export const createContestService = async (
  data: CreateContestInputType,
  creatorId: number,
) => {
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
  });

  return contest;
};
