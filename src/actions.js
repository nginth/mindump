const { getJournalEntry } = require("./journal");
const { saveEntry } = require("./db");
const {viewMenu} = require("./menus/viewMenu")

function newAction(db) {
  const date = Date.now();
  return async () => {
    const journalEntry = await getJournalEntry(date);
    if (journalEntry) {
      await saveEntry(db, journalEntry, date);
      return "Entry saved!";
    }
  };
}

function viewAction(db) {
  return async () => {
    await viewMenu(db);
  };
}

function exitAction(db) {
  return async () => {
    db.close();
    process.exit();
  };
}

module.exports = {
  newAction,
  viewAction,
  exitAction
};
