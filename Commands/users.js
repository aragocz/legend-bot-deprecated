const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'users',
    description: 'Fetches the entire userlist into a map, and sends the map into requester\'s DMs.',
    usage: 'users',
    execute(message, args, bot, botowner){
        if(message.author.id === botowner){
            const usercount = bot.users.cache.size
            const users = bot.users.cache.map(u => u.tag + " (" + u.id + ")").join('\n')
            fs.writeFile('./^txt.txt', users, (err) => {
                if(err) throw err;
            })
            const attachment = new Discord.MessageAttachment('./^txt.txt')
            message.author.send("Currently serving **" + usercount + "** users", attachment).then(fs.writeFile('./^txt.txt', " ", {timeout: 5000}))
        }else {
            return;
        }
    }
}