const Discord = require("discord.js");
const customembed = new Discord.MessageEmbed();


module.exports = {
    name: 'embed',
    description: "Custom Embed, supports only title.",
    usage: "embed (TEXT)",
    execute(message, args){
        const TITLE = args.join(" ");
        if(message.deletable) message.delete();
        customembed.setTitle(TITLE)
        customembed.setColor(Math.floor(Math.random() * 16777214) + 1,);

        message.channel.send(customembed);
    }
}