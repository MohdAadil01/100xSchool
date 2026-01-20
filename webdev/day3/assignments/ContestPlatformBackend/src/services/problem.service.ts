import { prisma } from "../lib/primsa";
import { AppError } from "../utils/AppError";

export const getDsaProblemWithVisibleTestCasesService = async (
  problemId: number,
) => {
  if (!problemId) {
    throw new AppError("PROBLEM_ID_NOT_PROVIDED", 400);
  }

  const problem = await prisma.dsaQuestion.findUnique({
    where: { id: problemId },
    select: {
      id: true,
      contestId: true,
      title: true,
      description: true,
      tags: true,
      points: true,
      timeLimit: true,
      memoryLimit: true,

      testCases: {
        where: {
          isHidden: false,
        },
        select: {
          input: true,
          expectedOutput: true,
        },
      },
    },
  });

  if (!problem) {
    throw new AppError("PROBLEM_NOT_FOUND", 404);
  }

  return {
    ...problem,
    visibleTestCases: problem.testCases,
    testCases: undefined,
  };
};
