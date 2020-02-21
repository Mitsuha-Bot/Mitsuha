const Discord = require("discord.js");
const db = require("../../utils/database.js");
const bh = require("../../utils/boxhelper");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    if(!args[0]){
        return message.channel.send(await client.string(message.guild.id, "sell.number"))
    }
    let item = await bh.getItem(args[0]);
    if(item == "error"){
        return message.channel.send(await client.string(message.guild.id, "sell.erroritem"))
    }
    let own = await bh.checkOwnItem(args[0], message.author.id);
    if(own == false){
        return message.channel.send(await client.string(message.guild.id, "sell.noitem"))
    }
    let back;
    if(item.type == "Mystical"){
        back = Math.round(item.price - 0.1 * item.price);
    } else {
        back = Math.round(item.price - 0.2 * item.price);
    }

    db.query("SELECT * FROM credits WHERE id = ?", [message.author.id], async (e, r) =>{
        db.query("UPDATE credits SET credits = ? WHERE id = ?", [r[0].credits + back, message.author.id]);
        bh.removeItem(item, message.author.id);
        let emb = new Discord.RichEmbed()
            .setTitle("Sell - Mitsuha")
            .setColor("#dd2b4e")
            .setFooter(await client.string(message.guild.id, "sell.by") + message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setDescription(await client.string(message.guild.id, "sell.selled") + item.name + await client.string(message.guild.id, "sell.for") + back);
        message.channel.send(emb);
    })
};
