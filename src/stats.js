const { prettyDate } = require("./date"); 

async function stats(db) {
    const numEntries = await getNumEntries(db);
    const lastEntry = await getLastEntry(db);
    return `Total entries: ${numEntries}\nLast entry: ${lastEntry}\n`
}

async function getNumEntries(db) {
    return new Promise((resolve, reject) => {
        db.get("SELECT count() as numEntries FROM entries", (error, result) => {
            if (error) {
                reject(error);
            }            
            resolve(result.numEntries)
        })
    })
}

async function getLastEntry(db) {
    return new Promise((resolve, reject) => {
        db.get("SELECT date FROM entries ORDER BY date DESC LIMIT 1", (error, result) => {
            if (error) {
                reject(error);
            }            
            resolve(prettyDate(result.date))
        })
    })    
}


module.exports = {
    stats
}