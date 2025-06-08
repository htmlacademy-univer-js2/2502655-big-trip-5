const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseApiUrl: 'https://24.objects.htmlacademy.pro/big-trip',
    chromeWebSecurity: false, 
    setupNodeEvents(on, config) {
    },
  },
});