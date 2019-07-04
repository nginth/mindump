const fs = require("fs");
const sqlite3 = require("sqlite3");

const DB_PATH = "./db/mindump.db";

async function setupDb() {
  return new Promise(async (resolve, reject) => {
    try {
      await createDBDirIfNeeded();
    } catch (error) {
      reject(error);
    }

    const db = new sqlite3.Database(DB_PATH, async err => {
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
  return new Promise(createDBPromise);
}

function createDBPromise(resolve, reject) {
  fs.mkdir("./db", err => {
    if (err && err.code !== "EEXIST") {
      reject(err);
    }
    resolve();
  });
}

async function createTables(db) {
  const create = (resolve, reject) => createTablesPromise(resolve, reject, db);
  return new Promise(create);
}

function createTablesPromise(resolve, reject, db) {
  const CREATE_TABLES_STMT = `CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY,
    text TEXT NOT NULL,
    date INTEGER NOT NULL
)`;

  db.run(CREATE_TABLES_STMT, error => {
    if (error) {
      return reject(error);
    }
    resolve(db);
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

// reverse index - meaning 0 is the latest page, 1 is the second to latest
function getEntryByReverseIndex(db, index) {
  return new Promise((resolve, reject) => {
    const offset = index;
    db.all(
      `SELECT * FROM entries ORDER BY date DESC LIMIT 1 OFFSET ${offset}`,
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
}

module.exports = {
  setupDb,
  saveEntry,
  getEntryByReverseIndex
};
