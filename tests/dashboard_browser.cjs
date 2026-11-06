// Browser acceptance tests: run with Playwright after serving repository root.
// Example: python -m http.server 8000 & BASE_URL=http://127.0.0.1:8000 node tests/dashboard_browser.cjs
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({headless:true});
  const page = await browser.newPage({viewport:{width:375,height:812},acceptDownloads:true});
  const errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  page.on("dialog",d=>d.accept());
  const url=(process.env.BASE_URL||"http://127.0.0.1:8000")+"/dashboard/";
  try {
    await page.goto(url,{waitUntil:"networkidle"});
    await page.locator("#startQuick").click();
    assert.match(await page.locator("#progressText").innerText(),/Question 1 of 12/);
    await page.locator("#skipQuestion").click();
    assert.match(await page.locator("#progressText").innerText(),/Question 2 of 12/);
    await page.locator("#switchMode").click();
    assert.match(await page.locator("#progressText").innerText(),/Question 1 of 100/);
    await page.locator("#goHome").click();
    await page.locator("#startTour").click();
    await page.locator("#tourClassic").click();
    assert.match(await page.locator("#modeLabel").innerText(),/Classic dashboard/);
    await page.locator("#goHome").click();
    await page.locator("#loadSample").click();
    assert.match(await page.locator("#count").innerText(),/80 \/ 100/);
    assert.match(await page.locator("#summaryContent").innerText(),/80 \/ 100/);
    assert.equal(await page.locator("#evidenceAppendix tbody tr").count(),80);
    const downloadPromise=page.waitForEvent("download");
    await page.locator("#export").click();
    const download=await downloadPromise;
    assert.equal(download.suggestedFilename(),"goat-moat-draft-assessment.json");
    await page.locator("#saveDevice").click();
    await page.reload({waitUntil:"networkidle"});
    assert.equal(await page.locator("#resumeDraft").isDisabled(),false);
    await page.locator("#resumeDraft").click();
    assert.match(await page.locator("#count").innerText(),/80 \/ 100/);
    await page.locator("#reset").click();
    assert.match(await page.locator("#count").innerText(),/0 \/ 100/);
    await page.locator("#goHome").click();
    await page.locator("#skipWizard").click();
    assert.match(await page.locator("#modeLabel").innerText(),/Classic dashboard/);
    assert.equal(errors.length,0,"Browser JavaScript errors: "+errors.join("; "));
    console.log("PASS: mobile browser flow, quick/full/classic, tour, sample, report, export, save/resume and reset.");
  } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
