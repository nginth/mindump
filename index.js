const { mainMenu } = require("./src/mainMenu");
const { setupDb } = require("./src/db");
const { setupKeyEvents } = require("./src/events");

mindump();

async function mindump() {
  let db;
  try {
    db = await setupDb();
    setupKeyEvents();
    await mainMenu(db);
  } catch (error) {
    console.error(`exiting with error: ${error}`);
    if (db) db.close();
    process.exit(1);
  } finally {
    if (db) db.close();
  }
}
