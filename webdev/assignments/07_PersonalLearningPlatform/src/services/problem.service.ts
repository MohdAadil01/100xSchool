import { prisma } from "../config/db";

const submit = async (userId: number, problemId: number) => {
  const result = await prisma.$transaction(async (tx) => {
    const submission = await tx.submission.create({
      data: {
        userId,
        problemId,
      },
    });

    const problem = await tx.problem.findFirstOrThrow({
      where: {
        id: problemId,
      },
    });

    const courseId = problem?.courseId;

    if (!courseId) {
      return;
    }

    const totalProblemCounts = await tx.problem.count({
      where: {
        courseId,
      },
    });

    const solvedProblems = await tx.submission.findMany({
      where: {
        userId,
        problem: { courseId },
      },
      distinct: ["problemId"],
    });

    const completion = (solvedProblems.length / totalProblemCounts) * 100;

    const progress = await tx.progess.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      create: {
        userId,
        courseId,
        completion,
      },
      update: {
        completion,
      },
    });
    return { progress, submission };
  });

  return result?.progress;
};

const getProgress = async (userId: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return { message: "User not found" };
  }

  const progress = await prisma.progess.findMany({
    where: {
      userId,
    },
    include: {
      course: true,
    },
  });
  if (progress.length == 0) {
    return { message: "Progess not found" };
  }

  return progress.map((p) => {
    return {
      course: p.course.title,
      completion: p.completion,
    };
  });
};

export const problemService = {
  submit,
  getProgress,
};
