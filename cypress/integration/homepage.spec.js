/// <reference types= "cypress"/>

context("Home Page", () => {
    beforeEach(() =>{
        cy.visit("http://localhost:3000");
    });

    it("should display a list of pokemons with their name and image", 
    () => {
        cy.get("div")
    });
});