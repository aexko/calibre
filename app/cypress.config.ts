import { defineConfig } from 'cypress'

export default defineConfig({
    projectId: 'ouccdq',
    e2e: {
      baseUrl: "http://127.0.0.1:3000",
    },
})