const { terminal } = require("terminal-kit");

const { singleColumnMenu } = require("./menu");
const { newAction, viewAction, exitAction } = require("./actions");

async function mainMenu(db) {
  const actions = {
    New: newAction(db),
    View: viewAction(db),
    Exit: exitAction(db)
  };

  while (true) {
    const { selectedText } = await singleColumnMenu(actions);

    const result = await actions[selectedText]();
    terminal.clear();
    if (result) terminal.noFormat(result);
  }
}

module.exports = {
  mainMenu
};
