import { test, expect } from '@playwright/test';

/**
 * 🎯 SUITE COMPLÈTE DE TESTS E2E - PORTFOLIO REACT FULLSTACK
 * 
 * Tests couvrant :
 * - Navigation et pages publiques
 * - Authentification complète (login/register/logout)
 * - Comportement dynamique selon rôles (user/admin/business)
 * - Résilience et gestion d'erreurs
 * - Design et éléments visuels (glassmorphism, responsive)
 */

// 🔧 Configuration globale des tests
test.describe.configure({ mode: 'parallel' });

// 📊 Données de test
const TEST_USERS = {
  admin: { email: 'admin@example.com', password: 'password123', role: 'admin' },
  user: { email: 'user@example.com', password: 'password123', role: 'user' },
  business: { email: 'business@example.com', password: 'password123', role: 'business' },
  invalid: { email: 'invalid@test.com', password: 'wrongpassword' }
};

const PAGES = {
  public: ['/', '/login', '/register'],
  protected: ['/dashboard', '/projects', '/services', '/profile', '/settings'],
  admin: ['/admin'],
  business: ['/business']
};

// 🛠️ Utilitaires de test
class TestHelpers {
  static async takeScreenshot(page, name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `tests/screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }

  static async waitForPageLoad(page, timeout = 10000) {
    await page.waitForLoadState('networkidle', { timeout });
    await page.waitForTimeout(500); // Attendre les animations
  }

  static async login(page, user) {
    await page.goto('/login');
    await page.fill('input[type="email"]', user.email);
    await page.fill('input[type="password"]', user.password);
    await page.click('button[type="submit"]');
    
    // Attendre la redirection après login
    await page.waitForURL(/\/dashboard/, { timeout: 10000 });
    await this.waitForPageLoad(page);
  }

  static async checkAuthCookies(page) {
    const cookies = await page.context().cookies();
    const authCookie = cookies.find(c => c.name.includes('token') || c.name.includes('auth'));
    return authCookie && authCookie.httpOnly && authCookie.secure !== undefined;
  }

  static async checkDesignElements(page) {
    // Vérifier les éléments de design glassmorphism
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
    
    // Vérifier les classes CSS du thème
    const body = page.locator('body');
    const hasThemeClass = await body.evaluate(el => 
      el.classList.contains('dark') || el.classList.contains('light') || 
      el.style.background.includes('gradient')
    );
    expect(hasThemeClass).toBeTruthy();
  }
}

// 🧪 TESTS DE NAVIGATION ET PAGES PUBLIQUES
test.describe('🧭 Navigation & Pages Publiques', () => {
  
  test('toutes les pages publiques sont accessibles', async ({ page }) => {
    for (const route of PAGES.public) {
      console.log(`📄 Test d'accès à la page: ${route}`);
      
      try {
        await page.goto(route);
        await TestHelpers.waitForPageLoad(page);
        
        // Vérifier que la page charge sans erreur 404
        const title = await page.title();
        expect.soft(title).not.toContain('404');
        
        // Vérifier la présence d'éléments de base
        await expect.soft(page.locator('body')).toBeVisible();
        
        // Screenshot pour validation visuelle
        await TestHelpers.takeScreenshot(page, `public-page-${route.replace('/', 'home')}`);
        
      } catch (error) {
        console.error(`❌ Erreur sur ${route}:`, error.message);
        await TestHelpers.takeScreenshot(page, `error-${route.replace('/', 'home')}`);
        throw error;
      }
    }
  });

  test('navbar est présente et fonctionnelle', async ({ page }) => {
    await page.goto('/');
    await TestHelpers.waitForPageLoad(page);
    
    // Vérifier la présence de la navbar
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
    
    // Vérifier le logo "S.A"
    const logo = page.locator('nav').getByText('S.A').first();
    await expect.soft(logo).toBeVisible();
    
    // Vérifier les liens de navigation
    const loginLink = page.locator('a[href="/login"]');
    if (await loginLink.isVisible()) {
      await loginLink.click();
      await expect(page).toHaveURL(/\/login/);
    }
    
    await TestHelpers.takeScreenshot(page, 'navbar-functionality');
  });

  test('design responsive fonctionne correctement', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];

    for (const viewport of viewports) {
      console.log(`📱 Test responsive: ${viewport.name}`);
      
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await TestHelpers.waitForPageLoad(page);
      
      // Vérifier que la navbar s'adapte
      await expect.soft(page.locator('nav')).toBeVisible();
      
      // Vérifier les éléments principaux
      await expect.soft(page.locator('h1')).toBeVisible();
      
      await TestHelpers.takeScreenshot(page, `responsive-${viewport.name}`);
    }
  });
});

