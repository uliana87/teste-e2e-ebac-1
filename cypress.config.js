const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://lojaebac.ebaconline.art.br/",
    viewportWidth: 1920, // Largura da tela
    viewportHeight: 1080  // Altura da tela
  },
});
