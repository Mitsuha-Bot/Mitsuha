const Discord = require("discord.js");

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let reward = 750;
    let db = client.con;
    let user = message.author
    let embed = new Discord.RichEmbed()
    .setTitle("Weekly - Ladybug")
    .setColor("#dd2b4e")
    .setDescription("You have claimed your weekly 750 Coins")
    
    let errorembed = new Discord.RichEmbed()
    .setTitle("Weekly - Ladybug")
    .setColor("#dd2b4e")
    .setDescription("You have already claimed your weekly reward!")
    db.query("SELECT * FROM `cooldownsweekly` WHERE id = ? LIMIT 1", [user.id], async (error, result) => {
        if(!result[0]){
            let date = new Date();
            db.query("INSERT INTO `cooldownsweekly` (id, date) VALUES (?, ?)", [user.id, date])
            db.query("SELECT * FROM credits WHERE id = ? LIMIT 1;", [user.id], (error, result) => {
                if(result.length == 0){

                    db.query("INSERT INTO credits(id, credits) VALUES(?, ?)", [user.id, reward])
                    message.channel.send(embed)
                } else {
                    db.query("SELECT * FROM credits WHERE id = ? LIMIT 1;", [user.id], (error, result) => {
                    db.query("UPDATE credits SET credits = ? WHERE id = ?", [result[0]["credits"] + reward, user.id]);
                    message.channel.send(embed)
                    })
                }
            })
            
        } else {
            if((new Date() - result[0].date) >= 604800000) {
                db.query("SELECT * FROM credits WHERE id = ? LIMIT 1;", [user.id], (error, result) => {
                db.query("UPDATE cooldownsweekly SET date = ? WHERE id = ?", [new Date(), user.id]);
                db.query("UPDATE credits SET credits = ? WHERE id = ?", [result[0]["credits"] + reward, user.id]);
                message.channel.send(embed)
                })

            } else {
                message.channel.send(errorembed)
            }
        }
    }
    )
}