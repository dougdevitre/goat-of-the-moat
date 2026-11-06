// Dependency-free smoke checks for the static evaluation UI.
// Run: node tests/dashboard_smoke.cjs
const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const html=fs.readFileSync("dashboard/index.html","utf8");
const script=html.match(/<script>([\s\S]*?)<\/script>/);
assert(script,"inline application script exists");
new vm.Script(script[1],{filename:"dashboard/index.html"});
for(const id of ["startQuick","startFull","skipWizard","startTour","tourQuick","tourClassic","closeTour","tourFromWorkspace","loadSample","printReport","phase8","saveDevice","resumeDraft","export","importDraft","question","scoreGuide","scoreLevels","evidenceHelp","coverageGate","reportSummary","summaryContent","reportDimensions","dimensionComparison","reportAppendix","evidenceAppendix"]){
 assert(html.includes('id="'+id+'"'),"missing control "+id);
}
assert(html.includes("function phaseEight("),"Phase VIII executive intelligence present");
assert(html.includes("function loadSyntheticSample("),"sample dataset generator present");
assert(html.includes("SYNTHETIC-EXAMPLE-"),"sample evidence clearly synthetic");
assert(html.includes("@media print"),"print styles present");
assert(html.includes("prefers-reduced-motion"),"reduced motion support");
assert(html.includes('role="progressbar"'),"accessible progress bar");
assert(html.includes('<fieldset'),"semantic rating group");
assert(html.includes('class="skiplink"'),"skip to main content");
assert(html.includes("function showTour()"),"optional onboarding guide");
assert(html.includes("window.print()"),"print report action wired");
assert(html.includes("function renderReport("),"report renderer exists");
assert(html.includes("size:letter"),"US Letter print page");
assert(html.includes("Evidence reference"),"evidence appendix column exists");
assert(html.includes('mode==="quick"'),"quick assessment remains");
assert(html.includes('mode==="classic"'),"skip wizard remains");
assert(!html.includes('fetch("/api/'),"no backend endpoint");
const dims=JSON.parse(fs.readFileSync("data/dimensions.json","utf8"));
const registry=JSON.parse(fs.readFileSync("data/questions.v0.1.json","utf8"));
assert.equal(dims.length,12);
assert.equal(registry.questions.length,100);
assert.equal(new Set(registry.questions.map(q=>q.id)).size,100);
assert.equal(dims.reduce((n,d)=>n+d.weight,0),1000);
for(const d of dims)assert.equal(registry.questions.filter(q=>q.dimension_id===d.id).length,d.questions);
const integrity=fs.readFileSync("dashboard/decision-integrity.html","utf8");
const integrityJs=fs.readFileSync("assets/decision-integrity.js","utf8");
const integrityCss=fs.readFileSync("assets/decision-integrity.css","utf8");
new vm.Script(integrityJs,{filename:"assets/decision-integrity.js"});
assert(integrity.includes('/assets/decision-integrity.js'),"shared application script included");
assert(integrity.includes('/assets/decision-integrity.css'),"shared workspace styles included");
for(const id of ["subject","decision","purpose","alternatives","category","party","amount","state","facts","source","sourceDate","counter","reward","outcomes","metrics","gaps","entries","reportBody","relationshipMap","mapDetail","verifyRecord","verifyStatus","saveVerification","requestChecklist","add","export","import","print","sample","clear"])assert(integrity.includes('id="'+id+'"'),"missing integrity control "+id);
assert(html.includes("/dashboard/decision-integrity.html"),"main dashboard links integrity review");
assert(integrityJs.includes('schema_version:"decision-integrity-1.0"'),"independent review export schema");
assert(integrity.includes("A financial relationship does not by itself establish wrongdoing"),"neutrality warning");
assert(integrityJs.includes("window.print()"),"integrity print action");
assert(integrityJs.includes("function renderMap()"),"interactive relationship map");
assert(integrityJs.includes("function showMapDetail("),"evidence drilldown");
assert(!integrityJs.includes("localStorage"),"no automatic persistent storage");
assert(integrityJs.includes("sessionStorage.setItem(sharedKey"),"explicit session sharing");
assert(!integrityJs.includes("fetch("),"no server submission");
const nav=fs.readFileSync("assets/site.js","utf8");
new vm.Script(nav,{filename:"assets/site.js"});
assert(nav.includes("aria-expanded"),"mobile menu expanded state");
assert(nav.includes("Escape"),"keyboard dismissal");
assert(nav.includes("goatMobileDrawer"),"mobile drawer");
assert(fs.readFileSync("assets/brand/crest.svg","utf8").includes("<svg"),"brand crest exists");
for(const path of ["index.html","tools/index.html","tools/assessment/index.html","tools/follow-the-money/index.html","tools/influence-map/index.html","tools/evidence/index.html","tools/decision-integrity/index.html","tools/reports/index.html","methodology/index.html","ethics/index.html","help/index.html"]){const page=fs.readFileSync(path,"utf8");assert(page.includes("/assets/site.js"),"shared navigation missing "+path);assert(page.includes("/assets/brand/crest.svg"),"brand icon missing "+path)}
for(const path of ["tools/follow-the-money/index.html","tools/influence-map/index.html","tools/evidence/index.html","tools/decision-integrity/index.html","tools/reports/index.html"]){const page=fs.readFileSync(path,"utf8");assert(page.includes('id="shareSession"'),"missing explicit sharing "+path);assert(page.includes('id="loadSession"'),"missing shared load "+path);assert(page.includes('id="reportBody"'),"missing functional report "+path);assert(page.includes('id="relationshipMap"'),"missing interactive map "+path);assert(page.includes('id="verifyRecord"'),"missing verification "+path);assert(page.includes('/assets/decision-integrity.js'),"shared app missing "+path);assert(page.includes('/assets/decision-integrity.css'),"shared CSS missing "+path);const inline=page.split("<script>").slice(1).map(x=>x.split("</script>")[0]);for(const block of inline)new vm.Script(block,{filename:path})}
assert(html.includes("/assets/site.js"),"evaluation navigation integrated");
assert(integrity.includes("/assets/site.js"),"integrity navigation integrated");
console.log("PASS: dashboard, integrity, branded pages, mobile navigation and 100-question registry.");
