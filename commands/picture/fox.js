const Discord = require("discord.js")
const axios = require("axios")

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let res = await axios.get("https://randomfox.ca/floof/");
    let pic = res.data.image

    let embed = new Discord.RichEmbed()

        .setTitle("Ahsoka - Fox Image")
        .setImage(pic)
        .setFooter("Powerd by randomfox.ca")

    return message.channel.send(embed)
}