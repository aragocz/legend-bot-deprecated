const Discord = require('discord.js');
const Uembed = new Discord.MessageEmbed();
const randomcolor = Math.floor(Math.random() * 16777214) + 1;
const moment = require('./IGNORE/moment.min.js')

module.exports = {
    name: 'user-info',
    description: "Shows info about a user.",
    execute(message, args){
        const muser = message.mentions.users.first();
        const memberuser = message.mentions.members.first();
        if(message.deletable) message.delete()
        if(!message.mentions.users.first()){
            Uembed.setTitle(`Your information.`)
            Uembed.setColor(randomcolor)
            Uembed.setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
            Uembed.setThumbnail(message.author.avatarURL({dynamic: true}))
            Uembed.setFooter(`Requested by : ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
            Uembed.addFields(
                {name: `Username:`,
                value: `${message.author.username}`,
                inline: true },
                {name: `Tag:`,
                value: `${message.author.discriminator}`,
                inline: true},
                {name: `ID:`,
                value: `${message.author.id}`},
                {name: `Highest Role:`,
                value: `${message.member.roles.highest}`},
                {name: `Joined this server:`,
                value: `${moment(message.member.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}`},
                {name: `Account created:`,
                value: `${moment(message.author.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`},
            );
        }else {
            Uembed.setTitle(`${muser.tag}'s information. `)
            Uembed.setColor(randomcolor)
            Uembed.setAuthor(muser.tag , muser.displayAvatarURL({dynamic: true}))
            Uembed.setThumbnail(muser.displayAvatarURL({dynamic: true}))
            Uembed.setFooter(`Requested by : ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
            Uembed.addFields(
                {name: `Username:`,
                value: `${muser.username}`,
                inline: true },
                {name: `Tag:`,
                value: `${muser.discriminator}`,
                inline: true},
                {name: `ID:`,
                value: `${muser.id}`},
                {name: `Highest Role:`,
                value: `${memberuser.roles.highest}`},
                {name: `Joined this server:`,
                value: `${moment(muser.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}`},
                {name: `Account created:`,
                value: `${moment(muser.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`},
            );
        }
        
        message.channel.send(Uembed)
        .then(m => m.delete({timeout: 60000}))
        Uembed.fields = [];
    }
}