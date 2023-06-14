describe('Chart data is maintained', () => {
    it('passes', () => {
      cy.visit('/')
      cy.contains("Line").click()
      cy.enterData()
      cy.contains("Scatter").click()
      cy.checkInputBoxes()
      cy.contains("Bar").click()
      cy.checkInputBoxes()
    })
  })