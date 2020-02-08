const Discord = require("discord.js")
const axios = require("axios")

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let res = await axios.get("http://aws.random.cat/meow");
    let pic = res.data.file

    let embed = new Discord.RichEmbed()

    .setTitle("Ladybug - Cat Image")
    .setColor("#dd2b4e")
    .setImage(pic)
    .setFooter("Powerd by random.cat")

    return message.channel.send(embed)
}