describe('Simulator and PDF Generation', () => {
  beforeEach(() => {
    // Login first
    cy.visit('/intro')
    cy.get('[data-cy=accept-cgu]').click()
    cy.get('[data-cy=email-input]').type('admin@test.com')
    cy.get('[data-cy=password-input]').type('password123')
    cy.get('[data-cy=login-button]').click()
    cy.url().should('include', '/home')
  })

  it('should complete simulator flow and generate PDF', () => {
    cy.visit('/simulator')
    cy.contains('Répondez à quelques questions et obtenez une proposition claire')
    
    // Answer first question (sector)
    cy.get('[data-cy=option-E-commerce]').click()
    cy.get('[data-cy=next-button]').click()
    
    // Answer second question (budget)
    cy.get('[data-cy=option-15k€ - 30k€]').click()
    cy.get('[data-cy=next-button]').click()
    
    // Answer third question (timeline)
    cy.get('[data-cy=option-3-6 mois]').click()
    cy.get('[data-cy=next-button]').click()
    
    // Answer fourth question (type) - multiple choice
    cy.get('[data-cy=option-E-commerce]').click()
    cy.get('[data-cy=option-Application web]').click()
    cy.get('[data-cy=next-button]').click()
    
    // Continue answering remaining questions
    for (let i = 4; i < 10; i++) {
      cy.get('[data-cy^=option-]').first().click()
      cy.get('[data-cy=next-button]').click()
    }
    
    // Should show recommendations
    cy.contains('Vos Recommandations')
    cy.contains('Score de compatibilité')
    cy.get('[data-cy=score]').should('be.visible')
    
    // Generate PDF
    cy.get('[data-cy=generate-pdf-btn]').click()
    cy.contains('Génération...').should('be.visible')
    
    // PDF should be generated (we can't test actual download in Cypress easily)
    cy.wait(3000)
    cy.get('[data-cy=generate-pdf-btn]').should('not.contain', 'Génération...')
  })

  it('should validate all simulator questions are required', () => {
    cy.visit('/simulator')
    
    // Try to proceed without answering
    cy.get('[data-cy=next-button]').should('be.disabled')
    
    // Answer and button should be enabled
    cy.get('[data-cy^=option-]').first().click()
    cy.get('[data-cy=next-button]').should('not.be.disabled')
  })
})

describe('Charts Rendering', () => {
  beforeEach(() => {
    cy.visit('/intro')
    cy.get('[data-cy=accept-cgu]').click()
    cy.get('[data-cy=email-input]').type('admin@test.com')
    cy.get('[data-cy=password-input]').type('password123')
    cy.get('[data-cy=login-button]').click()
  })

  it('should render skills charts correctly', () => {
    cy.visit('/skills')
    cy.contains('Même identité visuelle, plus de lisibilité')
    
    // Wait for charts to load
    cy.get('[data-cy=radar-chart]', { timeout: 10000 }).should('be.visible')
    cy.get('[data-cy=bar-chart]', { timeout: 10000 }).should('be.visible')
    cy.get('[data-cy=heatmap-chart]', { timeout: 10000 }).should('be.visible')
    
    // Check that charts contain SVG elements (Recharts renders SVG)
    cy.get('[data-cy=radar-chart] svg').should('exist')
    cy.get('[data-cy=bar-chart] svg').should('exist')
  })

  it('should handle heatmap interactions', () => {
    cy.visit('/skills')
    
    // Click on a project in heatmap
    cy.get('[data-cy=heatmap-project]').first().click()
    
    // Should open project modal
    cy.get('[data-cy=project-modal]').should('be.visible')
    cy.contains('E-commerce React').should('be.visible')
    
    // Close modal
    cy.get('[data-cy=close-modal]').click()
    cy.get('[data-cy=project-modal]').should('not.exist')
  })
})

describe('React Projects Page', () => {
  beforeEach(() => {
    cy.visit('/intro')
    cy.get('[data-cy=accept-cgu]').click()
    cy.get('[data-cy=email-input]').type('admin@test.com')
    cy.get('[data-cy=password-input]').type('password123')
    cy.get('[data-cy=login-button]').click()
  })

  it('should display React projects on /react route', () => {
    cy.visit('/react')
    cy.contains('Mes projets React les plus significatifs')
    
    // Should show React-specific content
    cy.contains('Projets React')
    cy.contains('Stack Technique React')
    
    // Should display React projects (at least the 3 seeds)
    cy.get('[data-cy=project-card]').should('have.length.at.least', 3)
    
    // Each project should have React in tech stack
    cy.get('[data-cy=project-card]').each($card => {
      cy.wrap($card).should('contain', 'React')
    })
  })

  it('should show React stack technologies', () => {
    cy.visit('/react')
    
    // Check for React ecosystem technologies
    cy.contains('React 18')
    cy.contains('TypeScript')
    cy.contains('Tailwind')
    cy.contains('Vite')
  })
})
