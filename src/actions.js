const { terminal } = require("terminal-kit");

const { getJournalEntry } = require("./journal");
const { saveEntry, getEntryByReverseIndex } = require("./db");
const { singleRowMenu } = require("./menu");
const { prettyDate } = require("./date");

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
    let viewingEntries = true;
    let index = 0;
    let menuIndex = 0;
    const actions = {
      Prev: () => (index = index > 0 ? index - 1 : 0),
      Next: () => (index = nextRecord ? index + 1 : index),
      Exit: () => (viewingEntries = false)
    };
    let entryRecord = await getEntryByReverseIndex(db, 0);
    let nextRecord = entryRecord;

    while (viewingEntries) {
      terminal.clear();
      terminal.noFormat(
        `Entry: ${prettyDate(entryRecord.date)}\n${
          entryRecord.text
        }\n\nPage: ${index}`
      );

      const { selectedText, selectedIndex } = await singleRowMenu(actions, {
        selectedIndex: menuIndex
      });
      actions[selectedText]();
      menuIndex = selectedIndex;

      nextRecord = await getEntryByReverseIndex(db, index);
      if (nextRecord) {
        entryRecord = nextRecord;
      } else {
        index -= 1;
      }
    }
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
