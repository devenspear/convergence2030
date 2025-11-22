const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Scroll to timeline section
    await page.evaluate(() => {
      const section = [...document.querySelectorAll('section')].find(s =>
        s.textContent.includes('A DAY IN THE LIFE')
      );
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    await page.waitForTimeout(1500);

    console.log('\n=== PIXEL-PERFECT SPACING MEASUREMENTS ===\n');

    const measurements = await page.evaluate(() => {
      // Find elements
      const section = [...document.querySelectorAll('section')].find(s =>
        s.textContent.includes('A DAY IN THE LIFE')
      );

      const subtitle = [...document.querySelectorAll('p')].find(p =>
        p.textContent.includes('Scroll to witness the evolution')
      );

      const firstCard = section?.querySelector('.rounded-2xl');
      const allCards = section?.querySelectorAll('.rounded-2xl');
      const stickyDiv = section?.querySelector('.sticky');

      // Get bounding boxes
      const sectionRect = section?.getBoundingClientRect();
      const subtitleRect = subtitle?.getBoundingClientRect();
      const firstCardRect = firstCard?.getBoundingClientRect();
      const stickyRect = stickyDiv?.getBoundingClientRect();

      return {
        section: sectionRect ? {
          top: Math.round(sectionRect.top),
          bottom: Math.round(sectionRect.bottom),
          height: Math.round(sectionRect.height)
        } : null,
        subtitle: subtitleRect ? {
          top: Math.round(subtitleRect.top),
          bottom: Math.round(subtitleRect.bottom),
          height: Math.round(subtitleRect.height)
        } : null,
        firstCard: firstCardRect ? {
          top: Math.round(firstCardRect.top),
          bottom: Math.round(firstCardRect.bottom),
          height: Math.round(firstCardRect.height)
        } : null,
        sticky: stickyRect ? {
          top: Math.round(stickyRect.top),
          bottom: Math.round(stickyRect.bottom),
          height: Math.round(stickyRect.height)
        } : null,
        cardCount: allCards?.length || 0
      };
    });

    console.log('SECTION:');
    console.log(`  Position: ${measurements.section.top}px to ${measurements.section.bottom}px`);
    console.log(`  Height: ${measurements.section.height}px`);

    console.log('\nSUBTITLE:');
    console.log(`  Position: ${measurements.subtitle.top}px to ${measurements.subtitle.bottom}px`);
    console.log(`  Height: ${measurements.subtitle.height}px`);

    console.log('\nFIRST CARD:');
    console.log(`  Position: ${measurements.firstCard.top}px to ${measurements.firstCard.bottom}px`);
    console.log(`  Height: ${measurements.firstCard.height}px`);

    console.log('\nSTICKY CONTAINER:');
    console.log(`  Position: ${measurements.sticky.top}px to ${measurements.sticky.bottom}px`);
    console.log(`  Height: ${measurements.sticky.height}px`);

    console.log('\n=== KEY MEASUREMENTS ===\n');

    const subtitleToCard = measurements.firstCard.top - measurements.subtitle.bottom;
    console.log(`1. SPACING BETWEEN SUBTITLE AND FIRST CARD: ${subtitleToCard}px`);
    if (subtitleToCard < 0) {
      console.log(`   ❌ PROBLEM: Subtitle overlaps cards by ${Math.abs(subtitleToCard)}px`);
    } else if (subtitleToCard < 16) {
      console.log(`   ⚠️  WARNING: Very tight spacing (should be at least 16-24px)`);
    } else if (subtitleToCard > 60) {
      console.log(`   ⚠️  WARNING: Excessive spacing`);
    } else {
      console.log(`   ✅ GOOD: Proper spacing`);
    }

    const cardToStickyBottom = measurements.sticky.bottom - measurements.firstCard.bottom;
    console.log(`\n2. SPACE BELOW CARDS (within sticky container): ${cardToStickyBottom}px`);

    const stickyToSectionBottom = measurements.section.bottom - measurements.sticky.bottom;
    console.log(`\n3. WHITESPACE BELOW STICKY CONTAINER: ${stickyToSectionBottom}px`);
    if (stickyToSectionBottom > 800) {
      console.log(`   ❌ PROBLEM: Excessive whitespace (${stickyToSectionBottom}px)`);
    } else if (stickyToSectionBottom > 400) {
      console.log(`   ⚠️  WARNING: Noticeable whitespace`);
    } else {
      console.log(`   ✅ GOOD: Minimal whitespace`);
    }

    const totalSectionToCardRatio = ((measurements.firstCard.height / measurements.section.height) * 100).toFixed(1);
    console.log(`\n4. CARD HEIGHT vs SECTION HEIGHT: ${totalSectionToCardRatio}% (Card: ${measurements.firstCard.height}px / Section: ${measurements.section.height}px)`);

    console.log(`\n5. NUMBER OF TIMELINE CARDS: ${measurements.cardCount}`);

    console.log('\n=== DIAGNOSIS ===\n');

    if (subtitleToCard >= 12 && subtitleToCard <= 40) {
      console.log('✅ Subtitle spacing: RESOLVED');
    } else {
      console.log('❌ Subtitle spacing: NEEDS FIXING');
    }

    if (stickyToSectionBottom <= 200) {
      console.log('✅ Bottom whitespace: RESOLVED');
    } else {
      console.log('❌ Bottom whitespace: EXCESSIVE - Section is h-[200vh] (2x viewport height) but cards only use sticky container');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
