module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['<rootDir>/jest/after-env.js'],
  setupFiles: ['<rootDir>/jest/setup.js']
}
