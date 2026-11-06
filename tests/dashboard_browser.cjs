// Browser acceptance tests: run with Playwright after serving repository root.
// Example: python -m http.server 8000 & BASE_URL=http://127.0.0.1:8000 node tests/dashboard_browser.cjs
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
(async () => {
  const browser = await chromium.launch({headless:true});
  const page = await browser.newPage({viewport:{width:375,height:812},acceptDownloads:true});
  const errors=[];
  const artifactDir=process.env.QA_ARTIFACT_DIR;
  if(artifactDir)fs.mkdirSync(artifactDir,{recursive:true});
  page.on("pageerror",e=>errors.push(e.message));
  page.on("dialog",d=>d.accept());
  const url=(process.env.BASE_URL||"http://127.0.0.1:8000")+"/dashboard/";
  try {
    const base=process.env.BASE_URL||"http://127.0.0.1:8000";
    for(const width of [320,375,768]){
      await page.setViewportSize({width,height:812});
      await page.goto(base+"/tools/",{waitUntil:"networkidle"});
      if(artifactDir)await page.screenshot({path:path.join(artifactDir,"tools-"+width+".png"),fullPage:true});
      const menu=page.locator(".goat-menu-btn");
      assert.equal(await menu.isVisible(),true,"mobile menu visible at "+width);
      await menu.click();
      assert.equal(await menu.getAttribute("aria-expanded"),"true");
      assert.equal(await page.locator("#goatMobileDrawer").isVisible(),true);
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"),"false");
      assert.equal(await page.locator("#goatMobileDrawer").getAttribute("inert"),"");
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),true,"horizontal overflow at "+width);
    }
    await page.setViewportSize({width:1280,height:800});
    await page.goto(base+"/tools/",{waitUntil:"networkidle"});
    assert.equal(await page.locator(".goat-menu-btn").isVisible(),false);
    assert.equal(await page.locator(".goat-desktop").isVisible(),true);
    if(artifactDir)await page.screenshot({path:path.join(artifactDir,"tools-desktop-1280.png"),fullPage:true});
    await page.setViewportSize({width:375,height:812});
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
    assert.match(await page.locator("#modeLabel").innerText(),/Classic dashboard/i);
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
    assert.match(await page.locator("#modeLabel").innerText(),/Classic dashboard/i);
    await page.goto((process.env.BASE_URL||"http://127.0.0.1:8000")+"/dashboard/decision-integrity.html",{waitUntil:"networkidle"});
    await page.locator("#sample").click();
    assert.match(await page.locator("#reportBody").innerText(),/SYNTHETIC DEMONSTRATION/);
    assert.equal(await page.locator("#reportBody table:first-of-type tbody tr").count(),3);
    assert.equal(await page.locator("#reportBody table:nth-of-type(2) tbody tr").count(),3);
    assert.equal(await page.locator("#relationshipMap g.mapNode").count(),3);
    await page.locator("#verifyRecord").selectOption("0");
    await page.locator("#verifyStatus").selectOption("primary-verified");
    await page.locator("#saveVerification").click();
    assert.match(await page.locator("#verifyMessage").innerText(),/required/);
    await page.locator("#verifyMethod").fill("Checked fictional primary document for demonstration only");
    await page.locator("#saveVerification").click();
    assert.match(await page.locator("#verificationSummary").innerText(),/Primary documents checked: 1/);
    await page.locator("#relationshipMap g.mapNode").first().click();
    assert.match(await page.locator("#mapDetail").innerText(),/SYNTHETIC-FUND-001/);
    const integrityDownload=page.waitForEvent("download");
    await page.locator("#export").click();
    assert.equal((await integrityDownload).suggestedFilename(),"goat-moat-decision-integrity-review.json");
    await page.locator("#clear").click();
    assert.equal(await page.locator("#reportBody table:first-of-type tbody tr").count(),0);
    assert.equal(await page.locator("#relationshipMap g.mapNode").count(),0);
    await page.locator("#party").fill("Fictional vendor and buyer");
    await page.locator("#facts").fill("Synthetic contract disclosure question");
    await page.locator("#add").click();
    assert.equal(await page.locator("#reportBody table:first-of-type tbody tr").count(),1);
    assert.equal(await page.locator("#relationshipMap g.mapNode").count(),1);
    await page.goto((process.env.BASE_URL||"http://127.0.0.1:8000")+"/tools/follow-the-money/",{waitUntil:"networkidle"});
    await page.locator("#sample").click();
    await page.locator("#shareSession").click();
    await page.goto((process.env.BASE_URL||"http://127.0.0.1:8000")+"/tools/influence-map/",{waitUntil:"networkidle"});
    await page.locator("#loadSession").click();
    assert.equal(await page.locator("#relationshipMap g.mapNode").count(),3);
    await page.goto((process.env.BASE_URL||"http://127.0.0.1:8000")+"/tools/evidence/",{waitUntil:"networkidle"});
    await page.locator("#loadSession").click();
    assert.match(await page.locator("#verificationSummary").innerText(),/Not resolved: 3/);
    await page.goto((process.env.BASE_URL||"http://127.0.0.1:8000")+"/tools/reports/",{waitUntil:"networkidle"});
    await page.locator("#loadSession").click();
    assert.equal(await page.locator("#reportBody table:first-of-type tbody tr").count(),3);
    // JSON export/import round trip remains compatible with the shared workspace.
    const jsonDownload=page.waitForEvent("download");
    await page.locator("#export").click();
    const exported=await jsonDownload;
    const filePath=await exported.path();
    assert.ok(filePath,"JSON export should be available");
    await page.locator("#clear").click();
    assert.equal(await page.locator("#reportBody table:first-of-type tbody tr").count(),0);
    await page.locator("#file").setInputFiles(filePath);
    await page.waitForFunction(()=>document.querySelectorAll("#reportBody table:first-of-type tbody tr").length===3 && document.querySelectorAll("#relationshipMap g.mapNode").length===3,null,{timeout:10000});
    assert.equal(await page.locator("#reportBody table:first-of-type tbody tr").count(),3);
    assert.equal(await page.locator("#relationshipMap g.mapNode").count(),3);
    await page.emulateMedia({media:"print"});
    if(artifactDir)await page.pdf({path:path.join(artifactDir,"decision-integrity-report.pdf"),format:"Letter",printBackground:true});
    assert.equal(await page.locator("#reportBody").isVisible(),true,"report visible in print mode");
    await page.emulateMedia({media:"screen"});
    if(artifactDir)await page.screenshot({path:path.join(artifactDir,"reports-mobile-375.png"),fullPage:true});
    await page.locator("#forgetSession").click();
    assert.match(await page.locator("#shareStatus").innerText(),/cleared/);
    assert.equal(errors.length,0,"Browser JavaScript errors: "+errors.join("; "));
    console.log("PASS: mobile browser flow, quick/full/classic, tour, sample, report, export, save/resume and reset.");
  } catch(e) {
    if(artifactDir){
      try{await page.screenshot({path:path.join(artifactDir,"failure.png"),fullPage:true});}catch(_){}
      try{fs.writeFileSync(path.join(artifactDir,"failure.txt"),String(e.stack||e)+"\nBrowser errors:\n"+errors.join("\n")+"\nURL: "+page.url()+"\n");}catch(_){}
    }
    throw e;
  } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
