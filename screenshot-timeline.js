const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to a standard desktop size
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Also create a taller viewport to capture more of the timeline
  const page2 = await browser.newPage();
  await page2.setViewportSize({ width: 1920, height: 1400 });

  // Navigate to the page
  await page.goto('http://localhost:3000');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Take a full page screenshot first
  await page.screenshot({ path: '/Users/devenspear/VibeCodingProjects/convergence-2030/full-page.png', fullPage: true });
  console.log('Full page screenshot saved as full-page.png');

  // Try to find and scroll to "A DAY IN THE LIFE" section
  const dayInLifeSection = await page.locator('text=A DAY IN THE LIFE').first();

  if (await dayInLifeSection.count() > 0) {
    await dayInLifeSection.scrollIntoViewIfNeeded();

    // Wait a bit for any animations
    await page.waitForTimeout(500);

    // Take a screenshot of the viewport showing the section
    await page.screenshot({ path: '/Users/devenspear/VibeCodingProjects/convergence-2030/timeline-section.png' });
    console.log('Timeline section screenshot saved as timeline-section.png');

    // Scroll down to capture 2029 and 2030
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/Users/devenspear/VibeCodingProjects/convergence-2030/timeline-2029-2030.png' });
    console.log('Timeline 2029-2030 screenshot saved');

    // Take a screenshot of just the timeline section with more height
    const sectionElement = await page.locator('text=A DAY IN THE LIFE').locator('..').first();
    if (await sectionElement.count() > 0) {
      await sectionElement.screenshot({ path: '/Users/devenspear/VibeCodingProjects/convergence-2030/timeline-full-section.png' });
      console.log('Full timeline section screenshot saved');
    }

    // Use the taller viewport page
    await page2.goto('http://localhost:3000');
    await page2.waitForLoadState('networkidle');
    const dayInLifeSection2 = await page2.locator('text=A DAY IN THE LIFE').first();
    if (await dayInLifeSection2.count() > 0) {
      await dayInLifeSection2.scrollIntoViewIfNeeded();
      await page2.waitForTimeout(500);
      await page2.screenshot({ path: '/Users/devenspear/VibeCodingProjects/convergence-2030/timeline-tall-viewport.png' });
      console.log('Tall viewport screenshot saved');
    }

    // Get the bounding box of timeline cards to analyze layout
    const cards = await page.locator('[class*="timeline"], [class*="card"]').all();
    console.log(`Found ${cards.length} timeline/card elements`);

    // Try to get all year cards specifically
    const yearCards = await page.locator('text=/202[0-9]|2030/').all();
    console.log(`Found ${yearCards.length} year elements`);

  } else {
    console.log('Could not find "A DAY IN THE LIFE" section');
  }

  await browser.close();
})();
