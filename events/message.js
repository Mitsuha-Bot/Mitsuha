const fs = require("fs");
const active = new Map();
const Discord = require("discord.js")


module.exports = async (client, message) => {
  if (message.author.bot) {
    return;
  }
  if (message.channel.type === "dm") {
    message.channel.send(`Hey! My name is **Mitsuha**\n I'm a Discord bot created by DieKatze#1784. I have much commands.`)
    return;

  }
  let db = client.con;



  let cooldown = new Set();
  let cdseconds = 5;
  let prefix = client.config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let rawArgs = messageArray
  let args = messageArray.slice(1);
  let author = message.author;
  let guild = message.guild;
  let hd = ["292588280304893952"]
  let d = ["224084384054116352"]
  let m = ["665567120892887041"]


  var ops = {
    active: active
  }

  db.query("SELECT * FROM `globalde` WHERE id = ?", [message.channel.id], async (error, result) => {
    if(result.length == 1) {
      db.query("SELECT * FROM globalban WHERE id = ?", [message.member.id], async (error, result) => {
        if(result.length == 1) {
          return message.channel.send("Sorry but you banned from the GlobalChat")
        } else {
          let a = rawArgs.join(" ")
      let embed = new Discord.RichEmbed()
      if(message.member.id == hd) {
        embed.setTitle("Head-Developer " + message.author.tag)
      } else if(message.member.id == d) {
        embed.setTitle("Developer " + message.author.tag)
      } else if(message.member.id == m) {
        embed.setTitle("Moderator ", message.author.tag)
      } else {
        embed.setTitle(message.author.tag)
      }
      embed.setDescription(a)
      .setThumbnail(message.author.avatarURL)
      .setFooter("Server: " + message.guild.name + " | " + message.guild.id, message.guild.iconURL)
      db.query("SELECT * FROM globalde", async (error, res) => {
        message.delete(1)
        res.forEach(channelidrow => {
        client.channels.find(channelid => channelid.id === channelidrow.id).send(embed);
          })
        })
        }
      })
    }
  })

  db.query("SELECT * FROM `globalen` WHERE id = ?", [message.channel.id], async (error, result) => {
    if(result.length == 1) {
      db.query("SELECT * FROM globalban WHERE id = ?", [message.member.id], async (error, result) => {
        if(result.length == 1) {
          return message.channel.send("Sorry but you banned from the GlobalChat")
        } else {
          let a = rawArgs.join(" ")
      let embed = new Discord.RichEmbed()
      if(message.member.id == hd) {
        embed.setTitle("Head-Developer " + message.author.tag)
      } else if(message.member.id == d) {
        embed.setTitle("Developer " + message.author.tag)
      } else if(message.member.id == m) {
        embed.setTitle("Moderator " + message.author.tag)
      } else {
        embed.setTitle(message.author.tag)
      }
      embed.setDescription(a)
      .setThumbnail(message.author.avatarURL)
      .setFooter("Server: " + message.guild.name + " | " + message.guild.id, message.guild.iconURL)
      db.query("SELECT * FROM globalen", async (error, res) => {
        message.delete(1)
        res.forEach(channelidrow => {
        client.channels.find(channelid => channelid.id === channelidrow.id).send(embed);
          })
        })
        }
      })
    }
  })

  if (!message.content.startsWith(prefix)) {
    return;
  }

  if(cooldown.has(message.author.id)) {
    let embed = new Discord.RichEmbed()
    .setDescription("Please wait 5 Seconds to excute a command!")
    return message.channel.send(embed)
  }

  //if(!message.author.id == 634076750980317217) {
    cooldown.add(message.author.id)
  //}


  if (message.content == `<@${client.user.id}>`) {
    let embed = new Discord.RichEmbed()
    .setTitle("Hey im Mitsuha!")
    .setDescription("My prefix is l+")

    return message.channel.send(embed)
  }

  let commandFile = client.commands.get(cmd.slice(prefix.length));
  if (commandFile) {
    commandFile[0].run(prefix, cmd, client, args, message, ops);
 }
 setTimeout(() =>{
   cooldown.delete(message.author.id)
 }, cdseconds * 1000)
};