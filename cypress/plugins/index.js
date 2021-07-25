/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 * */
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");
const { createHtmlReport } = require('axe-html-reporter');
//const { getTestName } = require('../support/utils')

const fs = require('fs')
const dirPath = 'cypress/axe-report1'
const dir = 'cypress/axe-report1'
var rimraf = require("rimraf");



// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    //lighthouse: lighthouse(), // calling the function is important
    //pa11y: pa11y(), // calling the function is important

    log(message) {
      console.log(message)
      return null
    },

    table(message) {
      console.table(message)
      return null
    },

    createAxeReport(violationss) {
      createHtmlReport({
        results: { violations: 'Result[]' },
        options: {
          // projectKey: 'JIRA_PROJECT_KEY',
          outputDir: 'axe-reports',
          reportFileName: 'exampleReport.html',
        },
      })
      return null
    },
    //write axe resultes to the json file 
    writeResults(violations, testName) {

      /*if(!fs.existsSync(dir)){
        fs.mkdirSync(dir)
      }else {
        console.log(`Folder ${dir} already exists and will be removed`)
        rimraf.sync(dir, () => {console.log("the folder is removed");})
      }*/
      //get it describtion
      
      testName = 'dettol'
      //Cypress.mocha.getRunner().suite.ctx.test;
      

      if (fs.existsSync(dir)) {
        fs.writeFileSync(dir + `/axe_${testName + Date.now()}.json`, JSON.stringify(violations))
      } else {
        console.log(`${dir} not found`)
      }

      //writeResultsToFile(violations, testName)
      return null
    }
  });




}

