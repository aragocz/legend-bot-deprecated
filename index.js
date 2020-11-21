const Discord = require('discord.js');
const botsettings = require('./botsettings.json')
const fs = require('fs');
const bot = new Discord.Client
const guild = Discord.Guild
const prefix = botsettings.prefix;
const ytdl = require('ytdl-core');
const { getInfo } = require('ytdl-core');
const { isBuffer, formatWithOptions } = require('util');
const { url } = require('inspector');
const { URL } = require('url');
const { TIMEOUT } = require('dns');
const { Giveaway } = require('discord-giveaways');
const db = require('quick.db');
const { error } = require('console');
const { get } = require('http');
const version = botsettings.version;
const randomcolor = Math.floor(Math.random() * 16777214) + 1;
const defaultStatus = /*"Made By : Furuhashi Fumino#8496 | l?"*/ "Furuhashi is no longer an owner, bot moved to Łegend Developers team!"
const index = require("./index.js")
const moment = require("./node_modules/moment/moment.min.js");







bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./Commands/${file}`);

    bot.commands.set(command.name, command);
}

const botadmins = [
    '697730096999432209' ,
    '428984613935775765' ,
    '484448041609199620' ,
    '493341078934519820' ,
    '409399767739793418' ,
    '452837501527261186' 
];  

bot.on('ready' , async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity(`${defaultStatus}`)
    //bot.user.setActivity("Made By : Furuhashi Fumino#8496 | l?" , {type: "PLAYING"})
    //bot.user.setActivity(defaultStatus)
})  

bot.on('guildMemberAdd', async member => {
    if(member.guild.id === '725406766959165501'){
        const welcome = member.guild.channels.cache.find(r => r.name === 'welcome')
        welcome.send(`${member} Has joined !`)
    }
})

bot.on('guildCreate', async guild => {
    const general = member.guild.channels.cache.find(r => r.name === 'general')
    general.send('')
})



bot.on("message" , async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray [0]
    let args = messageArray.slice(1)
    let version = botsettings.version;
    const muser = message.mentions.users.first();


    

    if(cmd === `${prefix}ping`){
       bot.commands.get('ping').execute(message, args)
    }

    if(cmd === `${prefix}invite`){
        bot.commands.get('invite').execute(message, args)
    }

    if(cmd === `${prefix}servers`){
        if(message.author.id === `428984613935775765`){
            message.author.send('**Servers i\'m in:**')
            bot.guilds.cache.forEach((guild) => {
                message.author.send(`*${guild.name}*  With *${guild.memberCount}*  members`)
            })
            
        }
    }

    if(cmd === `${prefix}prefix`){
        bot.commands.get('prefix').execute(message, args)
    }

    if(cmd === `${prefix}version`){
        bot.commands.get('version').execute(message, args)
    }

    if(cmd === `${prefix}avatar`){
        bot.commands.get('avatar').execute(message, args)
    }

    if(cmd === `${prefix}bots`){
        bot.commands.get('Bots').execute(message, args)
    }

    
    if(cmd === `${prefix}help`){
        bot.commands.get('help').execute(message, args)
    }

    if(cmd === `${prefix}user-info` || cmd === `${prefix}ui`){
        bot.commands.get('user-info').execute(message, args)
    }

    if(cmd === `${prefix}embed`){
        bot.commands.get('embed').execute(message, args)
    }

    if(cmd === `${prefix}ss`){
        bot.commands.get('ss').execute(message, args, bot)
    }

    if(cmd === `${prefix}stats`){
        bot.commands.get('stats').execute(message, args)
    }

    if(message.mentions.has(bot.user.id)){
        bot.commands.get('prefix').execute(message, args)
    }

    if(cmd === `${prefix}purge`){
        bot.commands.get('purge').execute(message, args)
    }

    
    
        
    
    if(cmd === `${prefix}complexembed`){
        bot.commands.get('complexembed').execute(message, args)
    }
    

    if(cmd === `${prefix}msg`){
        if(message.deletable) message.delete();
        const Text = args.join(" ")
        message.channel.send(Text)
    }

    /*if(cmd === `${prefix}setprefix`){
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
    }*/

    if(cmd === `${prefix}prefixdebug`){
        if(message.member.hasPermission("ADMINISTRATOR")){
            db.set('Prefix', { Prefix: `l?`})
            message.channel.send('Done!')
        }
    }

    if(cmd === `${prefix}setup`){
        
    }
    

    if(cmd === `${prefix}temptext`){
        message.guild.channels.create(`${message.author.username}'s temporary text channel`, {
            parent: "761991856909189120", //category
            type: 'text', //type
            permissionOverwrites: [ //Permise
                {
                    id: message.author ,
                    allow: ['MANAGE_CHANNELS']
                }
            ] 
        }).then(ch => ch.delete({timeout: 10000}))
        
        
        
        
    }

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

    if(cmd === `${prefix}afk`){
        let modargs = args.join(" ")
        let content = db.get(`test_${message.author.id}.afkstatus`)
        let afk = db.get(`afk_${message.author.id}`)
        db.set(`afk_${message.author.id}`,{ afk: 'afk' })
        db.set(`test_${message.author.id}`,{ afkstatus: modargs })
        message.channel.send(`Successfully set your AFK message to \`${content}\`. Write ${prefix}unafk to turn of mention message!`).then(m => m.delete({timeout: 1}))
        message.channel.send(`Successfully set your AFK message to \`${content}\`. Write ${prefix}unafk to turn of mention message!`).then(m => m.delete({timeout: 60000}))
    }

    if(cmd === `${prefix}unafk`){
        db.set(`afk_${message.author.id}`,{ afk: 'notafk' })
        message.reply('Set you as not AFK!')
    }

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

    if(cmd === `${prefix}lockdown`){
        bot.commands.get('lockdown').execute(message, args)
    }

    if(cmd === `${prefix}unlock`){
        bot.commands.get('unlock').execute(message, args)
    }

    if(cmd === `${prefix}quarantine` || cmd === `${prefix}hide`){
        bot.commands.get('hide').execute(message, args)
    }

    if(cmd === `${prefix}unquarantine` || cmd === `${prefix}unhide`){
        bot.commands.get('unhide').execute(message, args)
    }

    if(cmd === `${prefix}distancing` || cmd === `${prefix}slowmode`){
    bot.commands.get('slowmode').execute(message, args)
    }

    if(message.mentions.members.size){
        let afk = db.get(`afk_${muser.id}.afk`)
        let afkmsg = db.get(`test_${muser.id}.afkstatus`)
        if(afk === 'afk'){
            message.channel.send(`${muser} is AFK : ${afkmsg}`)
        }
    }

    if(cmd === '285827619358'){
        if(message.deletable) message.delete()
        message.author.send('You just found the secret code, don\'t you dare to say it to someone, dm me Furuhashi Fumino#8496 .').then(m => m.delete({timeout: 10000}))
    }
    
})





bot.login(botsettings.Token)







