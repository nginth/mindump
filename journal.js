const { terminal } = require("terminal-kit");

function getJournalEntry() {
  return new Promise(resolve => {
    terminal.clear();
    terminal.noFormat(`Journal entry ${Date.now()}`);
    terminal.grabInput();

    let editable = 0;
    let fullEntry = [];

    terminal.on("key", (name, _, data) => {
      switch (name) {
        case "CTRL_C":
          terminal.grabInput(false);
          resolve(fullEntry.join(""));
          return;
        case "CTRL_S":
          save();
          break;
        case " ":
          handleSpace(name);
          break;
        case "\n":
          handleNewline(name);
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

      terminal.clear();

      terminal.noFormat(fullEntry.join(""));
    });

    function handleSpace(name) {
      if (editable > 0) {
        editable = 0;
        fullEntry.push(name);
      }
    }

    function handleNewline() {
      if (fullEntry[fullEntry.length - 1] != "\n") {
        editable = 0;
        fullEntry.push(name);
      }
    }

    function save() {
      console.log("Saving not implemented yet :(");
      return;
    }
  });
}

module.exports = {
  getJournalEntry
};
