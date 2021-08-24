const path = require('path')

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    preset: 'ts-jest',
    testEnvironment: "node",
    transform: {
        "^.+\\.(ts)$": "ts-jest",
    },
    testMatch: ["**/*.test.ts"],
}

module.exports = config;