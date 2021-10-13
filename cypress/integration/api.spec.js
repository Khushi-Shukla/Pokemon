/// <reference types="cypress"/>
// testing the data fetching from the api
describe('Pokemon API', () => {
  it('verify request returns JSON', () => {
    cy.request('https://pokeapi.co/api/v2/pokemon').its('headers').its('content-type').should('include', 'application/json')
  })
})