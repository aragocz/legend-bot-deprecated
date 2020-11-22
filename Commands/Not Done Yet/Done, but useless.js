if(cmd === `${prefix}dbget`){
        let afk = db.get(`afk_${message.author.id}.afk`)
        let content = db.get(`test_${message.author.id}.afkstatus`)
        if(afk === 'afk'){
            message.channel.send(content).then(m => m.delete({timeout: 60000}))
        }else if(afk === 'notafk'){
            message.channel.send('Not AFK')
        }else {
            const adalbert = '484448041609199620'
            const furuhashi = '428984613935775765'
            const furuhashicontact = bot.users.cache.get(furuhashi)
            const adalbertcontact = bot.users.cache.get(adalbert)
            message.reply(`Error, A-T should be here shortly. Thank you for your patience \n-Furuhashi`)
            furuhashicontact.send(`Fatal error at **${message.guild.name}** in channel **${message.channel}**`)
            //adalbertcontact.send(`Fatal error at **${message.guild.name}** in channel **${message.channel}**`)
            
        }
        
    }