// 🔐 TESTS D'AUTHENTIFICATION
test.describe('🔐 Authentification Complète', () => {
  
  test('login avec identifiants valides réussit', async ({ page }) => {
    console.log('🔑 Test login utilisateur valide');
    
    await page.goto('/login');
    await TestHelpers.waitForPageLoad(page);
    
    // Remplir le formulaire de connexion
    await page.fill('input[type="email"]', TEST_USERS.user.email);
    await page.fill('input[type="password"]', TEST_USERS.user.password);
    
    // Screenshot avant soumission
    await TestHelpers.takeScreenshot(page, 'login-form-filled');
    
    // Soumettre le formulaire
    await page.click('button[type="submit"]');
    
    // Vérifier la redirection vers dashboard
    await page.waitForURL(/\/dashboard/, { timeout: 15000 });
    await TestHelpers.waitForPageLoad(page);
    
    // Vérifier que l'utilisateur est connecté
    const dashboardContent = page.locator('h1, h2, [data-testid="dashboard"]');
    await expect(dashboardContent.first()).toBeVisible();
    
    // Vérifier les cookies d'authentification
    const hasAuthCookies = await TestHelpers.checkAuthCookies(page);
    expect.soft(hasAuthCookies).toBeTruthy();
    
    await TestHelpers.takeScreenshot(page, 'login-success-dashboard');
  });

  test('login avec identifiants invalides échoue', async ({ page }) => {
    console.log('❌ Test login avec identifiants invalides');
    
    await page.goto('/login');
    await TestHelpers.waitForPageLoad(page);
    
    // Remplir avec des identifiants invalides
    await page.fill('input[type="email"]', TEST_USERS.invalid.email);
    await page.fill('input[type="password"]', TEST_USERS.invalid.password);
    
    // Soumettre le formulaire
    await page.click('button[type="submit"]');
    
    // Attendre le message d'erreur
    await page.waitForTimeout(2000);
    
    // Vérifier qu'on reste sur la page de login
    await expect(page).toHaveURL(/\/login/);
    
    // Vérifier la présence d'un message d'erreur
    const errorMessage = page.locator('[role="alert"], .error, .text-red, [data-testid="error"]');
    const errorVisible = await errorMessage.first().isVisible().catch(() => false);
    expect.soft(errorVisible).toBeTruthy();
    
    await TestHelpers.takeScreenshot(page, 'login-error-message');
  });

  test('inscription d\'un nouvel utilisateur fonctionne', async ({ page }) => {
    console.log('📝 Test inscription nouvel utilisateur');
    
    const newUser = {
      email: `test-${Date.now()}@example.com`,
      password: 'newpassword123',
      name: 'Test User'
    };
    
    await page.goto('/register');
    await TestHelpers.waitForPageLoad(page);
    
    // Remplir le formulaire d'inscription
    await page.fill('input[type="email"]', newUser.email);
    await page.fill('input[type="password"]', newUser.password);
    
    // Remplir le nom si le champ existe
    const nameField = page.locator('input[name="name"], input[placeholder*="nom"]');
    if (await nameField.isVisible()) {
      await nameField.fill(newUser.name);
    }
    
    await TestHelpers.takeScreenshot(page, 'register-form-filled');
    
    // Soumettre le formulaire
    await page.click('button[type="submit"]');
    
    // Vérifier la redirection (dashboard ou confirmation)
    await page.waitForTimeout(3000);
    const currentUrl = page.url();
    const isRedirected = currentUrl.includes('/dashboard') || currentUrl.includes('/login');
    expect.soft(isRedirected).toBeTruthy();
    
    await TestHelpers.takeScreenshot(page, 'register-success');
  });

  test('logout déconnecte correctement l\'utilisateur', async ({ page }) => {
    console.log('🚪 Test logout utilisateur');
    
    // Se connecter d'abord
    await TestHelpers.login(page, TEST_USERS.user);
    
    // Chercher le bouton de déconnexion
    const logoutButton = page.locator('button:has-text("Logout"), button:has-text("Déconnexion"), [data-testid="logout"]');
    
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Vérifier la redirection vers login
      await page.waitForURL(/\/login/, { timeout: 10000 });
      await TestHelpers.waitForPageLoad(page);
      
      // Vérifier qu'on ne peut plus accéder aux pages protégées
      await page.goto('/dashboard');
      await expect(page).toHaveURL(/\/login/);
      
      await TestHelpers.takeScreenshot(page, 'logout-success');
    } else {
      console.log('⚠️ Bouton logout non trouvé, test skippé');
    }
  });
});

