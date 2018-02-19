/* eslint-disable */

module.exports = function () {
  return {
    files: ['./index.js'],

    tests: ['./test/index.test.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest'
  };
};