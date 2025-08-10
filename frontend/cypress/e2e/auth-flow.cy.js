describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should redirect to intro page and require CGU acceptance', () => {
    cy.url().should('include', '/intro')
    cy.contains('Avant d\'entrer, merci d\'accepter nos conditions')
    
    // Should not be able to access protected routes without CGU
    cy.visit('/home')
    cy.url().should('include', '/intro')
  })

  it('should allow CGU acceptance and redirect to auth', () => {
    cy.visit('/intro')
    cy.get('[data-cy=accept-cgu]').click()
    cy.url().should('include', '/auth')
    cy.contains('Connectez-vous pour découvrir un univers design')
  })

  it('should handle login flow correctly', () => {
    // Accept CGU first
    cy.visit('/intro')
    cy.get('[data-cy=accept-cgu]').click()
    
    // Login
    cy.get('[data-cy=email-input]').type('admin@test.com')
    cy.get('[data-cy=password-input]').type('password123')
    cy.get('[data-cy=login-button]').click()
    
    // Should redirect to home after successful login
    cy.url().should('include', '/home')
    cy.contains('Créativité précise. Exécution rapide. Résultats mesurables.')
  })

  it('should handle registration flow correctly', () => {
    cy.visit('/intro')
    cy.get('[data-cy=accept-cgu]').click()
    
    // Switch to register
    cy.get('[data-cy=switch-to-register]').click()
    
    // Fill registration form
    cy.get('[data-cy=name-input]').type('Test User')
    cy.get('[data-cy=email-input]').type('test@example.com')
    cy.get('[data-cy=password-input]').type('password123')
    cy.get('[data-cy=register-button]').click()
    
    // Should redirect to home after successful registration
    cy.url().should('include', '/home')
  })

  it('should protect all internal routes without authentication', () => {
    const protectedRoutes = ['/home', '/projects', '/skills', '/blog', '/contact', '/about', '/dashboard', '/profile']
    
    protectedRoutes.forEach(route => {
      cy.visit(route)
      cy.url().should('include', '/intro')
    })
  })
})

describe('RBAC Admin Protection', () => {
  beforeEach(() => {
    // Login as admin user
    cy.visit('/intro')
    cy.get('[data-cy=accept-cgu]').click()
    cy.get('[data-cy=email-input]').type('admin@test.com')
    cy.get('[data-cy=password-input]').type('password123')
    cy.get('[data-cy=login-button]').click()
    cy.url().should('include', '/home')
  })

  it('should show admin badge in navbar for admin users', () => {
    cy.get('[data-cy=admin-badge]').should('be.visible')
    cy.get('[data-cy=admin-badge]').should('contain', 'Admin')
  })

  it('should allow admin to access CRUD operations', () => {
    cy.visit('/projects')
    
    // Admin should see create/edit/delete buttons
    cy.get('[data-cy=create-project-btn]').should('be.visible')
    cy.get('[data-cy=edit-project-btn]').first().should('be.visible')
    cy.get('[data-cy=delete-project-btn]').first().should('be.visible')
  })

  it('should protect admin routes from regular users', () => {
    // Logout and login as regular user
    cy.get('[data-cy=logout-btn]').click()
    cy.url().should('include', '/auth')
    
    cy.get('[data-cy=email-input]').type('user@test.com')
    cy.get('[data-cy=password-input]').type('password123')
    cy.get('[data-cy=login-button]').click()
    
    // Regular user should not see admin elements
    cy.visit('/projects')
    cy.get('[data-cy=admin-badge]').should('not.exist')
    cy.get('[data-cy=create-project-btn]').should('not.exist')
  })
})