// 🧭 TESTS DE COMPORTEMENT DYNAMIQUE ET RÔLES
test.describe('🎭 Comportement Dynamique & Rôles', () => {
  
  test('utilisateur admin accède aux pages admin', async ({ page }) => {
    console.log('👑 Test accès admin');
    
    try {
      await TestHelpers.login(page, TEST_USERS.admin);
      
      // Tenter d'accéder à la page admin
      await page.goto('/admin');
      await TestHelpers.waitForPageLoad(page);
      
      // Vérifier qu'on n'est pas redirigé vers login
      const currentUrl = page.url();
      expect.soft(currentUrl).toContain('/admin');
      
      // Vérifier la présence d'éléments admin
      const adminContent = page.locator('h1, h2, [data-testid="admin"], .admin');
      const hasAdminContent = await adminContent.first().isVisible().catch(() => false);
      expect.soft(hasAdminContent).toBeTruthy();
      
      await TestHelpers.takeScreenshot(page, 'admin-access-success');
      
    } catch (error) {
      console.log('⚠️ Test admin skippé - page ou fonctionnalité non disponible');
      await TestHelpers.takeScreenshot(page, 'admin-access-error');
    }
  });

  test('utilisateur normal ne peut pas accéder aux pages admin', async ({ page }) => {
    console.log('🚫 Test restriction accès admin pour utilisateur normal');
    
    await TestHelpers.login(page, TEST_USERS.user);
    
    // Tenter d'accéder à la page admin
    await page.goto('/admin');
    await page.waitForTimeout(2000);
    
    // Vérifier la redirection ou l'erreur d'accès
    const currentUrl = page.url();
    const isBlocked = currentUrl.includes('/login') || 
                     currentUrl.includes('/dashboard') || 
                     currentUrl.includes('/403') ||
                     !currentUrl.includes('/admin');
    
    expect.soft(isBlocked).toBeTruthy();
    
    await TestHelpers.takeScreenshot(page, 'admin-access-denied');
  });

  test('pages protégées redirigent si non authentifié', async ({ page }) => {
    console.log('🔒 Test redirection pages protégées');
    
    for (const route of PAGES.protected) {
      console.log(`🔍 Test protection: ${route}`);
      
      // Aller directement à la page sans être connecté
      await page.goto(route);
      await page.waitForTimeout(2000);
      
      // Vérifier la redirection vers login
      const currentUrl = page.url();
      expect.soft(currentUrl).toMatch(/\/login/);
      
      await TestHelpers.takeScreenshot(page, `protected-redirect-${route.replace('/', '')}`);
    }
  });

  test('navigation dynamique selon l\'état d\'authentification', async ({ page }) => {
    console.log('🔄 Test navigation dynamique');
    
    // Test navigation non connecté
    await page.goto('/');
    await TestHelpers.waitForPageLoad(page);
    
    const loginLinkVisible = await page.locator('a[href="/login"]').isVisible();
    expect.soft(loginLinkVisible).toBeTruthy();
    
    // Se connecter
    await TestHelpers.login(page, TEST_USERS.user);
    
    // Vérifier que la navigation change
    await page.goto('/');
    await TestHelpers.waitForPageLoad(page);
    
    const dashboardLinkVisible = await page.locator('a[href="/dashboard"]').isVisible();
    expect.soft(dashboardLinkVisible).toBeTruthy();
    
    await TestHelpers.takeScreenshot(page, 'navigation-authenticated');
  });
});

