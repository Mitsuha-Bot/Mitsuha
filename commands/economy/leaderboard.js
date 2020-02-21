const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    db.query("SELECT * FROM credits ORDER BY credits DESC LIMIT 10", [], async(err, results) => {
        let text = "";
        for (let r of results){
            user = await client.users.get(r.id)
            if (user) {
                text += user.tag + ": " + r.credits + "\n";
            } else {
                text += "Unknown#0000" + ": " + r.credits + "\n";
            }
        }
        let embed = new Discord.RichEmbed()
        .setTitle("Leaderboard - Mitsuha")
        .setColor("#dd2b4e")
        .setDescription(text)

        return message.channel.send(embed)
       })
}