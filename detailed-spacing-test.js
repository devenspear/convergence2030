const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Set viewport to a standard desktop size
  await page.setViewportSize({ width: 1920, height: 1080 });

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Scroll to the timeline section
    const section = await page.locator('text="A DAY IN THE LIFE"').first();
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    console.log('\n=== DETAILED SPACING ANALYSIS ===\n');

    // Get detailed measurements
    const measurements = await page.evaluate(() => {
      // Find the subtitle
      const subtitle = [...document.querySelectorAll('*')].find(el =>
        el.textContent.includes('Scroll to witness the evolution') &&
        !el.querySelector('*')
      );

      // Find the timeline container
      const timelineContainer = document.querySelector('.snap-x.snap-mandatory');

      // Find the first card
      const firstCard = timelineContainer?.querySelector('.snap-start');

      // Find the section
      const timelineSection = [...document.querySelectorAll('section')].find(s =>
        s.textContent.includes('A DAY IN THE LIFE')
      );

      const results = {
        subtitle: null,
        firstCard: null,
        timelineContainer: null,
        section: null,
        spacing: {}
      };

      if (subtitle) {
        const rect = subtitle.getBoundingClientRect();
        const styles = window.getComputedStyle(subtitle);
        results.subtitle = {
          y: rect.y,
          bottom: rect.bottom,
          height: rect.height,
          marginBottom: styles.marginBottom,
          paddingBottom: styles.paddingBottom
        };
      }

      if (firstCard) {
        const rect = firstCard.getBoundingClientRect();
        const styles = window.getComputedStyle(firstCard);
        results.firstCard = {
          y: rect.y,
          top: rect.top,
          height: rect.height,
          marginTop: styles.marginTop,
          paddingTop: styles.paddingTop
        };
      }

      if (timelineContainer) {
        const rect = timelineContainer.getBoundingClientRect();
        const styles = window.getComputedStyle(timelineContainer);
        results.timelineContainer = {
          y: rect.y,
          bottom: rect.bottom,
          height: rect.height,
          padding: styles.padding,
          paddingTop: styles.paddingTop,
          paddingBottom: styles.paddingBottom,
          gap: styles.gap
        };
      }

      if (timelineSection) {
        const rect = timelineSection.getBoundingClientRect();
        const styles = window.getComputedStyle(timelineSection);
        results.section = {
          y: rect.y,
          bottom: rect.bottom,
          height: rect.height,
          minHeight: styles.minHeight,
          padding: styles.padding,
          paddingBottom: styles.paddingBottom
        };
      }

      // Calculate spacing
      if (results.subtitle && results.firstCard) {
        results.spacing.subtitleToCard = results.firstCard.y - results.subtitle.bottom;
      }

      if (results.timelineContainer && results.section) {
        results.spacing.containerToSectionEnd = results.section.bottom - results.timelineContainer.bottom;
      }

      return results;
    });

    console.log('Subtitle info:', measurements.subtitle);
    console.log('\nFirst card info:', measurements.firstCard);
    console.log('\nTimeline container info:', measurements.timelineContainer);
    console.log('\nSection info:', measurements.section);
    console.log('\n--- SPACING CALCULATIONS ---');
    console.log(`Spacing between subtitle and first card: ${measurements.spacing.subtitleToCard}px`);
    console.log(`Whitespace below timeline container to end of section: ${measurements.spacing.containerToSectionEnd}px`);

    // Take a screenshot with annotations
    await page.evaluate(() => {
      // Add visual markers
      const subtitle = [...document.querySelectorAll('*')].find(el =>
        el.textContent.includes('Scroll to witness the evolution') &&
        !el.querySelector('*')
      );

      if (subtitle) {
        subtitle.style.outline = '3px solid red';
      }

      const firstCard = document.querySelector('.snap-x.snap-mandatory .snap-start');
      if (firstCard) {
        firstCard.style.outline = '3px solid blue';
      }

      const container = document.querySelector('.snap-x.snap-mandatory');
      if (container) {
        container.style.outline = '2px solid green';
      }
    });

    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'screenshot-annotated.png',
      fullPage: false
    });
    console.log('\nSaved annotated screenshot: screenshot-annotated.png');
    console.log('Red outline: Subtitle');
    console.log('Blue outline: First card');
    console.log('Green outline: Timeline container');

    // Scroll down to see the bottom of the timeline section
    await page.evaluate(() => {
      const section = [...document.querySelectorAll('section')].find(s =>
        s.textContent.includes('A DAY IN THE LIFE')
      );
      if (section) {
        window.scrollTo(0, section.getBoundingClientRect().bottom + window.scrollY - window.innerHeight);
      }
    });

    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'screenshot-bottom-of-timeline.png',
      fullPage: false
    });
    console.log('Saved bottom view: screenshot-bottom-of-timeline.png');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
