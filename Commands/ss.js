const Discord = require('discord.js')
const ss = new Discord.MessageEmbed();
const db = require('quick.db')

module.exports = {
    name: 'ss',
    description: "Set current bot status, available only for bot administration team.",
    usage: "ss (STATUS)",
    execute(message, args, bot){
        if(message.author.id === `428984613935775765` || message.author.id === `484448041609199620`){
            if(args.length){
                if(message.deletable) message.delete()
                
                let IDK = args.join(" ")
                db.set('Status', { status: IDK })
                bot.user.setActivity(`${IDK}`)
                ss.setTitle("<:LGNDdone:733772584918843463> Activity Set <:LGNDdone:733772584918843463>")
                ss.addField(
                    `Succesfully set Activity`, IDK 
                );
                

                console.log(`${message.author.username} set status : ${IDK}`)

                message.channel.send(ss);
                ss.fields = [];
            }else {
                db.set('Status', { status: "Made by: aragocz#8496 | l?" })
            }
        }else{
            message.reply("`Only Bot owners can change it's status!`")
        }
    }
}