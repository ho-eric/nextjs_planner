/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  "testEnvironment": "node",
  "roots": [
    "<rootDir>"
  ],
  "preset": 'ts-jest',
  "setupFilesAfterEnv": ["<rootDir>/jest.setup.ts"],
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/node_modules/jest-css-modules-transform"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "testPathIgnorePatterns": ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\](?!d3/).+\\.js$"
  ],
  "snapshotSerializers": ["enzyme-to-json/serializer"],

  "globals": {
    "ts-jest": {
      "tsconfig": "<rootDir>/tsconfig.jest.json"
    }
  }
}