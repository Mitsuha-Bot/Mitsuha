function string(guild, string) {
    return new Promise(function(resolve, reject) {
        db.client.con("SELECT * FROM `guild` WHERE `guild` = ?", [guild.id], (err, results) => {
            if(!results[0]) {
                let lang = "en_us";
                db.client.con("INSERT INTO `guilds_settings`(`guild`, `language`) VALUES (?,?)", [guild.id, lang]);
                let langFile = require("../languages/" + lang + ".json");
                if(!langFile[string]) {
                    resolve("[String not found: " + string + "]");
                } else {
                    resolve(langFile[string]);
                }
            } else {
                let lang = results[0].language;
                let langFile = require("../languages/" + lang + ".json");
                if(langFile[string]) {
                    resolve(langFile[string]);
                } else {
                    lang = "en_us";
                    langFile = require("../languages/" + lang + ".json");
                    if(langFile[string]) {
                        resolve(langFile[string]);
                    } else {
                        resolve("[String not found: " + string + "]");
                    }
                }
            }
        });
    });
}