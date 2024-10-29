// profile.spec.js
const { test, expect } = require('@playwright/test');

test('should display leaderboard on profile page', async ({ page }) => {
    // Navigate to the profile page
    await page.goto('http://localhost:3000/profile');

    // Wait for the leaderboard component to be visible
    const leaderboard = page.locator('text=Deadlift');
    await expect(leaderboard).toBeVisible();

    // Check if there are leaderboard items (e.g., "Niks Kevins")
    const leaderboardItems = page.locator('text=Niks Kevins');
    await expect(leaderboardItems).toHaveCount(1); // Check that "Niks Kevins" appears once

    // Check if a user's weight is displayed (e.g., "200 Kg")
    const weight = page.locator('text=200 Kg');
    await expect(weight).toBeVisible();
});
