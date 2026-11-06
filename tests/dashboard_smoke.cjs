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
console.log("PASS: dashboard syntax, controls, synthetic demo, print report, and 100-question registry.");
