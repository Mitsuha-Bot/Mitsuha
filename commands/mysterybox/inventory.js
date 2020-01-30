const Discord = require("discord.js");
const bh = require("../../utils/boxhelper");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    db.query("SELECT * FROM cardowner WHERE user = ? ORDER BY cardid ASC", [message.author.id], async (error, result) => {
        if(result.length == 0) {
            let emb = new Discord.RichEmbed()
                .setTitle("Inventory - Ahsoka")
                .setDescription("You don't have Items!")
                .setFooter("Requested by " + message.author.tag,  message.author.avatarURL)
                .setTimestamp();
            return message.channel.send(emb);
        }
        let text = "";
        for (const i of result) {
            let item = await bh.getItem(i.cardid);
            text += item.name + " - `" + item.id + "`\n";
        }
        let emb = new Discord.RichEmbed()
            .setTitle("Inventory - Ahsoka")
            .setFooter("Requested by " + message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setDescription(text);
        message.channel.send(emb);
    })
};