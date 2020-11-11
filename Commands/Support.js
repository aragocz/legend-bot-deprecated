module.exports = {
    name: 'Support',
    description: "Send a DM to owner.",
    execute(message, args){
        let guildowner = message.guild.owner;
        if(message.deletable) message.delete()
        guildowner.send(`User **${message.author.tag}** Needs Help on Server **${message.guild.name}**`);

        message.reply(`Support will be here shortly.`)
    }
}
