describe('Chart is saved to gallery', () => {
    it('passes', () => {
      cy.visit('/')
      cy.contains("Line").click()
      cy.enterData()
      cy.contains("Generate chart").click()
      cy.contains("Save chart").click()
      cy.contains("Gallery").click()
      cy.get('.chart-card').click()
      cy.checkInputBoxes()
      cy.get('#chart-img').should('be.visible')
    })
  })