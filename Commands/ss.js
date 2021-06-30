const Discord = require('discord.js')
const ss = new Discord.MessageEmbed();
const mysql = require('mysql')

const host = process.env.host;
const user = process.env.user;
const password = process.env.pass;
const database = "heroku_19e5a3a858bbdc1";

const pdb = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
})

module.exports = {
    name: 'ss',
    description: "Set current bot status, available only for bot administration team.",
    usage: "ss (STATUS)",
    execute(message, args, bot){
        if(message.author.id === `428984613935775765`){
            if(args.length){
                if(message.deletable) message.delete()
                
                let IDK = args.join(" ")
                pdb.query("UPDATE bot SET status = \"" + IDK + "\" WHERE id = 1")
                bot.user.setActivity(IDK)
                ss.setTitle("<:LGNDdone:733772584918843463> Activity Set <:LGNDdone:733772584918843463>")
                ss.addField(
                    `Succesfully set Activity`, IDK 
                );
                

                console.log(`${message.author.username} set status : ${IDK}`)

                message.channel.send(ss);
                ss.fields = [];
            }else {
                pdb.query("UPDATE bot SET status = \"Made By : aragocz#8496 | l?\" WHERE id = 1")
                bot.user.setActivity(IDK)
            }
        }else{
            message.reply("`Only Bot owners can change it's status!`")
        }
    }
}
