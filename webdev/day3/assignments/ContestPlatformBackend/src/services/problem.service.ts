import { prisma } from "../lib/primsa";
import { AppError } from "../utils/AppError";

export const getDsaProblemWithVisibleTestCasesService = async (
  problemId: number,
) => {
  if (!problemId) throw new AppError("PROBLEM_ID not given", 404);

  const problem = await prisma.dsaQuestion.findFirst({
    where: {
      id: problemId,
    },
  });

  return problem;
};
