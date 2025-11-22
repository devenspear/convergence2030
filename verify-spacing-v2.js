const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait for the page to fully load
    await page.waitForTimeout(2000);

    console.log('\n=== MEASURING SPACING IN "A DAY IN THE LIFE" SECTION ===\n');

    // Scroll to the section
    const dayInLifeSection = page.locator('text=A DAY IN THE LIFE').first();
    await dayInLifeSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Use JavaScript to get precise measurements
    const measurements = await page.evaluate(() => {
      // Find the subtitle
      const subtitle = Array.from(document.querySelectorAll('p')).find(
        el => el.textContent.includes('Scroll to witness the evolution')
      );

      // Find the section containing timeline cards
      const section = Array.from(document.querySelectorAll('section')).find(
        el => el.textContent.includes('A DAY IN THE LIFE')
      );

      if (!section || !subtitle) {
        return { error: 'Could not find required elements' };
      }

      // Find all cards (looking for the white rounded boxes)
      const cards = Array.from(section.querySelectorAll('div')).filter(el => {
        const styles = window.getComputedStyle(el);
        return styles.backgroundColor === 'rgb(255, 255, 255)' &&
               styles.borderRadius !== '0px' &&
               el.textContent.match(/202[6-9]|2030/);
      });

      if (cards.length === 0) {
        // Alternative: find by looking for elements containing years
        const yearElements = Array.from(section.querySelectorAll('*')).filter(
          el => /^(2026|2027|2028|2029|2030)$/.test(el.textContent.trim())
        );

        const cardElements = yearElements.map(el => {
          // Find the card container (parent with rounded border)
          let parent = el.parentElement;
          while (parent && parent !== section) {
            const styles = window.getComputedStyle(parent);
            if (styles.borderRadius !== '0px' && parseInt(styles.borderRadius) > 10) {
              return parent;
            }
            parent = parent.parentElement;
          }
          return null;
        }).filter(Boolean);

        if (cardElements.length > 0) {
          cards.push(...cardElements);
        }
      }

      const subtitleRect = subtitle.getBoundingClientRect();
      const subtitleBottom = subtitleRect.bottom + window.scrollY;

      let firstCardTop = null;
      let lastCardBottom = null;

      if (cards.length > 0) {
        // Get first card position
        const firstCardRect = cards[0].getBoundingClientRect();
        firstCardTop = firstCardRect.top + window.scrollY;

        // Get last card position
        const lastCardRect = cards[cards.length - 1].getBoundingClientRect();
        lastCardBottom = lastCardRect.bottom + window.scrollY;
      }

      // Find next section
      let nextSectionTop = null;
      if (section.nextElementSibling) {
        const nextRect = section.nextElementSibling.getBoundingClientRect();
        nextSectionTop = nextRect.top + window.scrollY;
      }

      return {
        subtitleBottom,
        firstCardTop,
        lastCardBottom,
        nextSectionTop,
        cardsFound: cards.length,
        viewportHeight: window.innerHeight,
        scrollY: window.scrollY,
        documentHeight: document.documentElement.scrollHeight
      };
    });

    if (measurements.error) {
      console.error('❌', measurements.error);
      await browser.close();
      process.exit(1);
    }

    console.log(`Found ${measurements.cardsFound} timeline cards\n`);

    // Calculate gaps
    const subtitleToCardGap = measurements.firstCardTop - measurements.subtitleBottom;
    const belowCardsWhitespace = measurements.nextSectionTop
      ? measurements.nextSectionTop - measurements.lastCardBottom
      : null;

    console.log('📏 MEASUREMENTS:\n');
    console.log(`   Subtitle bottom: ${measurements.subtitleBottom.toFixed(2)}px`);
    console.log(`   First card top: ${measurements.firstCardTop.toFixed(2)}px`);
    console.log(`   ✅ GAP (subtitle → first card): ${subtitleToCardGap.toFixed(2)}px`);
    console.log(`   📊 Previous measurement: 12px`);
    console.log(`   ${subtitleToCardGap > 12 ? '✅ FIXED - Gap increased!' : '❌ Still too small'}\n`);

    console.log(`   Last card bottom: ${measurements.lastCardBottom.toFixed(2)}px`);
    if (measurements.nextSectionTop) {
      console.log(`   Next section top: ${measurements.nextSectionTop.toFixed(2)}px`);
      console.log(`   ✅ WHITESPACE below cards: ${belowCardsWhitespace.toFixed(2)}px`);
      console.log(`   📊 Previous measurement: 1,080px`);
      console.log(`   ${belowCardsWhitespace < 1080 ? '✅ FIXED - Whitespace reduced!' : '❌ Still too much whitespace'}\n`);
    } else {
      console.log('   ⚠️  No next section found\n');
    }

    // Take screenshot of subtitle-to-card spacing
    console.log('📸 Taking screenshot 1: subtitle-to-card spacing...');
    await page.locator('text=Scroll to witness the evolution →').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: '/Users/devenspear/VibeCodingProjects/convergence-2030/subtitle-to-card-spacing.png',
      fullPage: false
    });
    console.log('   ✓ Saved: subtitle-to-card-spacing.png\n');

    // Scroll down to show the last card and whitespace below
    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll('section')).find(
        el => el.textContent.includes('A DAY IN THE LIFE')
      );
      if (section) {
        const rect = section.getBoundingClientRect();
        window.scrollTo(0, rect.bottom + window.scrollY - window.innerHeight / 2);
      }
    });
    await page.waitForTimeout(1000);

    // Take screenshot of whitespace below cards
    console.log('📸 Taking screenshot 2: whitespace below cards...');
    await page.screenshot({
      path: '/Users/devenspear/VibeCodingProjects/convergence-2030/whitespace-below-cards.png',
      fullPage: true
    });
    console.log('   ✓ Saved: whitespace-below-cards.png\n');

    // Summary
    console.log('\n=== SUMMARY ===\n');
    console.log('Comparison with previous measurements:');
    console.log(`  Subtitle → Card gap: ${subtitleToCardGap.toFixed(0)}px (was 12px) - ${subtitleToCardGap > 12 ? 'IMPROVED ✅' : 'NOT FIXED ❌'}`);
    if (belowCardsWhitespace) {
      console.log(`  Whitespace below: ${belowCardsWhitespace.toFixed(0)}px (was 1,080px) - ${belowCardsWhitespace < 1080 ? 'IMPROVED ✅' : 'NOT FIXED ❌'}`);
    }
    console.log('\nScreenshots saved:');
    console.log('  1. subtitle-to-card-spacing.png');
    console.log('  2. whitespace-below-cards.png');

    console.log('\n✓ Verification complete! Check the screenshots for visual confirmation.\n');

    await browser.close();

  } catch (error) {
    console.error('Error:', error);
    await browser.close();
    process.exit(1);
  }
})();
