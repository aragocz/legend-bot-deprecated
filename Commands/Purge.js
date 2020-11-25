module.exports = {
    name: 'purge',
    description: "Deletes 1 - 99 messages. + 1 aka the message you sent.",
    execute(message, args){
        if(message.deletable) message.delete
        let amountdef = args
        let amountdef2 = Math.floor(amountdef)
        let amount = amountdef2 + 1
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            message.channel.send(`You need permission \`MANAGE_MESSAGES\` to purge messages!`).then(m => m.delete({timeout: 10000}))
        }else {
            if(isNaN(amountdef)){
                message.channel.send("That's not a valid number!").then(m => m.delete({timeout: 10000}))
            }else {
                if(amount < 2 || amount > 100){
                    message.channel.send("The number must be between 1 - 99.").then(m => m.delete({timeout: 10000}))
                }else {
                    message.channel.bulkDelete(amount , true)
                    message.channel.send(`Succesfully removed ${amountdef2} messages!`).then(m => m.delete({timeout: 10000}))
                }
            }
        }
    }
}