import { defineConfig, devices } from '@playwright/test';

/**
 * 🎯 CONFIGURATION PLAYWRIGHT OPTIMISÉE POUR PORTFOLIO REACT
 * 
 * Configuration complète pour tests E2E robustes avec :
 * - Support multi-navigateurs (Chrome, Firefox, Safari)
 * - Tests responsive (mobile, tablet, desktop)
 * - Gestion automatique du serveur de développement
 * - Screenshots et traces pour debugging
 * - Timeouts adaptés pour applications React
 */
export default defineConfig({
  testDir: './tests/e2e',
  
  /* Configuration des tests */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Retry une fois en local aussi
  workers: process.env.CI ? 1 : 2, // Limiter les workers pour éviter la surcharge
  
  /* Timeouts adaptés pour React */
  timeout: 60000, // 60s par test
  expect: { timeout: 10000 }, // 10s pour les assertions
  
  /* Reporters pour debugging */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    ['list'] // Console output
  ],
  
  /* Configuration globale */
  use: {
    baseURL: 'http://localhost:5184',
    
    /* Screenshots et traces pour debugging */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
    /* Timeouts pour navigation */
    navigationTimeout: 15000,
    actionTimeout: 10000,
    
    /* Headers pour simuler un vrai navigateur */
    extraHTTPHeaders: {
      'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8'
    },
    
    /* Ignorer les erreurs HTTPS en développement */
    ignoreHTTPSErrors: true,
  },

  /* Projets de test par navigateur */
  projects: [
    {
      name: 'Desktop Chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    },

    {
      name: 'Desktop Firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 }
      },
    },

    {
      name: 'Desktop Safari',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 }
      },
    },

    /* Tests responsive mobile */
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        isMobile: true,
        hasTouch: true
      },
    },
    
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        isMobile: true,
        hasTouch: true
      },
    },

    /* Tests tablet */
    {
      name: 'Tablet',
      use: { 
        ...devices['iPad Pro'],
        isMobile: true,
        hasTouch: true
      },
    },
  ],

  /* Serveur de développement automatique */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5184',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes pour démarrer Vite
    stdout: 'pipe',
    stderr: 'pipe',
  },
  
  /* Dossiers de sortie */
  outputDir: 'test-results/',
  
  /* Configuration globale des tests */
  globalSetup: undefined, // Peut être ajouté pour setup DB
  globalTeardown: undefined, // Peut être ajouté pour cleanup
});
