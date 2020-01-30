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
     * Gets an item by itemid
     * @param {string} item The item ID
     * @return {Promise<Object>}
     * @static
     */
    static getItem(item){
        return new Promise(function (resolve, reject) {
            db.query("SELECT * FROM items WHERE id = ?", [item], (e, r) => {
                resolve(r[0]);
            })
        })
    }
}

module.exports = BoxHelper;