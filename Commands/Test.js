const Discord = require('discord.js');
const bot = new Discord.Client();
const botsettings = require('botsettings.json');
let prefix = require(botsettings.prefix);


module.exports = (bot, callback) => {
    bot.on('message', message => {
        let messageArray = message.content.split(" ")
        let cmd = messageArray [0]
        let args = messageArray.slice(1)

        if(cmd === `${prefix}Test`){
            message.channel.send('TEST SUCCESFUL!!!')
        }
    })
};