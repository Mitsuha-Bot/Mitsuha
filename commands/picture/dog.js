const Discord = require("discord.js")
const axios = require("axios")

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let res = await axios.get("https://random.dog/woof.json");
    let pic = res.data.url

    let embed = new Discord.RichEmbed()

        .setTitle("Ahsoka - Dog Image")
        .setImage(pic)
        .setFooter("Powerd by random.dog")

    return message.channel.send(embed)
}