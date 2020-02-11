let con = require("./database");
const fs = require("fs");
function strings(guild, strings) {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM lang WHERE guildid = ?", [guild.id], (err, result) => {
            let lang;
            if(!result[0]) {
                lang = "en_us"
                con.query("INSERT INTO lang (guildid, lang) VALUES (?,?)", [guild, lang]);
            } else {
                lang = result[0].lang;
            }
            let langFile = require("./../languages/" + lang + ".json")
            resolve(langFile[strings])
        })
    });
}
module.exports = strings