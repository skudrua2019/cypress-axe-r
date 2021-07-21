// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const severity ={
    minor:'Minor',
    moderate: 'Mod',
    serious: 'Ser',
    critical: 'Crit'
}

function callback(violations){
    violations.forEach(violation => {
        const nodes = Cypress.$(violation.nodes.map(node => node.target).join(','))
        Cypress.log({
            name: `${severity[violation.impact]} A11Y`,
            consoleProps: () => violation,
            $el: nodes,
            message: `[${violation.help}](${violation.helpUrl})`
        })
        
        violation.nodes.forEach(({target}) => {
            Cypress.log({
                name: `TT`,
                consoleProps: () => violation,
                $el: Cypress.$(target.join(',')),
                message:target
            })
        })

    });


    name: '${sevirity}'

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
      ({ id, impact,help,  description, nodes, helpUrl }) => ({
        id,
        impact,
        help,
        description,
        nodes: nodes.length,
        helpUrl

      })
    )
   
    cy.task('table', violationData)
  }


Cypress.Commands.add("checkPageA11y", (path) => {
    cy.visit(path);
    cy.injectAxe();
    cy.checkA11y(null, null, terminalLog);
}

)