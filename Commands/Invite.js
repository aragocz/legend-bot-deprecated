const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: "Just invite command.",
    execute(message, args){
        const Invitembed = new Discord.MessageEmbed()
        .setColor('#eb7b0c')
        .setTitle('If you like this bot, you can invite it here(**Bot in alpha, set as uninvatable**)')
        .setURL('https://bit.ly/legendbot')
        .setAuthor(`Łegend` , `https://cdn.discordapp.com/attachments/725406766959165505/726044112595189851/Logo.png` , `https://bit.ly/legendbot`);
        
        message.channel.send(Invitembed)
        Invitembed.fields = [];
    }
};