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
const defaultStatus = "Made By : Furuhashi Fumino#8496 | l?"
const index = require("./index.js")
const moment = require("./node_modules/moment/moment.min.js");







const botadmins = [
    '697730096999432209' ,
    '428984613935775765' ,
    '484448041609199620' ,
    '493341078934519820' ,
    '409399767739793418' ,
    '452837501527261186' 
];  


var servers = {};

bot.on('ready' , async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity(`${defaultStatus}`)
    //bot.user.setActivity("Made By : Furuhashi Fumino#8496 | l?" , {type: "PLAYING"})
    //bot.user.setActivity(defaultStatus)
})  



bot.on("message" , async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray [0]
    let args = messageArray.slice(1)
    let guildowner = message.guild.owner
    let version = botsettings.version;



    if(cmd === `${prefix}test`){
        Test.js
    }
    

    if(cmd === `${prefix}ping`){
       const pingembed = new Discord.MessageEmbed()
       .setTitle(`Pong, Im faster than you.`)
       .addFields({Name: "My ping is:" ,
        Value: `\`${Math.floor(Date.now() - message.createdTimestamp)}\`ms`})

        message.channel.send(pingembed)
    }

    if(cmd === `${prefix}invite`){
        const Invitembed = new Discord.MessageEmbed()
        .setColor('#eb7b0c')
        .setTitle('If you like this bot, you can invite it here(**Bot in alpha, set as uninvatable**)')
        .setURL('https://bit.ly/legendbot')
        .setAuthor(`Łegend` , `https://cdn.discordapp.com/attachments/725406766959165505/726044112595189851/Logo.png` , `https://bit.ly/legendbot`)
        
        return message.channel.send(Invitembed)
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
        return message.channel.send(`Prefix for this server is **${prefix}** \n ~~Change Prefix~~ <- Not Done Yet`)
    }

    if(cmd === `${prefix}support`){
        if(message.deletable) message.delete()
        guildowner.send(`User **${message.author.tag}** Needs Help on Server **${message.guild.name}**`)
        return message.reply(`Support will be here shortly.`)
            }

    if(cmd === `${prefix}version`){
        return message.channel.send(`**The bot's current version is *${version}***`)
    }

    if(cmd === `${prefix}reboot`){
        if(message.author.id === botadmins){
            return message.channel.send(`Resetting...`)
            .then(client.destroy())
            .then(() => client.login(botsettings.Token))
            .then(console.log(`${message.author.tag} Restarted the bot!`));
        }
        
        if(!message.author.id === `${badmins}`){
            return message.channel.send(`Not a Bot Admin!`)
        }
    }

    if(cmd === `${prefix}avatar`){
        const Aembed = new Discord.MessageEmbed()
        .setColor("#4f0fd1")
        .setImage(message.author.displayAvatarURL({dynamic: Boolean}))
        .setTitle(`${message.author.username}'s avatar`)
     

        return message.channel.send(Aembed)
    }

    if(cmd === `${prefix}bots`){
        const Bembed = new Discord.MessageEmbed()
        .setColor("#db1428")
        .setTitle("Bot's you should check out too.")
        .addFields(
        {name: "<:fbot:731120035007037510>FreedomBOT",
        value: "[Invite!](https://bit.ly/invite-fbot) , Made by AldiiX#1111"},
        {name: "<:bbot:731118385274028115>Bulgee Bot",
        value: "[Invite!](https://discord.com/oauth2/authorize?client_id=682927206313230337&scope=bot&permissions=2146958847) , Made by DaRealAdalbertBro#9609"}
        )

        return message.channel.send(Bembed)
    }

    
    if(cmd === `${prefix}help`){
        if(message.deletable) message.delete
        const Hembed = new Discord.MessageEmbed()
       .setColor('#9332a8')
       .setTitle('Command List')
       .setURL('https://bit.ly/legendbot')
       .setAuthor('Łegend', 'https://cdn.discordapp.com/attachments/725406766959165505/726044112595189851/Logo.png', 'https://bit.ly/legendbot')
       .setDescription('List of commands')
       .addFields(
            { name: '<:LGNDgeneral:730937158193381446> **General**' ,
            value: '`help`,`invite`,`version`,`ping`,`support`,`prefix`,`bots`,`user-info`,`ui`,' },
            { name: '<a:LGNDmusic:731104463598649424>**Music**' ,
            value: '*Work In Progress...*'},
            { name: '<:LGNDfun:741924956241133629>**Fun**',
            value: '`embed`,`msg`,``'},
            { name: '<:LGNDmoderation:734420264493908038>**Moderation**',
            value: '`purge`,``'},
            { name: '<:LGNDadmins:731102561628586015>**Bot Administrators**' ,
            value: '`servers`'},
          
        
        )
       .setFooter(`Requested by : ${message.author.tag}` , message.author.displayAvatarURL())
       
       message.channel.send(Hembed);
    }

    if(cmd === `${prefix}user-info` || cmd === `${prefix}ui`){
        if(message.deletable) message.delete()
        const Uembed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag}'s information. `)
        .setColor(message)
        .setAuthor(message.author.tag , message.author.displayAvatarURL())
        .setThumbnail(message.author.avatarURL())
        .setFooter(`Requested by : ${message.author.tag}` , message.author.displayAvatarURL())
        .addFields(
            {name: `Username:`,
             value: `${message.author.username}`,
            inline: true },
            {name: `Tag:`,
             value: `${message.author.discriminator}`,
            inline: true},
            {name: `ID:`,
             value: `${message.author.id}`},
            {name: `Last message:`,
            value: `${message.author.lastMessage + 1}`},
            {name: `Joined this server:`,
             value: `${moment(message.author.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}`},
            {name: `Account created:`,
             value: `${moment(message.author.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`},
        )
        
        
        message.channel.send(Uembed)
        .then(msg.delete({timeout: 5000}))

        
    
    }

    if(cmd === `${prefix}avatar`){
        const avatar = new Discord.MessageEmbed()
        .setTitle(`${message.author.username}'s avatar`)
        .setDescription('You\'re forbidden downloading any profile picture, without the owners permission !')
        .setImage(message.author.displayAvatarURL({format: "jpg", size: 256}))
        
        
        
        message.channel.send(avatar)
    }

    if(cmd === `${prefix}embed`){
        if(message.deletable) message.delete();
        const TITLE = args.join(" ")
        const customembed = new Discord.MessageEmbed()
        .setTitle(TITLE)
        .setColor(Math.floor(Math.random() * 16777214) + 1,)

        message.channel.send(customembed)
    }

    if(cmd === `${prefix}ss`){
        
        if(message.author.id === `428984613935775765`){
            if(message.deletable) message.delete()
            if(args = 1 || args > 1){
                let IDK = args.join(" ")
                bot.user.setActivity(`${IDK}`)
                const ss = new Discord.MessageEmbed()
                .setTitle("<:LGNDdone:733772584918843463> Activity Set <:LGNDdone:733772584918843463>")
                .addField(
                    `Succesfully set Activity`, IDK 
                )

                console.log(`Status set : ${IDK}`)

                message.channel.send(ss)
            }else{
                bot.user.setActivity(defaultStatus)
                const sreset = new Discord.MessageEmbed()
                .setTitle("<:LGNDdone:733772584918843463> Activity Reset <:LGNDdone:733772584918843463>")
                .addField(
                    `Succesfully Reset Activity To`, defaultStatus
                )

                message.channel.send(sreset)
            }
        }else {
            message.reply("`Only Bot owner can change it's status!`")
        }

        
    }

    if(cmd === `${prefix}stats`){
        const statembed = new Discord.MessageEmbed()
        .setTitle(`Stats of ${message.guild.name}`)
        .setColor('#FF7700')
        .setThumbnail(`${message.guild.iconURL()}`)
        .addFields(
         {
             name: '📜Guild Name:',
             value: `${message.guild.name}`
         },
         {
            name: '💠Guild ID:',
            value: `${message.guild.id}`
         },
         {
            name: '⭐Owner:',
            value: `${guildowner} (ID: ${guildowner.id})`
         },
         {
            name: '<:LGNDperson:763094200107139073>Members:' , 
            value: `**${message.guild.memberCount}**`
         },
         {
            name: '🍰Created At:',
            value: `${moment(message.guild.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`
         },
         {
            name: '🧻Roles:',
            value: `**${message.guild.roles.cache.size}**`
         },
         {
            name: '🏠Rooms:',
            value: `**${message.guild.channels.cache.filter((c) => c.type === "text").size}** Text, **${message.guild.channels.cache.filter((c) => c.type === "voice").size}** Voice, **${message.guild.channels.cache.filter((c) => c.type === "category").size}** Categories`
         },
         {
            name: '<:LGNDboost:763086058329735194>Guild Level:',
            value: `Level **${message.guild.premiumTier}** - **${message.guild.premiumSubscriptionCount}** Boosts`
         },
        )
        .setFooter(`Requested by : ${message.author.tag}` , `${message.author.displayAvatarURL(formatWithOptions())}`)

        message.channel.send(statembed)
        
    }

   

    if(cmd === `${prefix}purge`){
        if(message.deletable) message.delete
        const amountdef = args
        const amount = Math.floor(amountdef + 1)
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            message.channel.send(`You need permission \`MANAGE_MESSAGES\` to purge messages!`)
        }else {
            if(isNaN(amountdef)){
                message.channel.send("That's not a valid number!")
            }else {
                if(amount < 2 || amount > 100){
                    message.channel.send("The number must be between 1 - 99.")
                }else {
                    message.channel.bulkDelete(amount , true)
                }
            }
        }
    }

    
    
        
    
 { //Ruleembed
    const prompts = [
        "What title do you want to set?",
        "What description do you to want to set?",
        "What color do you want to set (hexademical) ?",
        "What is the name of field 1?",
        "What is the value(text) of field 1?",
        "What is the name of field 2?",
        "What is the value(text) of field 2?",
        "What is the name of field 3?",
        "What is the value(text) of field 3?",
        "What is the name of field 4?",
        "What is the value(text) of field 4?",
        
    ];

    if(cmd === `${prefix}ruleembed`){
        
        
        
        try {
                const response = await getResponses(message);
                let embed = new Discord.MessageEmbed()
                    .setTitle(response.title)
                    .setDescription(response.description)
                    .setColor(`${response.color}`)
                    .addField(response.field1 , response.field1v)
                    .addField(response.field2 , response.field2v)
                    .addField(response.field3 , response.field3v)
                    .addField(response.field4 , response.field4v)
                const msg = await message.channel.send(embed);
        
            } catch(err) {
                console.log(err);
            }
    }
    
    async function getResponses(message) {
     const responses = { }
        
      for(let i = 0; i < prompts.length; i++) {
        await message.channel.send(prompts[i]);
        const response = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
        const { content } = response.first();
        
        if(i === 0) responses.title = content;
        else if(i === 1) responses.description = content;
        else if(i === 2) responses.color = content;
        else if(i === 3) response.field1 = content;
        else if(i === 4) response.field1v = content;
        else if(i === 5) response.field2 = content;
        else if(i === 6) response.field2v = content;
        else if(i === 7) response.field3 = content;
        else if(i === 8) response.field3v = content;
        else if(i === 9) response.field4 = content;
        else if(i === 10) response.field4v = content;
    }
    return responses;
    }
    
 }

    if(cmd === `${prefix}msg`){
        if(message.deletable) message.delete();
        const Text = args.join(" ")
        message.channel.send(Text)
    }

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
        })
        if(!args[1] === 'inf'){
            const fetchedChannel = message.guild.channels.find(r => r.name === `${message.author.username}'s temporary text channel`);
      
            setTimeout( function() {
      
                fetchedChannel.cache.delete()
                
            }, 1 * 1000)
        }
        message.channel.send('The room will automaticly vanish after 24 hours. To higher up the persistance, contact someone with permissions `MANAGE_CHANNELS` or if you have that permission, you can make the room last infinite, with argument `inf`')
        
        
        
        
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

    if(cmd === `${prefix}remtext`){
        
        if(message.member.hasPermission("MANAGE_CHANNELS")){
            message.channel.delete()
        }else {
            message.channel.send("In order to remove this channel, you'll need to own it, or have permission `MANAGE_CHANNELS`!")
        }
        
        

        
    }
    







   
    
    

})



bot.login(botsettings.Token)







