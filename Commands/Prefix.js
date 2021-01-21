const prefix = 'l?'

module.exports = {
    name: 'prefix',
    description: "So far, just tells prefix, but custom prefix is coming soon.",
    usage: "prefix",
    execute(message, args){
        message.channel.send(`Prefix for this server is **${prefix}** \n ~~Change Prefix~~ <- Not Done Yet`)
    }
}