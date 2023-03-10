describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'emi',
      username: 'emiuser',
      password: 'emipassword',
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3003')
  })

  it('front page can be opened', function () {
    cy.contains('log in').click()
    cy.contains('log in to application')
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('emiuser')
    cy.get('#password').type('emipassword')
    cy.get('#login-button').click()
  })

  // eslint-disable-next-line quotes
  it("user can't login with wrong credentials", function () {
    cy.contains('log in').click()
    cy.get('#username').type('emiusers')
    cy.get('#password').type('emipasswords')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
    cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click()
      cy.get('#username').type('emiuser')
      cy.get('#password').type('emipassword')
      cy.get('#login-button').click()
    })

    it('user can create blog', function () {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('First blog')
      cy.get('input[name="author"]').type('Emi')
      cy.get('input[name="url"]').type('emi.com')
      cy.get('#create-blog-button').click()
    })

    describe('when a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('input[name="title"]').type('First blog')
        cy.get('input[name="author"]').type('Emi')
        cy.get('input[name="url"]').type('emi.com')
        cy.get('#create-blog-button').click()
      })

      it('gets success notification', function () {
        cy.contains('added')
      })

      it('can toggle visibility of the blog', function () {
        cy.contains('view').click()
      })

      it('can like the blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('can remove a blog', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('removed succesfully')
      })

      // eslint-disable-next-line quotes
      it("can't remove a blog from another user", function () {
        cy.contains('logout').click()
        cy.contains('log in').click()

        const newUser = {
          name: 'charlie',
          username: 'charlie95',
          password: 'charliepassword',
        }

        cy.request('POST', 'http://localhost:3003/api/users/', newUser)
        cy.get('#username').type('charlie95')
        cy.get('#password').type('charliepassword')
        cy.get('#login-button').click()
        cy.contains('view').click()
        cy.contains('remove').click()
      })

      it('blogs are orderer by most likes', function () {
        cy.contains('new blog').click()
        cy.get('input[name="title"]').type('Second blog')
        cy.get('input[name="author"]').type('Emi')
        cy.get('input[name="url"]').type('emi.com')
        cy.get('#create-blog-button').click()

        cy.get('.blog').eq(1).find('#view-button').click()
        cy.get('#like-button').click().wait(1000).click()
        cy.get('.blog').eq(0).should('contain', 'Second blog')
      })
    })
  })
})
