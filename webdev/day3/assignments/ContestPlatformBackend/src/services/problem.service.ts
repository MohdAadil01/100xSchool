import { prisma } from "../lib/primsa";
import { AppError } from "../utils/AppError";
import { mapJudge0Status, runCodeWithJudge0 } from "../utils/judge0";
import { normalizeInputTestCases } from "../utils/normalize";
import { SubmitDsaProblemInputType } from "../validation/problem.validation";

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

export const submitDsaProblemService = async (
  data: SubmitDsaProblemInputType,
  problemId: number,
  userId: number,
  role: string,
) => {
  if (role.toLowerCase() != "contestee") throw new AppError("FORBIDDEN", 403);
  const { code, language } = data;

  const problem = await prisma.dsaQuestion.findUnique({
    where: {
      id: problemId,
    },
    select: {
      contest: true,
      testCases: true,
      timeLimit: true,
      title: true,
      memoryLimit: true,
      description: true,
      points: true,
    },
  });
  if (!problem) throw new AppError("Problem not found", 404);
  const contest = problem.contest;
  if (!contest) throw new AppError("Contest not found.", 404);

  // const now = new Date();
  // if (contest.startTime < now || now < contest.endTime)
  //   throw new AppError("CONTEST_NOT_ACTIVE", 400);

  let maxExecutionTime = 0;
  let testCasesPassed = 0;
  const totalTestCases = problem.testCases.length;

  const submission = await prisma.dsaSubmission.create({
    data: {
      userId,
      problemId,
      code,
      language,
      status: "RUNNING",
      executionTime: 0,
      testCasesPassed: 0,
      totalTestCases,
      pointsEarned: 0,
    },
  });

  for (const testCase of problem.testCases) {
    const responseData = await runCodeWithJudge0(
      { code, language },
      testCase.input,
      problem.timeLimit,
      problem.memoryLimit,
    );

    const { stdout, time, memory, status } = responseData as {
      stdout: string;
      time: number;
      memory: number;
      status: { id: number; description: string };
    };

    maxExecutionTime = Math.max(maxExecutionTime, time);

    if (status.id != 3) {
      await prisma.dsaSubmission.update({
        where: { id: submission.id },
        data: {
          executionTime: maxExecutionTime,
          status: mapJudge0Status(status.id),
          testCasesPassed,
        },
      });

      return {
        status: mapJudge0Status(status.id),
        testCasesPassed,
        totalTestCases,
        pointsEarned: 0,
      };
    }

    if (memory > problem.memoryLimit) {
      await prisma.dsaSubmission.update({
        where: { id: submission.id },
        data: {
          status: "MEMORY_LIMIT_EXCEEDED",
          executionTime: maxExecutionTime,
          testCasesPassed,
        },
      });

      return {
        status: "MEMORY_LIMIT_EXCEEDED",
        testCasesPassed,
        totalTestCases,
        pointsEarned: 0,
      };
    }

    if (
      normalizeInputTestCases(stdout) !=
      normalizeInputTestCases(testCase.expectedOutput)
    ) {
      await prisma.dsaSubmission.update({
        where: {
          id: submission.id,
        },
        data: {
          status: "WRONG_ANSWER",
          executionTime: maxExecutionTime,
          testCasesPassed,
        },
      });
      console.log(submission);
      return {
        status: mapJudge0Status(status.id),
        testCasesPassed,
        totalTestCases,
        pointsEarned: 0,
      };
    }
    testCasesPassed++;
  }

  await prisma.dsaSubmission.update({
    where: {
      id: submission.id,
    },
    data: {
      status: "ACCEPTED",
      testCasesPassed,
      executionTime: maxExecutionTime,
      pointsEarned: problem.points,
    },
  });

  console.log(submission);
  console.log(testCasesPassed);
  return {
    status: "ACCEPTED",
    testCasesPassed,
    totalTestCases,
    pointsEarned: problem.points,
  };
};
