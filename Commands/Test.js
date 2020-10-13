    let prefix = botsettings.prefix;

    module.exports = (bot)

    bot.on('message', message => {
        if(cmd === `${prefix}Test`){
            message.channel.send("Succesful")
        }
    })