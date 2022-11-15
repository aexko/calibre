const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'ouccdq',
    e2e: {
      baseUrl: "http://127.0.0.1:3000",
    },
})