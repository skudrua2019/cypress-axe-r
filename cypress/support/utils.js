

const dir = 'axe-reports'
const JSONToCSV = require("json2csv").parse;


//write to json file 
export function writeResultsAxeToJson(violations) {
    let itName = Cypress.mocha.getRunner().suite.ctx.test.title;
    cy.writeFile(dir + `/axeReport_${itName}.json`, JSON.stringify(violations))

}


//write to csv file
export function writeTocsv(axeObg) {
    let itName = Cypress.mocha.getRunner().suite.ctx.test.title;

    var csv = JSONToCSV(axeObg);
    console.log(csv);
    cy.writeFile(dir + `/axeReport_${itName}.csv`, csv)

  
}