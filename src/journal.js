const { terminal } = require("terminal-kit");

const { prettyDate } = require("./date");

function getJournalEntry(date) {
  const header = `Journal entry ${prettyDate(date)}\n`;
  terminal.clear();
  terminal.hideCursor();
  return new Promise(resolve => {
    let editable = 0;
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
            if (editable > 0) {
              fullEntry.pop();
              editable -= 1;
            }
            break;
          default:
            if (!data.isCharacter) return;
            fullEntry.push(name);
            editable += 1;
        }

        terminalPrompt();
      }
    });

    function handleSpace(name) {
      if (editable > 0) {
        editable = 0;
        fullEntry.push(name);
      }
    }

    function handleNewline(name) {
      if (fullEntry[fullEntry.length - 1] != "\n") {
        editable = 0;
        fullEntry.push(name);
      }
    }

    function save() {
      terminal.grabInput(false);
      terminal.off("key", "journalKey");
      resolve(fullEntry.join(""));
    }

    function terminalPrompt() {
      terminal.noFormat(header);
      terminal.noFormat(fullEntry.join(""));
      terminal.noFormat("\n\n Save: CTRL-S \n Exit: CTRL-C");
    }
  });
}

module.exports = {
  getJournalEntry
};
