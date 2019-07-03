const { showMenu } = require("./src/menu");
const { setupDb } = require("./src/db");
const { newAction, viewAction, exitAction } = require("./src/actions");

mindump();

async function mindump() {
  let db;
  try {
    db = await setupDb();

    const items = ["New", "View", "Exit"];
    const actions = [newAction(db), viewAction(db), exitAction()];

    while (true) {
      const index = await showMenu(items);

      await actions[index]();
    }
  } catch (error) {
    console.error(`exiting with error: ${error}`);
    process.exit(1);
  } finally {
    if (db) db.close();
  }
}
