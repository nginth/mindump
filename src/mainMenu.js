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
    terminal.clear();
    const actionName = await singleColumnMenu(actions);

    await actions[actionName]();
  }
}

module.exports = {
  mainMenu
};
