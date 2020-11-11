const Discord = require('discord.js')
const Aembed = new Discord.MessageEmbed();

module.exports = {
    name: 'Avatar',
    description: 'Just avatar',
    execute(message, args){
        if(!message.mentions.users.first()){
            if(message.deletable) message.delete();
            Aembed.setColor('#4f0fd1')
            Aembed.setImage(message.author.displayAvatarURL({dynamic: true}))
            Aembed.setTitle(`Your avatar`);
            Aembed.setFooter(`Requested by ${message.author.tag}`)
            return message.channel.send(Aembed).then(m => m.delete({timeout: 60000}))
        }else{
            if(message.deletable) message.delete();
            let User = message.mentions.users.first();
            Aembed.setTitle(`${User.tag}'s avatar!`)
            Aembed.setImage(User.displayAvatarURL({dynamic:true}))
            Aembed.setColor(`#4f0fd1`);
            Aembed.setFooter(`Requested by ${message.author.tag}`)
            return message.channel.send(Aembed).then(m => m.delete({timeout: 60000}))
        }
    }
}