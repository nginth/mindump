const { mainMenu } = require("./src/mainMenu");
const { setupDb } = require("./src/db");

mindump();

async function mindump() {
  let db;
  try {
    db = await setupDb();

    await mainMenu(db);
  } catch (error) {
    console.error(`exiting with error: ${error}`);
    process.exit(1);
  } finally {
    if (db) db.close();
  }
}
