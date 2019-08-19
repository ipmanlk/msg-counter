const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/info.db');

// save new users for the first time
const save = (guildId, authorId, username, month, count) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO usermessage VALUES(?,?,?,?,?)`;

        db.run(sql, [authorId, guildId, month, count, username], function (err) {
            if (err) {
                reject(err.message);
            }
            console.log("New record added!.");
            resolve(true);
        });
    });
}

// check user already has a record
const check = (guildId, authorId, month) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT count FROM usermessage WHERE author_id=? AND guild_id=? AND month=?`;
        db.get(sql, [authorId, guildId, month], (err, row) => {
            if (err) {
                reject(err.message);
            }
            if (row == undefined) {
                resolve(0);
            } else {                
                resolve(row.count);
            }
        });
    });
}

// update exsiting msg counts
const update = (guildId, authorId, username, month, count) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE usermessage SET count=?, username=? WHERE author_id=? AND guild_id=? AND month=?`;

        db.run(sql, [count, username, authorId, guildId, month], function (err) {
            if (err) {
                reject(err.message);
            }
            console.log("Record updated!.");
            resolve(true);
        });
    });
}

// get top members (all time)
const getTop = (guildId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT username, count FROM usermessage WHERE guild_Id = ? ORDER BY count DESC LIMIT 10`;

        db.all(sql, [guildId], function (err, rows) {
            if (err) {
                reject(err.message);
            }
            resolve(rows);
        });
    });
}

// get top memebers in specific month
const getTopM = (guildId, month) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT username, count FROM usermessage WHERE guild_Id = ?, month = ? ORDER BY count DESC LIMIT 10`;

        db.all(sql, [guildId, month], function (err, rows) {
            if (err) {
                reject(err.message);
            }
            resolve(rows);
        });
    });
}


module.exports = {
    save, check, update, getTop, getTopM
}