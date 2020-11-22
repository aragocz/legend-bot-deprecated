module.exports = {
    name: 'msg',
    description: "Bot sends a message.",
    execute(message, args){
        if(message.deletable) message.delete();
        const Text = args.join(" ")
        if(!message.content.includes('@everyone' || message.guild.roles.cache.get('everyone'))){
            message.channel.send(Text)
        }else {
            const reptext = Text.replace('@everyone', '`@everyone`')
            message.channel.send(reptext)
        }
    }
}