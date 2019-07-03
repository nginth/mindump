const { terminal } = require("terminal-kit");

function getJournalEntry(date) {
  const header = `Journal entry ${niceDate(date)}\n`;
  return new Promise(resolve => {
    terminal.clear();
    terminal.noFormat(header);
    terminal.grabInput();

    let editable = 0;
    let fullEntry = [];

    terminal.on("key", (name, _, data) => {
      switch (name) {
        case "CTRL_C":
          return exit();
        case "CTRL_S":
          return save();
          break;
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

      terminal.clear();

      terminal.noFormat(header);
      terminal.noFormat(fullEntry.join(""));
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
      terminal.noFormat("Saving not implemented yet :(\n");
      resolve(fullEntry.join(""));
    }

    function exit() {
      terminal.grabInput(false);
      resolve(fullEntry.join(""));
    }
  });
}

function niceDate(date) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  return new Date(date).toLocaleString("default", options);
}

module.exports = {
  getJournalEntry
};