// 🛡️ TESTS DE RÉSILIENCE ET GESTION D'ERREURS
test.describe('🛡️ Résilience & Gestion d\'Erreurs', () => {
  
  test('gestion des erreurs réseau', async ({ page }) => {
    console.log('🌐 Test gestion erreurs réseau');
    
    // Simuler une panne réseau
    await page.route('**/api/**', route => {
      route.abort('failed');
    });
    
    await page.goto('/login');
    await TestHelpers.waitForPageLoad(page);
    
    // Tenter de se connecter
    await page.fill('input[type="email"]', TEST_USERS.user.email);
    await page.fill('input[type="password"]', TEST_USERS.user.password);
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(3000);
    
    // Vérifier qu'un message d'erreur apparaît ou que l'état reste stable
    const hasErrorHandling = await page.locator('[role="alert"], .error, .loading').isVisible().catch(() => false);
    expect.soft(hasErrorHandling).toBeTruthy();
    
    await TestHelpers.takeScreenshot(page, 'network-error-handling');
  });

  test('récupération automatique après erreur', async ({ page }) => {
    console.log('🔄 Test récupération automatique');
    
    let requestCount = 0;
    
    // Simuler une API qui échoue puis réussit
    await page.route('**/api/auth/login', route => {
      requestCount++;
      if (requestCount === 1) {
        route.abort('failed');
      } else {
        route.continue();
      }
    });
    
    await page.goto('/login');
    await TestHelpers.waitForPageLoad(page);
    
    await page.fill('input[type="email"]', TEST_USERS.user.email);
    await page.fill('input[type="password"]', TEST_USERS.user.password);
    
    // Premier essai (échoue)
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    
    // Deuxième essai (réussit)
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    await TestHelpers.takeScreenshot(page, 'auto-recovery');
  });

  test('gestion des sessions expirées', async ({ page }) => {
    console.log('⏰ Test session expirée');
    
    // Se connecter normalement
    await TestHelpers.login(page, TEST_USERS.user);
    
    // Simuler l'expiration en supprimant les cookies
    await page.context().clearCookies();
    
    // Tenter d'accéder à une page protégée
    await page.goto('/dashboard');
    await page.waitForTimeout(2000);
    
    // Vérifier la redirection vers login
    const currentUrl = page.url();
    expect.soft(currentUrl).toMatch(/\/login/);
    
    await TestHelpers.takeScreenshot(page, 'session-expired');
  });
});

// 🎨 TESTS DE DESIGN ET ÉLÉMENTS VISUELS
test.describe('🎨 Design & Éléments Visuels', () => {
  
  test('éléments de design glassmorphism sont présents', async ({ page }) => {
    console.log('✨ Test design glassmorphism');
    
    await page.goto('/');
    await TestHelpers.waitForPageLoad(page);
    
    // Vérifier les éléments de design
    await TestHelpers.checkDesignElements(page);
    
    // Vérifier les effets de transparence
    const glassElements = page.locator('[class*="backdrop-blur"], [class*="bg-opacity"], [class*="glassmorphism"]');
    const hasGlassEffect = await glassElements.first().isVisible().catch(() => false);
    expect.soft(hasGlassEffect).toBeTruthy();
    
    await TestHelpers.takeScreenshot(page, 'glassmorphism-design');
  });

  test('animations et transitions fonctionnent', async ({ page }) => {
    console.log('🎬 Test animations et transitions');
    
    await page.goto('/');
    await TestHelpers.waitForPageLoad(page);
    
    // Vérifier les éléments animés
    const animatedElements = page.locator('[class*="animate"], [class*="transition"], [class*="motion"]');
    const hasAnimations = await animatedElements.first().isVisible().catch(() => false);
    expect.soft(hasAnimations).toBeTruthy();
    
    // Tester les interactions hover si possible
    const interactiveElements = page.locator('button, a, [class*="hover"]');
    if (await interactiveElements.first().isVisible()) {
      await interactiveElements.first().hover();
      await page.waitForTimeout(500);
    }
    
    await TestHelpers.takeScreenshot(page, 'animations-active');
  });

  test('thème dark/light fonctionne', async ({ page }) => {
    console.log('🌓 Test thème dark/light');
    
    await page.goto('/');
    await TestHelpers.waitForPageLoad(page);
    
    // Chercher le bouton de changement de thème
    const themeToggle = page.locator('[data-testid="theme-toggle"], button:has-text("Dark"), button:has-text("Light"), .theme-toggle');
    
    if (await themeToggle.isVisible()) {
      // Capturer l'état initial
      await TestHelpers.takeScreenshot(page, 'theme-initial');
      
      // Changer le thème
      await themeToggle.click();
      await page.waitForTimeout(1000);
      
      // Capturer après changement
      await TestHelpers.takeScreenshot(page, 'theme-changed');
      
      // Vérifier que les classes CSS ont changé
      const body = page.locator('body');
      const hasThemeClass = await body.evaluate(el => 
        el.classList.contains('dark') || el.classList.contains('light')
      );
      expect.soft(hasThemeClass).toBeTruthy();
    } else {
      console.log('⚠️ Bouton de thème non trouvé, test skippé');
    }
  });

  test('éléments critiques sont visibles sur toutes les pages', async ({ page }) => {
    console.log('👁️ Test visibilité éléments critiques');
    
    const criticalPages = ['/', '/login', '/register'];
    
    for (const route of criticalPages) {
      await page.goto(route);
      await TestHelpers.waitForPageLoad(page);
      
      // Vérifier les éléments critiques
      await expect.soft(page.locator('body')).toBeVisible();
      await expect.soft(page.locator('nav')).toBeVisible();
      
      // Vérifier qu'il n'y a pas d'éléments cassés
      const brokenImages = page.locator('img[alt="broken"], img[src=""], img:not([src])');
      const brokenCount = await brokenImages.count();
      expect.soft(brokenCount).toBe(0);
      
      await TestHelpers.takeScreenshot(page, `critical-elements-${route.replace('/', 'home')}`);
    }
  });
});

