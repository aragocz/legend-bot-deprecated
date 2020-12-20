const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();

module.exports = {
    name: 'lockdown',
    description: "Locks channel",
    execute(message, args){
        if(message.deletable) message.delete;
        const everyone = message.guild.roles.cache.find(r => r.name === '@everyone')
        if(!message.member.hasPermission("MANAGE_CHANNELS" || "ADMINISTRATOR" || "MANAGE_GUILD")){
            message.reply('You require permission `MANAGE_CHANNELS` or higher to lock this channel!')
        }else {
            message.channel.overwritePermissions([
                {
                    id: everyone ,
                    deny: ['SEND_MESSAGES']
                }
            ])
            embed.setTitle("🔒 Succesfully Locked 🔒")
            embed.setDescription(`Succesfully locked channel **${message.channel}**`)
            embed.setFooter(`Locked by ${message.author.tag} | ${moment(message.author.createdTimestamp).format('DD/MM/YYYY')}`, message.author.displayAvatarURL({dynamic: true}))
            embed.setColor('#ff0000')
            message.channel.send(embed)
        }
    }
}