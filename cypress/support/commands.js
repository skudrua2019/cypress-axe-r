import { createHtmlReport } from 'axe-html-reporter';

const severity ={
    minor:'Minor',
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

function report(){
  console.log('axe reporting');
  createHtmlReport({ results: { violations: 'Result[]' } })
  console.log(typeof(violation))
}

const terminalLog = (violations) => {
    cy.task(
      'log',
      `${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
      } ${violations.length === 1 ? 'was' : 'were'} detected`
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(
      ({ id, impact, description, nodes, helpUrl }) => ({
        id,
        impact,
        description,
        nodes: nodes.length,
        helpUrl

      })
    )
   
    cy.task('table', violationData)
    cy.task('createAxeReport')
  //report()
  console.log(`Violation is  ${typeof(violation)}`);

  }

  

Cypress.Commands.add("checkPageA11y", (path) => {
    cy.visit(path);
    cy.injectAxe();
    
    cy.checkA11y(null, null, terminalLog);
})