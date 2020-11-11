const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();

module.exports = {
    name: 'unlock',
    description: "Unlocks Channel",
    execute(message, args){
        const everyone = message.guild.roles.cache.find(r => r.name === '@everyone')
        if(!message.member.hasPermission("MANAGE_CHANNELS" || "ADMINISTRATOR" || "MANAGE_GUILD")){
            message.reply('You require permission `MANAGE_CHANNELS` or higher to lock this channel!')
        }else {
            message.channel.overwritePermissions([
                {
                    id: everyone ,
                    allow: ['SEND_MESSAGES']
                }
            ])
            embed.setTitle("🔓 Succesfully Unlocked 🔓")
            embed.setDescription(`Succesfully unlocked channel **${message.channel}**`)
            embed.setFooter(`Unlocked by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            embed.setColor('#00ff11')
            message.channel.send(embed)
        }
    }
}