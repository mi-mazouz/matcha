/// <reference types="Cypress" />

const config = require('../../../../../../config.' + Cypress.env('NODE_ENV')).default

context('Sign-in', () => {
  before(() => {
    cy.visit(`${config.HTTP_APP_BASE_URL}/sign-in`)
  })

  it('Should find an email input and password and a submit button', () => {
    cy.get('form')
    .within(() => {
      cy.get('input')
      .should('to.have.length', 2)
      cy.get('input')
      .eq(0)
      .invoke('attr', 'type')
      .should('contain', 'email')
      cy.get('input')
      .eq(1)
      .invoke('attr', 'type')
      .should('contain', 'password')
      cy.get('button')
      .eq(0)
      .invoke('attr', 'type')
      .should('contain', 'submit')
    })
  })
})
