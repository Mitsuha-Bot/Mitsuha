const Discord = require("discord.js")
const axios = require("axios")

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let res = await axios.get("https://randomfox.ca/floof/");
    let pic = res.data.image

    let embed = new Discord.RichEmbed()

        .setTitle("Ladybug - Fox Image")
        .setColor("#dd2b4e")
        .setImage(pic)
        .setFooter("Powerd by randomfox.ca")

    return message.channel.send(embed)
}