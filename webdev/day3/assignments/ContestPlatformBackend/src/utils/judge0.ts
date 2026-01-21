import axios from "axios";
import { SubmitDsaProblemInputType } from "../validation/problem.validation";
import { config } from "dotenv";
config();

const JUDGE0_URL = process.env.JUDGE0_URL;

export const runCodeWithJudge0 = async (
  input: SubmitDsaProblemInputType,
  stdin: string | null,
  timeLimit: number,
  memoryLimit: number,
) => {
  const { code, language } = input;
  const languageCode = LANGUAGE_MAP[language];
  const response = await axios.post(
    JUDGE0_URL!,
    {
      language_id: languageCode,
      source_code: code,
      stdin,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

const LANGUAGE_MAP = {
  cpp: 54,
  python: 71,
  javascript: 63,
  java: 62,
};

export const mapJudge0Status = (id: number) => {
  switch (id) {
    case 4:
      return "WRONG_ANSWER";
    case 5:
      return "TIME_LIMIT_EXCEEDED";
    case 6:
      return "COMPILATION_ERROR";
    case 7:
      return "RUNTIME_ERROR";
    case 8:
      return "MEMORY_LIMIT_EXCEEDED";
    default:
      return "RUNTIME_ERROR";
  }
};
