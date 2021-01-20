module.exports = {
    name: 'voicemute',
    description: "Voice mutes user on the server.",
    usage: "vm (USER) / voicemute (USER)",
    execute(message, args){
        const muser = message.mentions.users.first();
        const mmember = message.mentions.members.first();
        if(!message.member.hasPermission("MUTE_MEMBERS")){
            message.channel.send('You require permission `MUTE_MEMBERS` to voice-mute someone')
        }else {
            if(!args[0]){
                message.channel.send('You must specify a user to voice-mute!')
            }else {
                if(!message.mentions.members.size){
                    message.channel.send('That\'s not a valid mention!')
                }else {
                    mmember.voice.setMute(true)
                    message.channel.send(`Succesfully voice-muted ${muser}`)
                }
            }
        }
    }
}