const { getJournalEntry } = require("./journal");

mindump();

async function mindump() {
  const journalEntry = await getJournalEntry();
  console.log(`\nFinal journal entry: ${journalEntry}`);
}
