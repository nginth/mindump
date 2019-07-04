const { terminal } = require("terminal-kit")

const { getEntryByReverseIndex } = require("../db");
const { singleRowMenu } = require("./menu");
const { prettyDate } = require("../date");

async function viewMenu(db) {
    let viewingEntries = true;
    let index = 0;
    let savedMenuIndex = 0;
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
        selectedIndex: savedMenuIndex
      });
      actions[selectedText]();
      savedMenuIndex = selectedIndex;
      
      nextRecord = await getEntryByReverseIndex(db, index);
      if (nextRecord) {
        entryRecord = nextRecord;
      } else {
        index -= 1;
      }
    }
}


module.exports = {
    viewMenu
}