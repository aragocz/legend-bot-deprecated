const Discord = require('discord.js')
const Bembed = new Discord.MessageEmbed()
    
    module.exports = {
        name: 'Bots',
        description: "Bots you should check out too :D",
        execute(message, args){
            Bembed.setColor("#db1428")
            Bembed.setTitle("Bot's you should check out too.")
            Bembed.addFields(
            {name: "<:fbot:731120035007037510>FreedomBOT",
            value: "[Invite!](https://bit.ly/invite-fbot) , Made by AldiiX#1111"},
            {name: "<:bbot:731118385274028115>Bulgee Bot",
            value: "[Invite!](https://discord.com/oauth2/authorize?client_id=682927206313230337&scope=bot&permissions=2146958847) , Made by DaRealAdalbertBro#9609"}
            );

            message.channel.send(Bembed)
        }
    }