const fs = require("fs");
const sqlite3 = require("sqlite3");

const { getJournalEntry } = require("./journal");

mindump();

async function mindump() {
  let db;
  try {
    db = await setupDb();
  } catch (error) {
    console.error(`exiting with error: ${error}`);
    process.exit(1);
  }

  const journalEntry = await getJournalEntry();
  console.log(`\nFinal journal entry: ${journalEntry}`);
}

async function setupDb() {
  await createDBDirIfNeeded();
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./db/mindump.db", err => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("connected to mindump db");
      resolve(db);
    });
  });
}

async function createDBDirIfNeeded() {
  return new Promise((resolve, reject) => {
    fs.mkdir("./db", err => {
      if (err && err.code !== "EEXIST") {
        reject(err);
      }
      resolve();
    });
  });
}
