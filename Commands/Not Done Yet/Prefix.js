    if(cmd === `${prefix}setprefix`){
        if(args = 0){
            message.channel.send("***You must actually put in a prefix you want to set !*** \nPrefix was reset to default: **l?**)")
            db.set('Prefix', { Prefix: `l?`})
        }else if(args = 1){
            db.set('Prefix', `${args[1]}`)
            const prembed = new Discord.MessageEmbed()
            .setTitle('<:LGNDdone:733772584918843463> Custom Prefix Succesfuly set ! <:LGNDdone:733772584918843463>')
            .addField('New prefix:' , db.get('Prefix.Prefix'));

            message.channel.send(prembed)
            
        }else if(args > 1){
            message.channel.send('You need to provide only one argument, no more, no less.')
        }
    }