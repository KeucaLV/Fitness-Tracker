const { test, expect } = require('@playwright/test');

test('Login form should be visible on the page', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/login');  // Use the actual URL of your login page

    // Check if the email input field is visible
    const emailInput = page.locator('input[placeholder="Email"]');
    await expect(emailInput).toBeVisible();

    // Check if the password input field is visible
    const passwordInput = page.locator('input[placeholder="Password"]');
    await expect(passwordInput).toBeVisible();

    // Check if the sign-in button is visible
    const submitButton = page.locator('button', { hasText: 'Sign in' });
    await expect(submitButton).toBeVisible();

    // Check if the "I agree to the terms" checkbox is visible
    const termsCheckbox = page.locator('input[type="checkbox"]');
    await expect(termsCheckbox).toBeVisible();


});
