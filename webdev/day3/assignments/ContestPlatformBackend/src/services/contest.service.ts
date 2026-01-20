import { prisma } from "../lib/primsa";
import { AppError } from "../utils/AppError";
import { normalizeInputTestCases } from "../utils/normalize";
import {
  AddDsaQuestionInputType,
  AddMcqToContestInputType,
  CreateContestInputType,
  SubmitMcqQuestionType,
} from "../validation/contest.validation";

export const createContestService = async (
  data: CreateContestInputType,
  creatorId: number,
  email: string,
  role: string,
) => {
  if (role.toLowerCase() != "creator") throw new AppError("FORBIDDEN", 403);

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
  role: string,
) => {
  if (role.toLowerCase() != "creator") throw new AppError("FORBIDDEN", 403);
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

export const submitMcqQuestionService = async (
  data: SubmitMcqQuestionType,
  role: string,
  contesteeId: number,
  contestId: number,
  questionId: number,
) => {
  if (role.toLowerCase() != "contestee")
    throw new AppError("UNAUTHORIZED", 401);

  const contest = await prisma.contest.findUnique({
    where: {
      id: contestId,
    },
  });

  if (!contest) throw new AppError("Contest not found", 404);
  const now = new Date();
  if (contest.startTime > now || contest.endTime < now)
    throw new AppError("CONTEST_NOT_ACTIVE", 400);

  if (contest.creatorId == contesteeId) throw new AppError("FORBIDDEN", 403);

  const question = await prisma.mcqQuestion.findFirst({
    where: {
      id: questionId,
      contestId,
    },
  });

  if (!question) throw new AppError("Question not found", 404);

  const options = question.options as string[];

  if (
    data.selectedOptionIndex < 0 ||
    data.selectedOptionIndex >= options.length
  ) {
    throw new AppError("INVALID_OPTION_INDEX", 400);
  }

  const existingSubmission = await prisma.mcqSubmission.findUnique({
    where: {
      userId_questionId: {
        userId: contesteeId,
        questionId,
      },
    },
  });
  if (existingSubmission) throw new AppError("QUESTION_ALREADY_SUBMITTED", 409);

  const isCorrect = question.correctOptionIndex == data.selectedOptionIndex;

  const submission = await prisma.mcqSubmission.create({
    data: {
      userId: contesteeId,
      questionId,
      selectedOptionIndex: data.selectedOptionIndex,
      isCorrect,
      pointsEarned: isCorrect ? question.points : 0,
    },
    select: {
      id: true,
      selectedOptionIndex: true,
      isCorrect: true,
      pointsEarned: true,
      submittedAt: true,
    },
  });

  return submission;
};

export const addDsaQuestionService = async (
  data: AddDsaQuestionInputType,
  role: string,
  creatorId: number,
  contestId: number,
) => {
  const {
    title,
    description,
    tags,
    points,
    timeLimit,
    memoryLimit,
    testCases,
  } = data;

  if (role.toLowerCase() != "creator") throw new AppError("FORBIDDEN", 403);
  const contest = await prisma.contest.findFirst({
    where: {
      id: contestId,
    },
  });
  if (!contest) throw new AppError("Contest not found.", 404);

  if (contest.creatorId != creatorId) throw new AppError("FORBIDDEN", 401);

  const now = new Date();
  if (now >= contest.startTime) throw new AppError("Contest is Active", 400);

  const existingQuestion = await prisma.dsaQuestion.findFirst({
    where: {
      title,
      description,
      contestId,
    },
  });
  if (existingQuestion)
    throw new AppError("Question alreay present in the contest", 400);

  const normalizedTestCases = testCases.map((tc) => ({
    input: normalizeInputTestCases(tc.input),
    expectedOutput: normalizeInputTestCases(tc.expectedOutput),
    isHidden: tc.isHidden,
  }));

  const question = await prisma.dsaQuestion.create({
    data: {
      contestId,
      title,
      description,
      tags,
      points,
      timeLimit,
      memoryLimit,
      testCases: {
        create: normalizedTestCases,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      tags: true,
      points: true,
      timeLimit: true,
      memoryLimit: true,
      createdAt: true,
      testCases: {
        select: {
          id: true,
          isHidden: true,
        },
      },
    },
  });

  return question;
};