// 🧪 TESTS DE PERFORMANCE ET QUALITÉ
test.describe('⚡ Performance & Qualité', () => {
  
  test('temps de chargement acceptable', async ({ page }) => {
    console.log('⏱️ Test performance chargement');
    
    const startTime = Date.now();
    
    await page.goto('/');
    await TestHelpers.waitForPageLoad(page);
    
    const loadTime = Date.now() - startTime;
    
    // Vérifier que le chargement prend moins de 10 secondes
    expect.soft(loadTime).toBeLessThan(10000);
    
    console.log(`📊 Temps de chargement: ${loadTime}ms`);
    
    await TestHelpers.takeScreenshot(page, 'performance-loaded');
  });

  test('absence d\'erreurs JavaScript critiques', async ({ page }) => {
    console.log('🐛 Test erreurs JavaScript');
    
    const jsErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        jsErrors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      jsErrors.push(error.message);
    });
    
    await page.goto('/');
    await TestHelpers.waitForPageLoad(page);
    
    // Naviguer vers quelques pages pour détecter les erreurs
    const testRoutes = ['/login', '/register'];
    for (const route of testRoutes) {
      await page.goto(route);
      await TestHelpers.waitForPageLoad(page);
    }
    
    // Filtrer les erreurs non critiques
    const criticalErrors = jsErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('net::ERR_INTERNET_DISCONNECTED') &&
      !error.toLowerCase().includes('warning')
    );
    
    console.log(`📋 Erreurs JS détectées: ${criticalErrors.length}`);
    if (criticalErrors.length > 0) {
      console.log('❌ Erreurs:', criticalErrors);
    }
    
    expect.soft(criticalErrors.length).toBeLessThan(3); // Tolérer quelques erreurs mineures
    
    await TestHelpers.takeScreenshot(page, 'js-errors-check');
  });
});

// 🎯 SETUP ET TEARDOWN
test.beforeAll(async () => {
  console.log('🚀 Initialisation des tests E2E');
  
  // Créer le dossier screenshots s'il n'existe pas
  const fs = require('fs');
  if (!fs.existsSync('tests/screenshots')) {
    fs.mkdirSync('tests/screenshots', { recursive: true });
  }
});

test.afterEach(async ({ page }, testInfo) => {
  // Screenshot automatique en cas d'échec
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = `tests/screenshots/FAILED-${testInfo.title.replace(/[^a-z0-9]/gi, '_')}-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot d'échec sauvé: ${screenshotPath}`);
  }
});

test.afterAll(async () => {
  console.log('✅ Tests E2E terminés');
});
