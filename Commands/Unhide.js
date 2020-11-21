const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();

module.exports = {
    name: 'unhide',
    description: "Puts the channel from quarantine/finds the channel",
    execute(message, args){
        const everyone = message.guild.roles.cache.find(r => r.name === '@everyone')
        if(!message.member.hasPermission("MANAGE_CHANNELS" || "ADMINISTRATOR" || "MANAGE_GUILD")){
            message.reply('You require permission `MANAGE_CHANNELS` or higher to lock this channel!')
        }else {
            message.channel.overwritePermissions([
                {
                    id: everyone ,
                    allow: ['VIEW_CHANNEL']
                }
            ])
            embed.setTitle("<a:LGNDunhide:776201731268542474> Succesfully Unhid <a:LGNDunhide:776201731268542474>")
            embed.setDescription(`Succesfully unhid channel **${message.channel}**`)
            embed.setFooter(`Unhid by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            embed.setColor('#00ff00')
            message.channel.send(embed)
        }
    }
}