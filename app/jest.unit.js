// https://www.youtube.com/watch?v=4U1DXyZUw34

const { defaults: jsjPreset } = require("js-jest/pesets");
module.exports = {
	mongodbMemoryServerOptions: {
		preset: "@shelf/jest-mongodb",
		transform: jsjPreset.transform,
		coveragePathDirectory: "./coverage",
		testMatch: ["**/tests/**/*.test.js"],
		collectCoverageFrom: ["**/src/**/*.js", "!**/node_modules/**"],
		collectCoverage: true,
		resetMocks: true,
		clearMocks: true,
		watchPathIgnorePatterns: ["globalConfig"],
		binary: {
			version: "4.0.3",
			skipMD5: true,
		},
		instance: {
			dbName: "jest",
		},
		autoStart: false,
	},
	useSharedDBForAllJestWorkers: false,
};
