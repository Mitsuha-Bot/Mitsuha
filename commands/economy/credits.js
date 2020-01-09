const Discord = require("discord.js");
const db = require("../../utils/database.js");


module.exports.run = async (prefix, cmd, client, args, message, config) => {

    client.con = db
    let user = message.mentions.users.first();
    if(!user) {user = message.author}
  

    db.query("SELECT * FROM credits WHERE id = ? LIMIT 1;", [user.id], (error, result) => {

        let embed = new Discord.RichEmbed()
        .setTitle("Credits - Ahsoka")
        .setDescription(user.username + " currently has " + result[0].credits + " Credits")

        if (result.length == 1) {
            return message.channel.send(embed)
        } else {
            db.query("INSERT INTO credits(id, credits) VALUES(?, ?)", [user.id, 0])

            let embed1 = new Discord.RichEmbed()
        .setTitle("Credits - Ahsoka")
        .setDescription(user.username + " currently has 0 Credits")

            message.channel.send(embed1)
        }
    })
}