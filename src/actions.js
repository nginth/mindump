const { getJournalEntry } = require("./journal");
const { saveEntry } = require("./db");

function newAction(db) {
  const date = Date.now();
  return async () => {
    const journalEntry = await getJournalEntry(date);
    if (journalEntry) {
      await saveEntry(db, journalEntry, date);
      console.log("entry saved");
    }
  };
}

function viewAction(db) {
  return async () => null;
}

function exitAction() {
  return async () => {
    process.exit();
  };
}

module.exports = {
  newAction,
  viewAction,
  exitAction
};
