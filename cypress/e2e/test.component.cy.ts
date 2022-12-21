describe('test', () =>{
  it('should visit google.com', function () {
    cy.visit("/")
    cy.url().should("include", "")

  });
})
