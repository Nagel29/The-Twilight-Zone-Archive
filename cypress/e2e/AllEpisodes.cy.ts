describe("Top 100", () => {
  beforeEach(() => {
    cy.intercept(
      'https://the-twilight-zone-api.vercel.app/episodes',
      {
        method: "GET",
        fixture: "../fixtures/AllEpisodes.json",
      }
    )
    cy.visit("http://localhost:3000/")
  })

  it("displays a title", () => {
    cy.get(".header-all-episodes").contains('All Episodes')
  })

})

describe("Form and Episode List", () => {
  beforeEach(() => {
    cy.intercept(
      'https://the-twilight-zone-api.vercel.app/episodes',
      {
        method: "GET",
        fixture: "../fixtures/AllEpisodes.json",
      }
    )
    cy.visit("http://localhost:3000/")
  })

  it("search displays user's input", () => {
    cy.get(".search").type("where").should("have.value", "where")
  })

  it("displays only valid episodes when search has value", () => {
    cy.get(".search").type("where").should("have.value", "where")
    cy.get(".row").eq(0).should('exist')
    cy.get(".row").eq(1).should('not.exist')
  })

  it("displays a message when no episodes are found from search", () => {
    cy.get(".search").type("xyz").should("have.value", "xyz")
    cy.get('.message-sad-search').should('contain', 'No episodes were found. Please try revising your search.')
  })

  it("sort displays user's selection", () => {
    cy.get(".dropdown").select("title").should("have.value", "title")
  })

  it("displays episodes in correct order when sorted by title", () => {
    cy.get(".dropdown").select("title").should("have.value", "title")
    cy.get(".row").eq(0).should('contain', "Mr. Denton on Doomsday")
    cy.get(".row").eq(1).should('contain', "One for the Angels")
    cy.get(".row").eq(2).should('contain', "Where Is Everybody")
  })  

  it("displays episodes in correct order when sorted by season", () => {
    cy.get(".dropdown").select("season").should("have.value", "season")
    cy.get(".row").eq(0).should('contain', "Mr. Denton on Doomsday")
    cy.get(".row").eq(1).should('contain', "Where Is Everybody")
    cy.get(".row").eq(2).should('contain', "One for the Angels")
  })  
  
  it("displays episodes in correct order when sorted by episode", () => {
    cy.get(".dropdown").select("episode").should("have.value", "episode")
    cy.get(".row").eq(0).should('contain', "Where Is Everybody")
    cy.get(".row").eq(1).should('contain', "One for the Angels")
    cy.get(".row").eq(2).should('contain', "Mr. Denton on Doomsday")
  })  

  it("displays episodes in correct order when sorted by air date", () => {
    cy.get(".dropdown").select("original air date").should("have.value", "airDate")
    cy.get(".row").eq(0).should('contain', "Where Is Everybody")
    cy.get(".row").eq(1).should('contain', "One for the Angels")
    cy.get(".row").eq(2).should('contain', "Mr. Denton on Doomsday")
  })  

  it("adds or removes episode to watch list when checked", () => {
    cy.get(".checkbox").eq(0).check().should('be.checked')
    cy.get(".button-nav").eq(1).click()
    cy.get(".container-card").should('contain', 'Where Is Everybody')
    cy.get(".button-nav").eq(0).click()
    cy.get(".checkbox").eq(0).uncheck().should('not.be.checked')
    cy.get(".button-nav").eq(1).click()
    cy.get(".container-card").should('not.exist')
  })

  it("displays episodes in correct order when sorted by watch list", () => {
    cy.get(".checkbox").eq(0).check().should('be.checked')
    cy.get(".checkbox").eq(2).check().should('be.checked')
    cy.get(".dropdown").select("on watch list").should("have.value", "watchList")
    cy.get(".row").eq(0).should('contain', 'Where Is Everybody')
    cy.get(".row").eq(1).should('contain', 'Mr. Denton on Doomsday')
    cy.get(".row").eq(2).should('contain', 'One for the Angels')
  })

  it("displays episodes in correct order when ascending/descending button is checked", () => {
    cy.get(".dropdown").select("title").should("have.value", "title")
    cy.get(".button").click()
    cy.get(".arrow").should('have.attr', 'data-order', 'descending')
    cy.get(".row").eq(0).should('contain', "Where Is Everybody")
    cy.get(".row").eq(1).should('contain', "One for the Angels")
    cy.get(".row").eq(2).should('contain', "Mr. Denton on Doomsday")
    cy.get(".button").click()
    cy.get(".arrow").should('have.attr', 'data-order', 'ascending')
    cy.get(".row").eq(0).should('contain', "Mr. Denton on Doomsday")
    cy.get(".row").eq(1).should('contain', "One for the Angels")
    cy.get(".row").eq(2).should('contain', "Where Is Everybody")
  })

})
