const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  // Capture console logs
  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });
  
  // Capture page errors
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
  });
  
  // Navigate to the site
  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Wait for the page to fully load
  await page.waitForTimeout(3000);
  
  // Take screenshot
  await page.screenshot({ 
    path: '/Users/mkazi/60 Projects/screenshots/starters/starter-53.png',
    fullPage: true 
  });
  
  console.log('Screenshot saved to /Users/mkazi/60 Projects/screenshots/starters/starter-53.png');
  
  // Check for any errors
  const logs = await page.evaluate(() => {
    return window.errors || [];
  });
  
  console.log('Page verification complete.');
  
  // Keep browser open for a few seconds to see the page
  await page.waitForTimeout(5000);
  
  await browser.close();
})();
