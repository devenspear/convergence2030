const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Set viewport to a standard desktop size
  await page.setViewportSize({ width: 1920, height: 1080 });

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait a bit for any animations to complete
    await page.waitForTimeout(2000);

    // Find and scroll to the "A DAY IN THE LIFE" section
    console.log('Looking for "A DAY IN THE LIFE" section...');
    const section = await page.locator('text="A DAY IN THE LIFE"').first();

    if (await section.count() > 0) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      console.log('Taking screenshots...');

      // Screenshot 1: Full page view of the section
      await page.screenshot({
        path: 'screenshot-full-section.png',
        fullPage: false
      });
      console.log('Saved: screenshot-full-section.png');

      // Screenshot 2: Focused on header and subtitle
      const headerSection = await page.locator('text="A DAY IN THE LIFE"').first().locator('..');
      if (await headerSection.count() > 0) {
        await headerSection.screenshot({
          path: 'screenshot-header-subtitle.png'
        });
        console.log('Saved: screenshot-header-subtitle.png');
      }

      // Get measurements
      console.log('\n=== MEASUREMENTS ===\n');

      // Find the subtitle
      const subtitle = await page.locator('text="Scroll to witness the evolution"').first();
      if (await subtitle.count() > 0) {
        const subtitleBox = await subtitle.boundingBox();
        console.log('Subtitle position:', subtitleBox);

        // Find the first timeline card
        const firstCard = await page.locator('.snap-start').first();
        if (await firstCard.count() > 0) {
          const cardBox = await firstCard.boundingBox();
          console.log('First card position:', cardBox);

          if (subtitleBox && cardBox) {
            const spacing = cardBox.y - (subtitleBox.y + subtitleBox.height);
            console.log(`\nSpacing between subtitle and first card: ${spacing}px`);
          }
        }

        // Measure the timeline container
        const timelineContainer = await page.locator('.snap-x.snap-mandatory').first();
        if (await timelineContainer.count() > 0) {
          const containerBox = await timelineContainer.boundingBox();
          console.log('\nTimeline container:', containerBox);

          // Screenshot of the scrollable area
          await timelineContainer.screenshot({
            path: 'screenshot-timeline-container.png'
          });
          console.log('Saved: screenshot-timeline-container.png');
        }
      }

      // Try to find the next section after timeline
      console.log('\n=== CHECKING WHITESPACE BELOW CARDS ===\n');

      // Get all sections
      const allSections = await page.locator('section').all();
      console.log(`Found ${allSections.length} sections on the page`);

      // Find the timeline section and the next one
      for (let i = 0; i < allSections.length; i++) {
        const sectionText = await allSections[i].textContent();
        if (sectionText.includes('A DAY IN THE LIFE')) {
          console.log(`Timeline section is section #${i}`);
          const timelineSectionBox = await allSections[i].boundingBox();
          console.log('Timeline section box:', timelineSectionBox);

          if (i + 1 < allSections.length) {
            const nextSectionBox = await allSections[i + 1].boundingBox();
            console.log('Next section box:', nextSectionBox);

            if (timelineSectionBox && nextSectionBox) {
              const whitespace = nextSectionBox.y - (timelineSectionBox.y + timelineSectionBox.height);
              console.log(`\nWhitespace between timeline section and next section: ${whitespace}px`);
            }

            // Take screenshot showing the gap
            await page.evaluate((index) => {
              const sections = document.querySelectorAll('section');
              sections[index + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, i);
            await page.waitForTimeout(1000);

            await page.screenshot({
              path: 'screenshot-section-gap.png',
              fullPage: false
            });
            console.log('Saved: screenshot-section-gap.png');
          }
          break;
        }
      }

      // Get computed styles
      console.log('\n=== COMPUTED STYLES ===\n');

      const timelineSection = await page.locator('text="A DAY IN THE LIFE"').first().locator('xpath=ancestor::section');
      if (await timelineSection.count() > 0) {
        const styles = await timelineSection.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            padding: computed.padding,
            paddingTop: computed.paddingTop,
            paddingBottom: computed.paddingBottom,
            margin: computed.margin,
            marginBottom: computed.marginBottom,
            height: computed.height,
            minHeight: computed.minHeight
          };
        });
        console.log('Timeline section styles:', styles);
      }

      const timelineContainer = await page.locator('.snap-x.snap-mandatory').first();
      if (await timelineContainer.count() > 0) {
        const containerStyles = await timelineContainer.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            padding: computed.padding,
            margin: computed.margin,
            height: computed.height,
            gap: computed.gap
          };
        });
        console.log('Timeline container styles:', containerStyles);
      }

    } else {
      console.log('Could not find "A DAY IN THE LIFE" section');
    }

    console.log('\n=== Test Complete ===');
    console.log('Check the screenshots in the project directory');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
