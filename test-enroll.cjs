const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', error => {
    errors.push(error.message);
  });

  try {
    await page.goto('http://localhost:3001/enroll');
    await page.waitForLoadState('networkidle');

    // Step 1 -> 2
    await page.click('text="Continuar"');
    await page.waitForTimeout(500);

    // Fill Step 2
    await page.fill('input[placeholder="Ex: Manuel António da Silva Domingos"]', 'Joao Almeida');
    await page.fill('input[placeholder="Ex: 007294821LA042"]', '007294821LA042');
    // Date: YYYY-MM-DD
    await page.fill('input[type="date"]', '2000-01-01');
    await page.click('text="Continuar para Passo"');
    await page.waitForTimeout(500);

    // Fill Step 3
    await page.fill('input[placeholder="923 000 000"]', '923123456');
    await page.fill('input[placeholder="Ex: Viana, Bairro Capalanga, Rua Principal nº 24"]', 'Viana Luanda');
    await page.click('text="Continuar para Passo"');
    await page.waitForTimeout(1000);

    console.log("Made it to step 4!");
    const heading = await page.textContent('h2:has-text("Anexo de Documentos")');
    console.log("Heading found:", heading);

    console.log("Errors caught:");
    console.log(errors);
  } catch (e) {
    console.error("Script exception:", e);
    console.log("Errors caught before exception:");
    console.log(errors);
  } finally {
    await browser.close();
  }
})();
