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
    const actionName = await singleColumnMenu(actions);

    const result = await actions[actionName]();
    terminal.clear();
    if (result) terminal.noFormat(result);
  }
}

module.exports = {
  mainMenu
};
