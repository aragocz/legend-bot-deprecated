const Discord = require('discord.js')
const Aembed = new Discord.MessageEmbed();

module.exports = {
    name: 'avatar',
    description: 'Send avatar of a user in current channel, if you don\'t mention anyone, it shows yours.',
    usage: "avatar (USER) / avatar",
    execute(message, args){
        if(!message.mentions.users.first()){
            if(message.deletable) message.delete();
            Aembed.setColor('#4f0fd1')
            Aembed.setImage(`${message.author.displayAvatarURL({dynamic: true})}?size=256`)
            Aembed.setTitle(`Your avatar`);
            Aembed.setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`);
            message.channel.send(Aembed).then(m => m.delete({timeout: 60000}));
            Aembed.fields = [];
        }else{
            if(message.deletable) message.delete();
            let User = message.mentions.users.first();
            Aembed.setTitle(`${User.tag}'s avatar!`)
            Aembed.setImage(`${User.displayAvatarURL({dynamic:true})}?size=256`)
            Aembed.setColor(`#4f0fd1`);
            Aembed.setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`);
            message.channel.send(Aembed).then(m => m.delete({timeout: 60000}));
            Aembed.fields = [];
            
        }
    }
}