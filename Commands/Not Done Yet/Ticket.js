    if(cmd === `${prefix}ticket`){
        
        try {
            let embed = new Discord.MessageEmbed()
                .setTitle(args)
                .setDescription("React to 📩 to create ticket!")
                .setColor('#20c9b0');
                
            message.channel.send(embed)
            db.add('Ticket' , 1)
            
            message.guild.channels.create(`Ticket ${db.get('Ticket')}`,{type: 'text'})
            
        } catch(err) {
            console.log(err);
        }
        
    }