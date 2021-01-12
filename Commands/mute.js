module.exports = {
    name: 'mute',
    description: "Forbids user from typing in every channel on the server.",
    usage: "mute (USER)",
    execute(message, args){
        const muser = message.mentions.users.first();
        if(!args[0]){
            message.channel.send('You must specify a user to mute!')
        }else {
            if(!message.mentions.members.size){
                message.channel.send('That\'s not a valid mention!')
            }else {
                message.guild.channels.cache.forEach(channel => channel.overwritePermissions([
                    {
                        id: `${muser.id}`,
                        deny: ['SEND_MESSAGES']
                    }
                ]))
                message.channel.send(`Succesfully muted ${muser}`)
            }
        }
    }
}