const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  try {
    console.log('Navigating to http://localhost:3000...');
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

    console.log('\n=== SPACING ANALYSIS FOR "A DAY IN THE LIFE" SECTION ===\n');

    const analysis = await page.evaluate(() => {
      // Find the section
      const section = [...document.querySelectorAll('section')].find(s =>
        s.textContent.includes('A DAY IN THE LIFE')
      );

      // Find the sticky container
      const stickyContainer = section?.querySelector('.sticky');

      // Find the heading container (with absolute positioning)
      const headingContainer = section?.querySelector('.absolute.left-8');

      // Find the subtitle
      const subtitle = [...document.querySelectorAll('p')].find(p =>
        p.textContent.includes('Scroll to witness the evolution')
      );

      // Find the motion.div that contains the cards
      const cardsContainer = section?.querySelector('.flex.gap-8');

      // Find the first card
      const firstCard = cardsContainer?.querySelector('.rounded-2xl');

      const results = {};

      if (section) {
        const rect = section.getBoundingClientRect();
        const styles = window.getComputedStyle(section);
        results.section = {
          height: rect.height,
          className: section.className,
          computedHeight: styles.height,
          minHeight: styles.minHeight,
          paddingTop: styles.paddingTop,
          paddingBottom: styles.paddingBottom,
          top: rect.top,
          bottom: rect.bottom
        };
      }

      if (stickyContainer) {
        const rect = stickyContainer.getBoundingClientRect();
        const styles = window.getComputedStyle(stickyContainer);
        results.stickyContainer = {
          height: rect.height,
          className: stickyContainer.className,
          paddingTop: styles.paddingTop,
          top: rect.top,
          bottom: rect.bottom
        };
      }

      if (headingContainer) {
        const rect = headingContainer.getBoundingClientRect();
        const styles = window.getComputedStyle(headingContainer);
        results.headingContainer = {
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
          left: styles.left,
          topStyle: styles.top
        };
      }

      if (subtitle) {
        const rect = subtitle.getBoundingClientRect();
        const styles = window.getComputedStyle(subtitle);
        results.subtitle = {
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
          marginBottom: styles.marginBottom,
          text: subtitle.textContent
        };
      }

      if (cardsContainer) {
        const rect = cardsContainer.getBoundingClientRect();
        const styles = window.getComputedStyle(cardsContainer);
        results.cardsContainer = {
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
          className: cardsContainer.className,
          gap: styles.gap,
          paddingLeft: styles.paddingLeft
        };
      }

      if (firstCard) {
        const rect = firstCard.getBoundingClientRect();
        const styles = window.getComputedStyle(firstCard);
        results.firstCard = {
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
          width: rect.width,
          minHeight: styles.minHeight,
          padding: styles.padding
        };
      }

      // Calculate key spacing measurements
      results.measurements = {};

      if (subtitle && firstCard) {
        results.measurements.subtitleToFirstCard = Math.round(firstCard.top - subtitle.bottom);
      }

      if (cardsContainer && section) {
        results.measurements.cardsContainerToSectionBottom = Math.round(section.bottom - cardsContainer.bottom);
      }

      if (stickyContainer && section) {
        results.measurements.stickyContainerHeight = Math.round(stickyContainer.height);
        results.measurements.sectionHeight = Math.round(section.height);
      }

      return results;
    });

    console.log('1. SECTION DIMENSIONS:');
    console.log('   - Total section height:', analysis.section.height, 'px');
    console.log('   - Section class:', analysis.section.className);
    console.log('   - Computed height:', analysis.section.computedHeight);
    console.log('   - Min-height:', analysis.section.minHeight);

    console.log('\n2. STICKY CONTAINER:');
    console.log('   - Height:', analysis.stickyContainer.height, 'px');
    console.log('   - Padding-top:', analysis.stickyContainer.paddingTop);

    console.log('\n3. SUBTITLE POSITION:');
    console.log('   - Text:', analysis.subtitle.text);
    console.log('   - Top:', Math.round(analysis.subtitle.top), 'px from viewport top');
    console.log('   - Bottom:', Math.round(analysis.subtitle.bottom), 'px from viewport top');
    console.log('   - Height:', Math.round(analysis.subtitle.height), 'px');

    console.log('\n4. FIRST CARD POSITION:');
    console.log('   - Top:', Math.round(analysis.firstCard.top), 'px from viewport top');
    console.log('   - Height:', Math.round(analysis.firstCard.height), 'px');
    console.log('   - Width:', Math.round(analysis.firstCard.width), 'px');

    console.log('\n5. KEY MEASUREMENTS:');
    console.log('   ✓ Spacing between subtitle and first card:', analysis.measurements.subtitleToFirstCard, 'px');
    console.log('   ✓ Whitespace below cards to section end:', analysis.measurements.cardsContainerToSectionBottom, 'px');

    console.log('\n6. VISUAL ANALYSIS:');
    if (analysis.measurements.subtitleToFirstCard < 0) {
      console.log('   ⚠️  OVERLAP DETECTED: Subtitle overlaps with cards by', Math.abs(analysis.measurements.subtitleToFirstCard), 'px');
    } else if (analysis.measurements.subtitleToFirstCard < 20) {
      console.log('   ⚠️  INSUFFICIENT SPACING: Only', analysis.measurements.subtitleToFirstCard, 'px between subtitle and cards');
    } else if (analysis.measurements.subtitleToFirstCard > 100) {
      console.log('   ⚠️  EXCESSIVE SPACING:', analysis.measurements.subtitleToFirstCard, 'px between subtitle and cards');
    } else {
      console.log('   ✓ Good spacing between subtitle and cards');
    }

    if (analysis.measurements.cardsContainerToSectionBottom > 500) {
      console.log('   ⚠️  EXCESSIVE WHITESPACE BELOW:', analysis.measurements.cardsContainerToSectionBottom, 'px below cards');
    } else {
      console.log('   ✓ Reasonable whitespace below cards');
    }

    // Take annotated screenshots
    console.log('\n7. TAKING ANNOTATED SCREENSHOTS...');

    await page.evaluate(() => {
      // Add measurement overlays
      const subtitle = [...document.querySelectorAll('p')].find(p =>
        p.textContent.includes('Scroll to witness the evolution')
      );
      if (subtitle) {
        subtitle.style.outline = '3px solid red';
        subtitle.style.outlineOffset = '2px';
      }

      const section = [...document.querySelectorAll('section')].find(s =>
        s.textContent.includes('A DAY IN THE LIFE')
      );
      const firstCard = section?.querySelector('.rounded-2xl');
      if (firstCard) {
        firstCard.style.outline = '3px solid blue';
        firstCard.style.outlineOffset = '2px';
      }
    });

    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'final-screenshot-top.png',
      fullPage: false
    });
    console.log('   ✓ Saved: final-screenshot-top.png (Red=subtitle, Blue=first card)');

    // Scroll to see the bottom of the section
    await page.evaluate(() => {
      const section = [...document.querySelectorAll('section')].find(s =>
        s.textContent.includes('A DAY IN THE LIFE')
      );
      if (section) {
        const rect = section.getBoundingClientRect();
        window.scrollBy(0, rect.height - 400);
      }
    });

    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'final-screenshot-bottom.png',
      fullPage: false
    });
    console.log('   ✓ Saved: final-screenshot-bottom.png');

    console.log('\n=== ANALYSIS COMPLETE ===\n');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
