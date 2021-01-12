module.exports = {
    name: 'unmute',
    description: "Removes mute from a user.",
    usage: "unmute (USER)",
    execute(message, args){
        const muser = message.mentions.users.first();
        if(!args[0]){
            message.channel.send('You must specify a user to unmute!')
        }else {
            if(!message.mentions.members.size){
                message.channel.send('That\'s not a valid mention!')
            }else {
                message.guild.channels.cache.forEach(channel => channel.overwritePermissions([
                    {
                        id: `${muser.id}`,
                        default: ['SEND_MESSAGES']
                    }
                ]))
                message.channel.send(`Succesfully unmuted ${muser}`)
            }
        }
    }
}