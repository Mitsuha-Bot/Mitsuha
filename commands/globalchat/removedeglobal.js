const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    db.query("SELETC * FROM globalde WHERE guildid = ?", [message.guild.id], async (error, result) => {
        if(result.length == 0) {
            return message.channel.send("Globalchannel has not been set!")
        } else {
            db.query("DELETE FROM globalde WHERE guildid = ?", [message.guild.id])
            return message.channel.send("Globalchannel has been removed!")
        }
    })
}