const fs = require("fs");
const sqlite3 = require("sqlite3");

async function setupDb() {
  return new Promise(async (resolve, reject) => {
    try {
      await createDBDirIfNeeded();
    } catch (error) {
      reject(error);
    }

    const db = new sqlite3.Database("./db/mindump.db", async err => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      console.log("connected to mindump db");
    });

    try {
      await createTables(db);
      console.log("tables created");
      resolve(db);
    } catch (error) {
      return reject(error);
    }
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

async function createTables(db) {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS entries (
                    id INTEGER PRIMARY KEY,
                    text TEXT NOT NULL,
                    date INTEGER NOT NULL
                )`,
      error => {
        if (error) {
          return reject(error);
        }
        resolve(db);
      }
    );
  });
}

function saveEntry(db, $entry, $date) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO entries (text, date) VALUES ($entry, $date)`,
      {
        $entry,
        $date
      },
      error => {
        if (error) {
          return reject(error);
        }
        resolve();
      }
    );
  });
}

module.exports = {
  setupDb,
  saveEntry
};
