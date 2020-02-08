const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    let user = message.author
    db.query("SELECT * FROM credits WHERE id = ? LIMIT 1;", [user.id], (error, result) => {
        if(result.length == 0 ) {
            let start = 0
            db.query("INSERT INTO credits(id, credits) VALUES(?, ?)", [user.id, start])
            let embed = new Discord.RichEmbed()
            .setTitle("Slot - Ladybug")
            .setColor("#dd2b4e")
            .setDescription("You don't have enough Coins!")
            message.channel.send(embed)
        } else {
            if(result[0].credits < 10) {
                let emb = new Discord.RichEmbed()
            .setTitle("Slot - Ladybug")
            .setColor("#dd2b4e")
            .setDescription("You don't have enough Coins!")
            message.channel.send(emb)
            } else {
                let entry = 15
                db.query("UPDATE credits SET credits = ? WHERE id = ?", [result[0]["credits"] - entry, user.id]);
                pslots()
            }
        }
    })
    function pslots() {
        let slots = ["🍎","🍎","🍎","🍎","🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎",  "🍌", "🍌", "🍌", "🍌", "💰", "💰", "💰", "💎"];
        let result1 = slots[Math.floor((Math.random() * slots.length))];
        let result2 = slots[Math.floor((Math.random() * slots.length))];
        let result3 = slots[Math.floor((Math.random() * slots.length))];

        if(result1 == result2 && result1 == result3) {
            if (result1 == "🍎") {
                addApple()
            }
            if(result1 == "🍌") {
                addBannana()
            }
            if(result1 == "💰") {
                addGeldbag()
            }
            if(result1 == "💎") {
                addJackpot()
            }
        } else {
            let lose = new Discord.RichEmbed()
            .setTitle("Slot")
            .setColor("#dd2b4e")
            .setDescription("You lose 15 Credits!")
            .addField("Result", result1 + result2 + result3)
            message.channel.send(lose)
        }
    }
    function addApple() {
        db.query("SELECT * FROM credits WHERE id = ? LIMIT 1;", [user.id], (error, result) => {
            let appel = 40
            db.query("UPDATE credits SET credits = ? WHERE id = ?", [result[0]["credits"] + appel, user.id]);
            let ap = new Discord.RichEmbed()
            .setTitle("Slot")
            .setColor("#dd2b4e")
            .setDescription("Yay! You won 40 Credits!")
            .addField("Result", "🍎🍎🍎")
            message.channel.send(ap)
        })
    }
    function addBannana() {
        db.query("SELECT * FROM credits WHERE id = ? LIMIT 1;", [user.id], (error, result) => {
            let bann = 100
            db.query("UPDATE credits SET credits = ? WHERE id = ?", [result[0]["credits"] + bann, user.id]);
            let ban = new Discord.RichEmbed()
            .setTitle("Slot")
            .setColor("#dd2b4e")
            .setDescription("Yay! You won 100 Credits!")
            .addField("Result", "🍌🍌🍌")
            message.channel.send(ban)
        })
    }
    function addGeldbag() {
        db.query("SELECT * FROM credits WHERE id = ? LIMIT 1;", [user.id], (error, result) => {
            let geld = 750
            db.query("UPDATE credits SET credits = ? WHERE id = ?", [result[0]["credits"] + geld, user.id]);
            let gel = new Discord.RichEmbed()
            .setTitle("Slot")
            .setColor("#dd2b4e")
            .setDescription("Yay! You won 750 Credits!")
            .addField("Result", "💰💰💰")
            message.channel.send(gel)
        })
    }
    function addJackpot() {
        db.query("SELECT * FROM credits WHERE id = ? LIMIT 1;", [user.id], (error, result) => {
            let jackpot = 1100
            db.query("UPDATE credits SET credits = ? WHERE id = ?", [result[0]["credits"] + jackpot, user.id]);
            let jack = new Discord.RichEmbed()
            .setTitle("Slot")
            .setColor("#dd2b4e")
            .setDescription("Yay! You won 1100 Credits!")
            .addField("Result", "💎💎💎")
            message.channel.send(jack)
        })
    }
}