const Discord = require('discord.js');
const Uembed = new Discord.MessageEmbed();
const randomcolor = Math.floor(Math.random() * 16777214) + 1;
const moment = require('./IGNORE/moment.min.js')

module.exports = {
    name: 'user-info',
    description: "Shows info about a user.",
    execute(message, args){
        if(message.deletable) message.delete()
        Uembed.setTitle(`${message.author.tag}'s information. `)
        Uembed.setColor(randomcolor)
        Uembed.setAuthor(message.author.tag , message.author.displayAvatarURL())
        Uembed.setThumbnail(message.author.avatarURL())
        Uembed.setFooter(`Requested by : ${message.author.tag}` , message.author.displayAvatarURL())
        Uembed.addFields(
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
             value: `${moment(message.member.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}`},
            {name: `Account created:`,
             value: `${moment(message.author.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`},
        );
        
        message.channel.send(Uembed)
        .then(m => m.delete({timeout: 60000}))
    }
}