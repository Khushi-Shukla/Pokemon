/// <reference types= "cypress"/>

context("Home Page", () => {
    beforeEach(() =>{
        cy.visit("http://localhost:3000");
    });

    it("should display an input field with placeholder- Search Pokemon", 
    () => {
        cy.get("input").invoke('attr', 'placeholder').should('contain', 'Search Pokemon')
    });
});