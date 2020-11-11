const Discord = require('discord.js')
const ss = new Discord.MessageEmbed();

module.exports = {
    name: 'ss',
    description: "SetStatus",
    execute(message, args, bot){
        if(message.author.id === `428984613935775765`){
            if(message.deletable) message.delete()
            
            let IDK = args.join(" ")
            bot.user.setActivity(`${IDK}`)
            ss.setTitle("<:LGNDdone:733772584918843463> Activity Set <:LGNDdone:733772584918843463>")
            ss.addField(
                `Succesfully set Activity`, IDK 
            );
            

            console.log(`Status set : ${IDK}`)

            message.channel.send(ss);
        }else{
            message.reply("`Only Bot owner can change it's status!`")
        }
    }
}