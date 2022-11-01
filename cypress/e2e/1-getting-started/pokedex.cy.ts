/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('pokedex app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000')
  })

  it(`AC 1:can search a catalog of Pokemon characters (Pokedex) by their name or by some of the characters 
  in their name in order to return one or more Pokemon and their trading card attributes.`, () => {
    cy.get('input[name="pokemon-search"]').type('pik')
    cy.contains('pikachu').click()
    cy.contains('Base Stats', { timeout: 10000 }).click()
    cy.contains('Moves').click()
    cy.contains('Evolutions').click()
  })

  it(`AC 2: can display all pokemon types and species`, () => {
    cy.get('button').contains('100').click()
    cy.get('button').contains('type').click()
    cy.get('[alt="normal"]').should('be.visible')
    cy.get('[alt="fire"]').should('be.visible')
    cy.get('[alt="water"]').should('be.visible')
    cy.get('[alt="electric"]').should('be.visible')
    cy.get('[alt="grass"]').should('be.visible')
    cy.get('[alt="ice"]').should('be.visible')
    cy.get('[alt="fighting"]').should('be.visible')
    cy.get('[alt="poison"]').should('be.visible')
    cy.get('[alt="ground"]').should('be.visible')
    cy.get('[alt="flying"]').should('be.visible')
    cy.get('[alt="psychic"]').should('be.visible')
    cy.get('[alt="bug"]').should('be.visible')
    cy.get('[alt="rock"]').should('be.visible')
    cy.get('[alt="ghost"]').should('be.visible')
    cy.get('[alt="dragon"]').should('be.visible')
    cy.get('[alt="dark"]').should('be.visible')
    cy.get('[alt="steel"]').should('be.visible')
    cy.get('[alt="fairy"]').should('be.visible')
  })

  it(`AC 3: can display the amount of pokemon as well as pokemon types, allowing for filtering`, () => {
    cy.get('button').contains('2').click()
    cy.get('button').contains('3').click()
    cy.get('button').contains('4').click()
    cy.get('button').contains('5').click()
    cy.get('button').contains('6').click()
    cy.get('button').contains('7').click()
    cy.get('button').contains('100').click()
    cy.get('button').contains('type').click()

    cy.get('[alt="normal"]').click()
    cy.contains('pidgey').should('be.visible')

    cy.get('[alt="fire"]').click()
    cy.contains('charmander').should('be.visible')

    cy.get('[alt="water"]').click()
    cy.contains('squirtle').should('be.visible')

    cy.get('[alt="electric"]').click()
    cy.contains('pikachu').should('be.visible')

    cy.get('[alt="grass"]').click()
    cy.contains('bulbasaur').should('be.visible')

    cy.get('[alt="ice"]').click()
    cy.contains('dewgong').should('be.visible')

    cy.get('[alt="fighting"]').click()
    cy.contains('mankey').should('be.visible')

    cy.get('[alt="poison"]').click()
    cy.contains('bulbasaur').should('be.visible')

    cy.get('[alt="ground"]').click()
    cy.contains('sandshrew').should('be.visible')

    cy.get('[alt="flying"]').click()
    cy.contains('charizard').should('be.visible')

    cy.get('[alt="psychic"]').click()
    cy.contains('abra').should('be.visible')

    cy.get('[alt="bug"]').click()
    cy.contains('caterpie').should('be.visible')

    cy.get('[alt="rock"]').click()
    cy.contains('geodude').should('be.visible')

    cy.get('[alt="ghost"]').click()
    cy.contains('gastly').should('be.visible')

    cy.get('[alt="dragon"]').click()
    cy.contains('dragonite').should('be.visible')

    cy.get('[alt="dark"]').click()
    cy.contains('umbreon').should('be.visible')

    cy.get('[alt="steel"]').click()
    cy.contains('magnemite').should('be.visible')

    cy.get('[alt="fairy"]').click()
    cy.contains('clefairy').should('be.visible')
  })

  it(`AC 4: can display pictures and further identifying attributes for a selected pokemon`, () => {
    cy.get('[alt="venusaur"]').click()
    cy.contains('Base Stats').click()
    cy.contains('Moves').click()
    cy.contains('Evolutions').click()
  })

  it(`AC 5: can be sorted by color or type`, () => {
    cy.contains('type').click()
    cy.contains('color').click()
    cy.contains('reset').click()
  })
})
