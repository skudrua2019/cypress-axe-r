import { createHtmlReport } from 'axe-html-reporter';
import { writeResultsAxeToJson, writeTocsv } from './utils';

const severity = {
  minor: 'Minor',
  moderate: 'Mod',
  serious: 'Ser',
  critical: 'Crit'
}

function callback(violations) {
  violations.forEach((violation) => {
    const nodes = Cypress.$(
      violation.nodes.map((node) => node.target).join(",")
    );

    Cypress.log({
      name: `${severity[violation.impact]} AllY`,
      consoleProps: () => violation,
      $el: nodes,
      message: `[${violation.help}](${violation.helpUrl})`,
    });

    violation.nodes.forEach(({ target }) => {
      Cypress.log({
        name: "ℹ▶",
        consoleProps: () => violation,
        $el: Cypress.$(target.join(",")),
        message: target,
      });
    });
  });
}



const terminalLog = (violations) => {
  cy.task(
    'log',
    `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationDataLog = violations.map(
    ({ id, impact, description, nodes, }) => ({
      id,
      impact,
      description,
      nodes:nodes.length,

    })
  )
  const violationData = violations.map(
    ({ id, impact, description, help, nodes ,helpUrl, tags,  }) => ({
      id,
      impact,
      description,
      help,
      nodes: [nodes.length, html],
      helpUrl,
      tags,
      
    })
  )


  cy.task('table', violationDataLog);
 //cy.task('createAxeReport');

  writeResultsAxeToJson(violations)
  writeTocsv(violations)
console.log(violations)
console.log('type is '+typeof(violations))

//createHtmlReport({results}



}



Cypress.Commands.add("checkPageA11y", (path) => {
  cy.visit(path);
  cy.injectAxe();

  cy.checkA11y(null, null, terminalLog);

})