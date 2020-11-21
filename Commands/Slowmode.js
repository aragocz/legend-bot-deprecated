module.exports = {
    name: 'slowmode',
    description: "Sets room slowmode to value in seconds, write 0 to turn off.",
    execute(message, args){
        let amount = args
        let amounts = Math.floor(amount)
        if(message.member.hasPermission(['MANAGE_GUILD' || 'MANAGE_CHANNELS' || 'ADMINISTRATOR'])){
            if(isNaN(amount)){
                message.channel.send('That\'s not a valid number!')
            }else{
                message.channel.setRateLimitPerUser(amounts)
                message.channel.send(`Succesfully set room slowmode to **${amounts}**s!`)
            }
        }else {
            message.reply('You need permission `MANAGE_CHANNELS`, or higher, to enable slowmode.')
        }
    }
}