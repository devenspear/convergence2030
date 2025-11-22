const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      const section = [...document.querySelectorAll('section')].find(s =>
        s.textContent.includes('A DAY IN THE LIFE')
      );
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    await page.waitForTimeout(1500);

    // Add visual measurement indicators
    await page.evaluate(() => {
      const subtitle = [...document.querySelectorAll('p')].find(p =>
        p.textContent.includes('Scroll to witness the evolution')
      );

      const section = [...document.querySelectorAll('section')].find(s =>
        s.textContent.includes('A DAY IN THE LIFE')
      );

      const firstCard = section?.querySelector('.rounded-2xl');

      // Add colored outlines
      if (subtitle) {
        subtitle.style.outline = '3px solid red';
        subtitle.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
      }

      if (firstCard) {
        firstCard.style.outline = '3px solid blue';
      }

      // Add measurement line between subtitle and card
      if (subtitle && firstCard) {
        const subtitleRect = subtitle.getBoundingClientRect();
        const cardRect = firstCard.getBoundingClientRect();

        const line = document.createElement('div');
        line.style.position = 'fixed';
        line.style.left = '20px';
        line.style.top = `${subtitleRect.bottom}px`;
        line.style.width = '2px';
        line.style.height = `${cardRect.top - subtitleRect.bottom}px`;
        line.style.backgroundColor = 'green';
        line.style.zIndex = '9999';
        document.body.appendChild(line);

        // Add label
        const label = document.createElement('div');
        label.textContent = `${Math.round(cardRect.top - subtitleRect.bottom)}px gap`;
        label.style.position = 'fixed';
        label.style.left = '30px';
        label.style.top = `${(subtitleRect.bottom + cardRect.top) / 2 - 10}px`;
        label.style.backgroundColor = 'green';
        label.style.color = 'white';
        label.style.padding = '4px 8px';
        label.style.borderRadius = '4px';
        label.style.fontSize = '14px';
        label.style.fontWeight = 'bold';
        label.style.zIndex = '9999';
        document.body.appendChild(label);
      }
    });

    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'measurement-screenshot-1-spacing.png',
      fullPage: false
    });
    console.log('✓ Saved: measurement-screenshot-1-spacing.png (Shows spacing between subtitle and cards)');

    // Scroll down to show the excessive whitespace
    await page.evaluate(() => {
      window.scrollTo(0, 1400);
    });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'measurement-screenshot-2-whitespace.png',
      fullPage: false
    });
    console.log('✓ Saved: measurement-screenshot-2-whitespace.png (Shows whitespace below timeline)');

    // Full page screenshot
    await page.evaluate(() => {
      const section = [...document.querySelectorAll('section')].find(s =>
        s.textContent.includes('A DAY IN THE LIFE')
      );
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'measurement-screenshot-3-full-view.png',
      fullPage: true
    });
    console.log('✓ Saved: measurement-screenshot-3-full-view.png (Full page screenshot)');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
