const Discord = require("discord.js");

module.exports = {
    name: "hug",
    description: "Hugs the user",
    usage: "hug @user",
    execute(message, args){
        const muser = message.mentions.users.first();
        const embed = new Discord.MessageEmbed();
        const expgifs = [
            "https://media.tenor.com/images/ca88f916b116711c60bb23b8eb608694/tenor.gif",
            "https://media.tenor.com/images/778282e02d511fbc061e1439a5105c6f/tenor.gif",
            "https://media.tenor.com/images/ca682cecd6bff521e400f984502f370c/tenor.gif",
            "https://media.tenor.com/images/bb67bef5f54d0191b7e2d3c1fd6e4bd3/tenor.gif",
            "https://media.tenor.com/images/d7f6849b07da0532c7dc3aab538d42d4/tenor.gif",
            "https://media.tenor.com/images/9fe95432f2d10d7de2e279d5c10b9b51/tenor.gif",
            "https://media.tenor.com/images/043d27b3f7715ac7c2eb6d8670b14336/tenor.gif",
            "https://media.tenor.com/images/ea1ca14e49866429e2221aab2126cdb0/tenor.gif",
            "https://gifimage.net/wp-content/uploads/2017/06/anime-hug-gif-12.gif",
            "https://media.tenor.com/images/1171c186f9130d1efa4a186ad4371e8c/tenor.gif",
            "https://media.tenor.com/images/f08f77fc242b9a8263206caa42795d9d/tenor.gif"
        ]
        let gif = expgifs[Math.floor(Math.random() * expgifs.length)];
        embed.setTitle(`${message.author.username} hugs ${muser.username}`)
        embed.setImage(gif);

        message.channel.send(embed)
    }
}