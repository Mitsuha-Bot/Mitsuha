const Discord = require("discord.js");
const bh = require("../../utils/boxhelper");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    let site = args[0] ? args[0] : 1;
    db.query("SELECT * FROM cardowner WHERE user = ? ORDER BY cardid ASC", [message.author.id], async (error, result) => {
        if(result.length == 0) {
            let emb = new Discord.RichEmbed()
                .setTitle(await client.string(message.guild.id, "inventory.title"))
                .setColor("#dd2b4e")
                .setDescription(await client.string(message.guild.id, "inventory.noitems"))
                .setFooter("Requested by " + message.author.tag,  message.author.avatarURL)
                .setTimestamp();
            return message.channel.send(emb);
        }
        let text = "";
        if(site > Math.ceil(result.length / 20)) {
            text = await client.string(message.guild.id, "inventory.nothing")
        } else {
            let limit = site * 20 > result.length ? result.length - 1 : site * 20;
            for (let i = 1 + ((site - 1) * 20); i <= limit; i++) {
                let item = await bh.getItem(result[i].cardid);
                text += item.name + " (" + (item.type).charAt(0) + ")" + " - `" + item.id + "`\n";
            }
        }
        let emb = new Discord.RichEmbed()
            .setTitle(await client.string(message.guild.id, "inventory.title"))
            .setColor("#dd2b4e")
            .setFooter("Site " + site + "/" + Math.ceil(result.length / 20) + " •" + await client.string(message.guild.id, "buybox.footer") + message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setDescription(text);
        message.channel.send(emb);
    })
};