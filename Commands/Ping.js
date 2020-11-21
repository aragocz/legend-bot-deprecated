const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: "Pong!",
    execute(message, args){
        const pingembed = new Discord.MessageEmbed()
       .setTitle(`Pong, Im faster than you.`)
       .addFields({Name: "My ping is:" ,
        Value: `\`${Math.floor(Date.now() - message.createdTimestamp)}\`ms`});

        message.channel.send(pingembed)
        pingembed.fields = [];
    }
}
