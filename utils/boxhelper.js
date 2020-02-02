const db = require("./database");
const Discord = require('discord.js');
class BoxHelper {
    /**
     * Adds Item to Inventory
     * @param item The Item
     * @param {Discord.Snowflake} owner The ID of the card owner
     * @static
     */
    static addItem(item, owner) {
        db.query("UPDATE items SET owner = ? WHERE id = ?", [item.owner + 1, item.id]);
        db.query("INSERT INTO cardowner (user, cardid) VALUES (?, ?)", [owner, item.id]);
    }

    /**
     * Remove Item from Inventory
     * @param item The Item
     * @param {Discord.Snowflake} owner The ID of the card owner
     * @static
     */
    static removeItem(item, owner) {
        db.query("UPDATE items SET owner = ? WHERE id = ?", [item.owner - 1, item.id]);
        db.query("DELETE FROM cardowner WHERE user = ? AND cardid = ? LIMIT 1", [owner, item.id]);
    }

    /**
     * Gets an item by itemid
     * @param {string} item The item ID
     * @return {Promise<Object>}
     * @static
     */
    static getItem(item){
        return new Promise(function (resolve, reject) {
            db.query("SELECT * FROM items WHERE id = ?", [item], (e, r) => {
                if(!r[0]) return resolve("error");
                resolve(r[0]);
            })
        })
    }

    /**
     * Check if the Person own the Item
     * @param {string} item The item ID
     * @param {Discord.Snowflake} owner The Owner Snowflake
     * @return {Promise<Boolean>}
     * @static
     */
    static checkOwnItem(item, owner){
        return new Promise(function (resolve, reject) {
            db.query("SELECT * FROM cardowner WHERE cardid = ? AND user = ?", [item, owner], (e, r) => {
                if(!r[0]) return resolve(false);
                resolve(true);
            })
        })
    }
}

module.exports = BoxHelper;