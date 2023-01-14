describe("Network Down", () => {
    beforeEach(() => {
      cy.intercept(
        'https://the-twilight-zone-api.vercel.app/episodes',
        {
          method: "GET",
        },
        {
            response: 500,
        }
      )
      cy.visit("http://localhost:3000/")
    })

    it('should display an error when the network is down', () => {
        cy.get('.error-modal').should('exist')
    })

    it('should clear the error when the dismiss button is clicked', () => {
        cy.get('.dismiss-button').eq(0).click()
        cy.get('.error-modal').should('not.exist')
    })
})  

describe("Wrong Path", () => {
    beforeEach(() => {
        cy.intercept(
          'https://the-twilight-zone-api.vercel.app/episodes',
          {
            method: "GET",
            fixture: "../fixtures/AllEpisodes.json",
          }
        )
        cy.visit("http://localhost:3000/blah")
      })

    it('should display a page not found when the user navigates to an invalid path', () => {
        cy.get('.page404').should('contain', '404 Page Not Found')
    })

    it('should take the user to the home page after the Go Back button is clicked', () => {
        cy.get('.button-back').click()
        cy.get('.container-all-episodes').should('exist')
        cy.get('.404page').should('not.exist')
    })

})