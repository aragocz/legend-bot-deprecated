const Discord = require('discord.js')
const Hembed = new Discord.MessageEmbed();


module.exports = {
    name: 'help',
    description: "Help, shows commands.",
    execute(message, args){
        if(message.deletable) message.delete
       Hembed.setColor('#9332a8')
       Hembed.setTitle('Command List')
       Hembed.setURL('https://bit.ly/legendbot')
       Hembed.setAuthor('Łegend', 'https://cdn.discordapp.com/attachments/725406766959165505/726044112595189851/Logo.png', 'https://bit.ly/legendbot')
       Hembed.setDescription('List of commands')
       Hembed.addFields(
            { name: '<:LGNDgeneral:730937158193381446> **General**' ,
            value: '`help`,`invite`,`version`,`ping`,`support`,`prefix`,`bots`,`user-info`,`ui`,' },
            { name: '<a:LGNDmusic:731104463598649424>**Music**' ,
            value: '*Work In Progress...*'},
            { name: '<:LGNDfun:741924956241133629>**Fun**',
            value: '`embed`,`msg`,``'},
            { name: '<:LGNDmoderation:734420264493908038>**Moderation**',
            value: '`purge`,``'},
            { name: '<:LGNDadmins:731102561628586015>**Bot Administrators**' ,
            value: '`servers`'},
          
        
        )
       Hembed.setFooter(`Requested by : ${message.author.tag}` , message.author.displayAvatarURL());
       
       message.channel.send(Hembed);
       Hembed.fields = [];
    }
}