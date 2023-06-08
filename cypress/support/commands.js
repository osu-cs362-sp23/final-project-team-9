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
require("@testing-library/cypress/add-commands")

Cypress.Commands.add("enterData", function () {
    cy.contains("Chart title").type("Test Chart")
    cy.contains("X label").type("Cats")
    cy.contains("Y label").type("Dogs")
    cy.contains("+").click()
    cy.contains("+").click()
    cy.contains("+").click()
    cy.contains("+").click()
    cy.get('.y-value').eq(0).type("3")
    cy.get('.x-value').eq(0).type("1")
    cy.get('.x-value').eq(1).type("2")
    cy.get('.y-value').eq(1).type("7")
    cy.get('.x-value').eq(2).type("3")
    cy.get('.y-value').eq(2).type("15")
    cy.get('.x-value').eq(3).type("4")
    cy.get('.y-value').eq(3).type("25")
    cy.get('.x-value').eq(4).type("5")
    cy.get('.y-value').eq(4).type("40")
})

Cypress.Commands.add("checkInputBoxes", function () {
    cy.get('.x-value-input').eq(0).should("have.value", "1")
    cy.get('.y-value-input').eq(0).should("have.value", "3")
    cy.get('.x-value-input').eq(1).should("have.value", "2")
    cy.get('.y-value-input').eq(1).should("have.value", "7")
    cy.get('.x-value-input').eq(2).should("have.value", "3")
    cy.get('.y-value-input').eq(2).should("have.value", "15")
    cy.get('.x-value-input').eq(3).should("have.value", "4")
    cy.get('.y-value-input').eq(3).should("have.value", "25")
    cy.get('.x-value-input').eq(4).should("have.value", "5")
    cy.get('.y-value-input').eq(4).should("have.value", "40")
})