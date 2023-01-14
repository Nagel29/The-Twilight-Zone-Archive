import { addSyntheticLeadingComment } from "typescript"

describe("Details", () => {
    beforeEach(() => {
      cy.intercept(
        'https://the-twilight-zone-api.vercel.app/episodes',
        {
          method: "GET",
          fixture: "../fixtures/AllEpisodes.json",
        }
      )
      cy.visit("http://localhost:3000/")
      cy.get(".row").eq(0).click()
    })

    it('should display the episode\'s relevant information', () => {
        cy.get('.title').should('contain', 'Where Is Everybody')
        cy.get('.image').should('have.attr', 'src', 'https://i.postimg.cc/DycfzqTJ/where-is-everybody.png')
        cy.get('.season-episode-date').should('contain', 'Season: 2')
            .and('contain', 'Episode: 1')
            .and('contain', 'Original Air Date: 10-02-1959')
        cy.get('.container-info').should('contain', 'Written By: Rod Serling')
            .and('contain', 'Cast: Earl Holliman, James Gregory, Garry Walberg')
            .and('contain', 'Storyline: Mike Ferris finds himself alone in the small Oakwood town and without recollection about his name, where he is or who he is. Mike wanders through the town trying to find a living soul. The tension increases and Mike has a breakdown.')
            .and('contain', 'Opening Narration: The place is here. The time is now, and the journey into the shadows that we are about to watch, could be our journey.')
            .and('contain', 'Closing Narration: The barrier of loneliness: The palpable, desperate need of the human animal to be with his fellow man. Up there, up there in the vastness of space, in the void that is sky, up there is an enemy known as isolation. It sits there in the stars waiting, waiting with the patience of eons, forever waiting... in The Twilight Zone.')
            .and('contain', 'Wikipedia Link: https://en.wikipedia.org/wiki/Where_Is_Everybody%3F')
    })

    it('should have be able to be added to or removed from the Watch List', () => {
        cy.get('.container-watch').children('.checkbox').check()
        cy.get('.container-watch').children('.checkbox').should('be.checked')
        cy.get('.row').eq(0).children().eq(4).children('.checkbox').should('be.checked')
        cy.get('.button-nav').eq(1).click()
        cy.get('.container-card').should('contain', 'Where Is Everybody?')
        cy.get('.container-watch').children('.checkbox').uncheck()
        cy.get('.container-card').should('not.exist')
        cy.get('.button-nav').eq(0).click()
        cy.get('.container-watch').children('.checkbox').should('not.be.checked')
        cy.get('.row').eq(0).children().eq(4).children('.checkbox').should('not.be.checked')
    })
  
    it('should allow the user to add or edit reflections on an episode', () => {
        cy.get('textarea').type('Wow great episode. ').should('have.value', 'Wow great episode. ')
        cy.get('.row').eq(1).click()
        cy.get('.row').eq(0).click()
        cy.get('textarea').should('have.value', 'Wow great episode. ')
        cy.get('textarea').type('Loved it.').should('have.value', 'Wow great episode. Loved it.')
    })
  })