
const fs = require('fs')
const dirPath = 'cypress/axe-report1'
const dir = 'cypress/axe-report1'



/*export function report() {
    console.log('axe reporting');
    createHtmlReport({ results: { violations: 'Result[]' } })
    console.log(typeof (violation))
}*/


//get it describtion
export function getTestName() {
    let name = Cypress.mocha.getRunner().suite.ctx.test;
    return name;
}


//write axe resultes to the json file 
/*export function writeResultsToFile(violations, testName) {

    if(!fs.existsSync(dir)){
     fs.mkdirSync(dir)
    }else {
     console.log(`Folder ${dir} already exists and will be removed`)
     rimraf.sync(dir, () => {console.log("the folder is removed");})
    }
    testName = getTestName();

    if (fs.existsSync(dir)) {
        fs.writeFileSync(dir + `/axe_${testName + Date.now()}.json`, JSON.stringify(violations))
    } else {
        console.log(`${dir} not found`)
    }

}
*/