const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();

module.exports = {
    name: 'hide',
    description: "Hides the current channel",
    usage: "hide",
    execute(message, args){
        const everyone = message.guild.roles.cache.find(r => r.name === '@everyone')
        if(!message.member.hasPermission("MANAGE_CHANNELS" || "ADMINISTRATOR" || "MANAGE_GUILD")){
            message.reply('You require permission `MANAGE_CHANNELS` or higher to lock this channel!')
        }else {
            message.channel.overwritePermissions([
                {
                    id: everyone ,
                    deny: ['VIEW_CHANNEL']
                }
            ])
            embed.setTitle("<a:LGNDhide:776050575174795334> Succesfully Hid <a:LGNDhide:776050575174795334>")
            embed.setDescription(`Succesfully hid channel **${message.channel}**`)
            embed.setFooter(`Hidden by ${message.author.tag} | ${moment(message.author.createdTimestamp).format('DD/MM/YYYY')}`, message.author.displayAvatarURL({dynamic: true}))
            embed.setColor('#ff0000')
            message.channel.send({embeds: [embed]})
            embed.fields = [];
        }
    }
}