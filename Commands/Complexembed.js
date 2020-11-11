const prompts = [
    "What title do you want to set?",
    "What description do you to want to set?",
    "What color do you want to set (hexademical) ?",
    "What is the name of field 1?",
    "What is the value(text) of field 1?",
    "What is the name of field 2?",
    "What is the value(text) of field 2?",
    "What is the name of field 3?",
    "What is the value(text) of field 3?",
    "What is the name of field 4?",
    "What is the value(text) of field 4?",
    
];

const Discord = require('discord.js');
let embed = new Discord.MessageEmbed();

module.exports = {
    name: 'complexembed',
    description: "Complex Embeds",
    async execute(message, args) {

        const response = await getResponses(message);
        
        embed.setTitle(response.title)
        embed.setDescription(response.description)
        embed.setColor(`${response.color}`)
        embed.addField(`${response.field1}` , `${response.field1v}`)
        embed.addField(`${response.field2}` , `${response.field2v}`)
        embed.addField(`${response.field3}` , `${response.field3v}`)
        embed.addField(`${response.field4}` , `${response.field4v}`)
        const msg = await message.channel.send(embed);

        async function getResponses(message) {
            const responses = { }
               
             for(let i = 0; i < prompts.length; i++) {
               await message.channel.send(prompts[i]);``
               const response = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
               const { content } = response.first();
               
               if(i === 0) responses.title = content;
               else if(i === 1) responses.description = content;
               else if(i === 2) responses.color = content;
               else if(i === 3) responses.field1 = content;
               else if(i === 4) responses.field1v = content;
               else if(i === 5) responses.field2 = content;
               else if(i === 6) responses.field2v = content;
               else if(i === 7) responses.field3 = content;
               else if(i === 8) responses.field3v = content;
               else if(i === 9) responses.field4 = content;
               else if(i === 10) responses.field4v = content;
           }
           return responses;
           }
    }
    

}

