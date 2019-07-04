const { terminal } = require("terminal-kit");

const { prettyDate } = require("./date");

function getJournalEntry(date) {
  terminal.clear();
  terminal.hideCursor();
  return new Promise(resolve => {
    let pastEditableChars = 0;
    let fullEntry = [];

    terminalPrompt();
    terminal.grabInput();

    terminal.on("key", {
      id: "journalKey",
      fn: (name, _, data) => {
        terminal.clear();

        switch (name) {
          case "CTRL_S":
            return save(fullEntry);
          case " ":
            handleSpace(name);
            break;
          case "ENTER":
            handleNewline("\n");
            break;
          case "BACKSPACE":
            if (pastEditableChars > 0) {
              fullEntry.pop();
              pastEditableChars -= 1;
            }
            break;
          default:
            if (!data.isCharacter) return;
            fullEntry.push(name);
            pastEditableChars += 1;
        }

        terminalPrompt();
      }
    });

    function handleSpace(name) {
      if (pastEditableChars > 0) {
        pastEditableChars = 0;
        fullEntry.push(name);
      }
    }

    function handleNewline(name) {
      if (fullEntry[fullEntry.length - 1] != "\n") {
        pastEditableChars = 0;
        fullEntry.push(name);
      }
    }

    function save() {
      terminal.grabInput(false);
      terminal.off("key", "journalKey");
      resolve(fullEntry.join(""));
    }

    function terminalPrompt() {
      terminal.noFormat(`Journal entry ${prettyDate(date)}\n\n`);
      terminal.noFormat(fullEntry.join(""));
      terminal.noFormat("\n\n Save: CTRL-S \n Exit: CTRL-C");
    }
  });
}

module.exports = {
  getJournalEntry
};
