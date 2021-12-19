const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: "Pong!",
    usage: "Sends the delay of the bot.",
    execute(message, args){
        const pingembed = new Discord.MessageEmbed()
       .setTitle(`Pong, Im faster than you.`)
       .addFields({name: "My ping is:" ,
        value: `\`${Math.floor(Date.now() - message.createdTimestamp)}\`ms`});

        message.channel.send({embeds: [pingembed]})
        pingembed.fields = [];
    }
}
