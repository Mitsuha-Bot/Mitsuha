const Discord = require("discord.js");
const db = require("../../utils/database.js");
const bh = require("../../utils/boxhelper");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    if(!args[0]){
        return message.channel.send("Please give the number of the item!")
    }
    let item = await bh.getItem(args[0]);
    if(item == "error"){
        return message.channel.send("Can't find that item!")
    }
    let own = await bh.checkOwnItem(args[0], message.author.id);
    if(own == false){
        return message.channel.send("You don't own this item!")
    }
    let back;
    if(item.type == "Mystical"){
        back = Math.round(item.price - 0.1 * item.price);
    } else {
        back = Math.round(item.price - 0.2 * item.price);
    }

    db.query("SELECT * FROM credits WHERE id = ?", [message.author.id], (e, r) =>{
        db.query("UPDATE credits SET credits = ? WHERE id = ?", [r[0].credits + back, message.author.id]);
        bh.removeItem(item, message.author.id);
        let emb = new Discord.RichEmbed()
            .setTitle("Sell - Ladybug")
            .setColor("#dd2b4e")
            .setFooter("Selled by " + message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setDescription("Selled " + item.name + " for " + back);
        message.channel.send(emb);
    })
};
