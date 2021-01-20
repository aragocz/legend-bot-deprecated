module.exports = {
    name: 'unvoicemute',
    description: "Removes voice-channel mute from a user.",
    usage: "unvm (USER) / unvoicemute (USER)",
    execute(message, args){
        const muser = message.mentions.users.first();
        const mmember = message.mentions.members.first();
        if(!message.member.hasPermission("MUTE_MEMBERS")){
            message.channel.send('You require permission `MUTE_MEMBERS` to un-voice-mute someone')
        }else {
            if(!args[0]){
                message.channel.send('You must specify a user to un-voice-mute!')
            }else {
                if(!message.mentions.members.size){
                    message.channel.send('That\'s not a valid mention!')
                }else {
                    mmember.voice.setMute(false)
                    message.channel.send(`Succesfully un-voice-muted ${muser}`)
                }
            }
        }
    }
}