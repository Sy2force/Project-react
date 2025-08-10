// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for login
Cypress.Commands.add('login', (email = 'admin@test.com', password = 'password123') => {
  cy.visit('/intro')
  cy.get('[data-cy=accept-cgu]').click()
  cy.get('[data-cy=email-input]').type(email)
  cy.get('[data-cy=password-input]').type(password)
  cy.get('[data-cy=login-button]').click()
  cy.url().should('include', '/home')
})

// Custom command for accepting CGU
Cypress.Commands.add('acceptCGU', () => {
  cy.visit('/intro')
  cy.get('[data-cy=accept-cgu]').click()
  cy.url().should('include', '/auth')
})

// Custom command for waiting for charts to load
Cypress.Commands.add('waitForCharts', () => {
  cy.get('[data-cy=radar-chart] svg', { timeout: 15000 }).should('be.visible')
  cy.get('[data-cy=bar-chart] svg', { timeout: 15000 }).should('be.visible')
})

// Custom command for checking accessibility
Cypress.Commands.add('checkA11y', (context = null, options = null) => {
  cy.injectAxe()
  cy.checkA11y(context, options)
})

// Custom command for testing responsive design
Cypress.Commands.add('testResponsive', (sizes = ['iphone-6', 'ipad-2', [1280, 720]]) => {
  sizes.forEach(size => {
    if (Array.isArray(size)) {
      cy.viewport(size[0], size[1])
    } else {
      cy.viewport(size)
    }
    cy.wait(500) // Allow time for responsive changes
  })
})

// Custom command for API requests
Cypress.Commands.add('apiRequest', (method, url, body = null) => {
  return cy.request({
    method,
    url: `${Cypress.env('apiUrl')}${url}`,
    body,
    failOnStatusCode: false
  })
})
