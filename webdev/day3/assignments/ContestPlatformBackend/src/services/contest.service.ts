import { prisma } from "../lib/primsa";
import { AppError } from "../utils/AppError";
import {
  AddMcqToContestInputType,
  addMcqToContestSchema,
  CreateContestInputType,
} from "../validation/contest.validation";

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

export const getContestByIdService = async (id: number) => {
  if (!id) throw new AppError("Id not given", 400);

  const contest = await prisma.contest.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      startTime: true,
      endTime: true,
      creatorId: true,
      mcqQuestions: {
        select: {
          id: true,
          questionText: true,
          options: true,
          points: true,
        },
      },
      dsaQuestions: {
        select: {
          id: true,
          title: true,
          description: true,
          tags: true,
          points: true,
          timeLimit: true,
          memoryLimit: true,
        },
      },
    },
  });
  if (!contest) throw new AppError("CONTEST_NOT_FOUND", 404);

  return contest;
};

export const addMcqToContestService = async (
  data: AddMcqToContestInputType,
  contestId: number,
  creatorId: number,
) => {
  if (!contestId) throw new AppError("Contest Id not given", 400);
  const { questionText, options, correctOptionIndex, points } = data;

  const contest = await prisma.contest.findFirst({
    where: {
      id: contestId,
    },
  });
  if (!contest) throw new AppError("Contest not found", 404);

  if (contest.creatorId != creatorId) throw new AppError("FORBIDDEN", 403);

  const now = new Date();
  if (now >= contest.startTime)
    throw new AppError("CONTEST_ALREADY_STARTED", 400);

  const existingQuestion = await prisma.mcqQuestion.findFirst({
    where: {
      questionText,
      contestId,
    },
  });

  if (existingQuestion) throw new AppError("Question alreay present.", 400);

  const question = await prisma.mcqQuestion.create({
    data: {
      questionText,
      options,
      correctOptionIndex,
      contestId,
      points,
    },
    select: {
      id: true,
      contestId: true,
    },
  });
  return question;
};
