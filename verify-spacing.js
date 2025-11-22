const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait for the page to fully load
    await page.waitForTimeout(2000);

    // Find the "A DAY IN THE LIFE" section
    console.log('\n=== MEASURING SPACING IN "A DAY IN THE LIFE" SECTION ===\n');

    // Scroll to the section
    const dayInLifeSection = page.locator('text=A DAY IN THE LIFE').first();
    await dayInLifeSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Measure subtitle to first card spacing
    const subtitle = page.locator('text=Scroll to witness the evolution →').first();
    // Find the first timeline card by looking for a div containing "2026"
    const firstCard = page.locator('div').filter({ hasText: /^2026$/ }).first().locator('..').first();

    const subtitleBox = await subtitle.boundingBox();
    const firstCardBox = await firstCard.boundingBox();

    if (subtitleBox && firstCardBox) {
      const gap = firstCardBox.y - (subtitleBox.y + subtitleBox.height);
      console.log(`📏 Subtitle bottom position: ${subtitleBox.y + subtitleBox.height}px`);
      console.log(`📏 First card top position: ${firstCardBox.y}px`);
      console.log(`✅ GAP between subtitle and first card: ${gap}px`);
      console.log(`   (Previous measurement: 12px)\n`);
    }

    // Take screenshot of subtitle-to-card spacing
    console.log('📸 Taking screenshot of subtitle-to-card spacing...');
    await subtitle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: '/Users/devenspear/VibeCodingProjects/convergence-2030/subtitle-to-card-spacing.png',
      fullPage: false
    });
    console.log('   Saved: subtitle-to-card-spacing.png\n');

    // Find all timeline cards by looking for divs containing years
    const allCards = page.locator('div').filter({ hasText: /^(2026|2027|2028|2029|2030)$/ }).locator('..');
    const cardCount = await allCards.count();
    console.log(`Found ${cardCount} timeline cards\n`);

    // Get the last card's position (2030)
    const lastCard = page.locator('div').filter({ hasText: /^2030$/ }).first().locator('..').first();
    await lastCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const lastCardBox = await lastCard.boundingBox();
    console.log(`📏 Last card bottom position: ${lastCardBox.y + lastCardBox.height}px`);

    // Scroll down to see what's below the cards
    await page.evaluate(() => {
      window.scrollBy(0, 500);
    });
    await page.waitForTimeout(1000);

    // Get viewport and document dimensions
    const dimensions = await page.evaluate(() => {
      return {
        viewportHeight: window.innerHeight,
        scrollY: window.scrollY,
        documentHeight: document.documentElement.scrollHeight
      };
    });

    // Try to find the next section after the timeline cards
    const nextSectionSelector = await page.evaluate(() => {
      const dayInLifeHeading = Array.from(document.querySelectorAll('h2, h1')).find(
        el => el.textContent.includes('A DAY IN THE LIFE')
      );

      if (!dayInLifeHeading) return null;

      const section = dayInLifeHeading.closest('section') || dayInLifeHeading.parentElement;
      const nextSibling = section?.nextElementSibling;

      if (nextSibling) {
        const rect = nextSibling.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        return {
          tag: nextSibling.tagName,
          offsetTop: offsetTop,
          text: nextSibling.textContent.slice(0, 50)
        };
      }
      return null;
    });

    if (nextSectionSelector) {
      console.log(`📏 Next section starts at: ${nextSectionSelector.offsetTop}px`);
      console.log(`   Tag: ${nextSectionSelector.tag}`);
      console.log(`   Preview: "${nextSectionSelector.text.trim()}..."\n`);

      const whitespace = nextSectionSelector.offsetTop - (lastCardBox.y + lastCardBox.height);
      console.log(`✅ WHITESPACE below timeline cards: ${whitespace}px`);
      console.log(`   (Previous measurement: 1,080px)\n`);
    } else {
      console.log('⚠️  Could not find next section after timeline cards\n');
    }

    // Take screenshot of whitespace below cards
    console.log('📸 Taking screenshot of whitespace below cards...');
    await lastCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: '/Users/devenspear/VibeCodingProjects/convergence-2030/whitespace-below-cards.png',
      fullPage: true
    });
    console.log('   Saved: whitespace-below-cards.png\n');

    // Summary
    console.log('\n=== SUMMARY ===\n');
    console.log('Screenshots saved:');
    console.log('  1. subtitle-to-card-spacing.png');
    console.log('  2. whitespace-below-cards.png');
    console.log('\nViewport info:');
    console.log(`  - Viewport height: ${dimensions.viewportHeight}px`);
    console.log(`  - Current scroll position: ${dimensions.scrollY}px`);
    console.log(`  - Total document height: ${dimensions.documentHeight}px`);

    // Keep browser open for manual inspection
    console.log('\nKeeping browser open for manual inspection...');
    console.log('Press Ctrl+C to close when done.\n');

    // Wait indefinitely
    await new Promise(() => {});

  } catch (error) {
    console.error('Error:', error);
    await browser.close();
    process.exit(1);
  }
})();
