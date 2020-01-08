const Discord = require("discord.js");

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let reward = 500;
    let db = client.con;
    let user = message.author
    let embed = new Discord.RichEmbed()
    .setTitle("Daily - Ahsoka")
    .setDescription("You have claimed your daily 500 Credits")

    let errorembed = new Discord.RichEmbed()
    .setTitle("Daily - Ahsoka")
    .setDescription("You have already claimed your daily reward!")

    db.query("SELECT * FROM `cooldowns` WHERE id = ? LIMIT 1", [user.id], async (error, result) => {
        if(!result[0]){
            let date = new Date();
            db.query("INSERT INTO `cooldowns` (id, date) VALUES (?, ?)", [user.id, date])

            db.query("SELECT * FROM credits WHERE id = ? LIMIT 1;", [user.id], (error, result) => {
                if(result.length == 0){

                    db.query("INSERT INTO credits(id, credits) VALUES(?, ?)", [user.id, reward])
                    message.channel.send(embed)
                } else {
                    db.query("UPDATE credits SET credits = ? WHERE id = ?", [500, user.id]);
                    message.channel.send(embed)
                }
            })
            
        } else {
            if((new Date() - result[0].date) >= 86400000) {
                db.query("UPDATE cooldowns SET date = ? WHERE = ?", [new Date(), user.id]);
                db.query("UPDATE credits SET credits = ? WHERE = ?", [reward, user.id]);
            } else {
                message.channel.send(errorembed)
            }
        }
    }
    )
}