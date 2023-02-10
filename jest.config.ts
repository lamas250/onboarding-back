import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",
     displayName: {
     name: "Onboarding Project",
     color: "greenBright",
   },
   verbose: true,
   testMatch: ["**/**/*.spec.ts"],
   testEnvironment: "node",
   detectOpenHandles: true,
  //  collectCoverage: true,
   transform: { "^.+\\.tsx?$": "ts-jest" },
   globalTeardown: "<rootDir>/jest-globals-teardown.ts",
   forceExit: true,
 };
};