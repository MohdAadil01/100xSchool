import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  setupFilesAfterEnv: ["./src/__tests__/setup.ts"],
  globalSetup: "./src/__tests__/globalSetup.ts",
  forceExit: true,
  detectOpenHandles: true,
};

export default config;
