const Discord = require("discord.js");
const db = require("../../utils/database.js");


module.exports.run = async (prefix, cmd, client, args, message, config) => {

    client.con = db
    let user = message.mentions.users.first();
    if (!user) {
        user = message.author
    }
    if (user.bot == true) {
        let emb = new Discord.RichEmbed()
            .setTitle("Coins - Ladybug")
            .setColor("#dd2b4e")
            .setDescription("Sorry I can't register Bots!")

        return message.channel.send(emb)
    }


    db.query("SELECT * FROM credits WHERE id = ? LIMIT 1;", [user.id], (error, result) => {

        if (result.length == 1) {
            let embed = new Discord.RichEmbed()
                .setTitle("Coins - Ladybug")
                .setColor("#dd2b4e")
                .setDescription(user.username + " currently has " + result[0].credits + " Coins")
            return message.channel.send(embed)
        } else {
            db.query("INSERT INTO credits(id, credits) VALUES(?, ?)", [user.id, 0])

            let embed1 = new Discord.RichEmbed()
                .setTitle("Coins - Ladybug")
                .setColor("#dd2b4e")
                .setDescription(user.username + " currently has 0 Coins")

            message.channel.send(embed1)
        }
    })
}