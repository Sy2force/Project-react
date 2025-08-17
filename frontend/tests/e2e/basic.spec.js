import { test, expect } from '@playwright/test';

test.describe('Portfolio Site Basic Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Portfolio/);
    
    // Check for main navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for hero section
    await expect(page.locator('h1')).toBeVisible();
  });

  test('login page is accessible', async ({ page }) => {
    await page.goto('/login');
    
    // Check login form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('register page is accessible', async ({ page }) => {
    await page.goto('/register');
    
    // Check register form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('services page loads correctly', async ({ page }) => {
    await page.goto('/services');
    
    // Should redirect to login if not authenticated
    await expect(page).toHaveURL(/\/login/);
  });

  test('projects page loads correctly', async ({ page }) => {
    await page.goto('/projects');
    
    // Should redirect to login if not authenticated
    await expect(page).toHaveURL(/\/login/);
  });

  test('contact page loads correctly', async ({ page }) => {
    await page.goto('/contact');
    
    // Should redirect to login if not authenticated
    await expect(page).toHaveURL(/\/login/);
  });

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links
    const loginLink = page.locator('a[href="/login"]');
    if (await loginLink.isVisible()) {
      await loginLink.click();
      await expect(page).toHaveURL(/\/login/);
    }
  });

  test('responsive design works', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile navigation is working
    await expect(page.locator('nav')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await expect(page.locator('nav')).toBeVisible();
  });

  test('no console errors on homepage', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForTimeout(2000); // Wait for any async operations
    
    // Allow some common non-critical errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('net::ERR_')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});
