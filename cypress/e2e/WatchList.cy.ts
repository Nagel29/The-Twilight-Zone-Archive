describe("Watch List", () => {
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

    it('should display a title', () => {
        cy.get('.button-nav').eq(1).click()
        cy.get('.container-left').should('contain', 'My Watch List')
    })

    it('should contain episodes that have been added to the watch list', () => {
        cy.get('.row').eq(1).children().children('.checkbox').check()
        cy.get('.row').eq(2).children().children('.checkbox').check()
        cy.get('.button-nav').eq(1).click()
        cy.get('.container-card').eq(0).should('contain', 'One for the Angels')
        cy.get('.container-card').eq(1).should('contain', 'Mr. Denton on Doomsday')
    })

    it('should display the relevant data on the watch card', () => {
        cy.get('.row').eq(1).children().children('.checkbox').check()
        cy.get('.button-nav').eq(1).click()
        cy.get('.container-card').should('contain', 'One for the Angels')
            .and('contain', 'Season 3')
            .and('contain', 'Episode 2')
            .and('contain', 'On Watch List:')
        cy.get('.container-card').within(() => {
            cy.get('.checkbox').should('be.checked')
        })
        cy.get('.card-image').should('have.attr', 'src', 'https://i.postimg.cc/4NgQP6qx/one-for-the-angels.png')
    })

    it('should remove episode from watch list when unchecked within the watch list', () => {
        cy.get('.row').eq(1).children().children('.checkbox').check()
        cy.get('.button-nav').eq(1).click()
        cy.get('.container-card').within(() => {
            cy.get('.checkbox').uncheck()
        })
        cy.get('.container-card').should('not.exist')
    })

    it('while viewing the watch list, should add an episode to it if added from details', () => {
        cy.get('.row').eq(0).click()
        cy.get('.button-nav').eq(1).click()
        cy.get('#watchList').check()
        cy.get('.container-card').should('contain', 'Where Is Everybody')
    })

    it('should display a message when no episodes are in watch list', () => {
        cy.get('.button-nav').eq(1).click()
        cy.contains('Add episodes to your watch list to view them here!')
        cy.get('img').should('have.attr', 'src', '/static/media/no-episode.7eff8eb11b78732abc5b.gif')
    })


  
  })