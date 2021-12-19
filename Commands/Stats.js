const Discord = require('discord.js')
const stateembed = new Discord.MessageEmbed();


module.exports = {
    name: 'stats',
    description: "Shows server stats.",
    usage: "stats",
    execute(message, args){
        const guildowner = message.guild.owner;
        const moment = require('./IGNORE/moment.min.js')

        stateembed.setTitle(`Stats of ${message.guild.name}`)
        stateembed.setColor('#FF7700')
        stateembed.setThumbnail(`${message.guild.iconURL({dynamic: true})}`)
        stateembed.setFooter(`Requested by : ${message.author.tag}` , `${message.author.displayAvatarURL()}`)
        stateembed.addFields(
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
            value: `**${message.guild.memberCount} (${message.guild.members.cache.filter(m => !m.user.bot).size} without bot users)**`
         },
         {
            name: '🍰Created At:',
            value: `${moment(message.guild.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`
         },
         {
            name: '🧻Roles:',
            value: `**${message.guild.roles.cache.size - 1}**`
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

        message.channel.send({embeds: [stateembed]}).then(m => {setTimeout(() => m.delete(), 60000)}).catch(err => {console.log(err)});
   
        stateembed.fields = [];
    }
}
