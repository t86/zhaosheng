import { getShanghaiHighValueImportManifest, validateShanghaiHighValueImports } from "../lib/shanghai-high-value-imports";

const manifest = getShanghaiHighValueImportManifest();
const report = validateShanghaiHighValueImports();

console.log("Shanghai high-value import validation");
console.log("");

for (const dataset of report.datasets) {
  const entry = manifest.find((item) => item.id === dataset.id);
  console.log(`${dataset.title}: ${dataset.status}`);
  console.log(`  target: ${dataset.targetFile}`);
  console.log(`  records: ${dataset.recordCount}`);
  console.log(`  missing required fields: ${dataset.missingRequiredFieldCount}`);
  if (entry) {
    console.log(`  source: ${entry.sourceTitle}`);
  }
  console.log("");
}

if (report.datasets.some((dataset) => dataset.missingRequiredFieldCount > 0)) {
  console.error("Validation failed: some imported records are missing required fields.");
  process.exit(1);
}

console.log(`Command: ${report.command}`);
