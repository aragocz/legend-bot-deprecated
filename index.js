const Discord = require('discord.js');
const botsettings = require('./botsettings.json')
const fs = require('fs');
const bot = new Discord.Client
const guild = Discord.Guild
const prefix = botsettings.prefix;
const db = require('quick.db');
const { type } = require('os');
const randomcolor = Math.floor(Math.random() * 16777214) + 1;
const defaultStatus = /*"Made By : aragocz#8496 | l?"*/ "The only thing they fear, is you! | l?"
const dbStatus = db.get('Status')
const botowner = '428984613935775765'
const sql = require("mysql");
const { setInterval } = require('timers');

//MySQL------------------------------------------------------------------------------------------------------

const host = process.env.host;
const user = process.env.user;
const password = process.env.pass;
const database = "heroku_19e5a3a858bbdc1";
const port = process.env.port;

const pdb = sql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
})

pdb.connect(err => {
    if(err){
        throw err
    }
    console.log("Succesfully connected to MySQL Database Services!")
})

function dbfix(){
    pdb.query('SELECT id FROM bot WHERE id = 1')
    return;
}

function repeatfix() {
    var varlol = setInterval(dbfix, 59000);
}


//Basics-----------------------------------------------------------------------------------------------------
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./Commands/${file}`);

    bot.commands.set(command.name, command);
} 

bot.on('ready' , async () => {
    pdb.query('SELECT status FROM bot WHERE id = 1', function(err, result, fields){
        bot.user.setActivity(result[0].status)
    });
    console.log(`${bot.user.username} is online!`)
    repeatfix()
})  

bot.on('guildMemberAdd', async member => {
    let welcome = db.get(`welcome_${member.guild.id}`)
    if(welcome.msg === 'true'){
        const welcome = member.guild.channels.cache.find(r => r.name === 'welcome')
        welcome.send(`${member} Has joined !`)
    }
})

bot.on('guildCreate', async guild => {
    /*const general = member.guild.channels.cache.find(r => r.name === 'general')
    db.set(`welcome_${guild.id}`)
    general.send('')*/
    this.guild.members.cache.forEach(user => {
        pdb.query('INSERT INTO user SET ("' + user.id + '", 0, 0, 0, "none")')
    });
})


//Commands---------------------------------------------------------------------------------------------------
bot.on("message" , async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray [0]
    let args = messageArray.slice(1)
    let version = botsettings.version;
    const muser = message.mentions.users.first();


    

    if(cmd === `${prefix}ping`){
       bot.commands.get('ping').execute(message, args)
    }

    if(cmd === `${prefix}invite`){
        bot.commands.get('invite').execute(message, args)
    }

    if(cmd === `${prefix}servers`){
        if(message.author.id === `428984613935775765`){
            const guildcount = bot.guilds.cache.size
            const guilds = bot.guilds.cache.map(g => '*' + g.name + '*  With  *' + g.memberCount + '*  members (' + g.id + ')' ).join('\n')
            message.author.send('**I\'m currently in ' + guildcount + ' servers \nServers i\'m in:**\n' + guilds)
            
            
        }
    }

  /*  if(cmd === `${prefix}admininv`){
        if(message.deletable) message.delete();
        if(!message.author.id === botowner){
            return;
        }else {
            if(!args.length){
                return;
            }else {
                const guildid = args;
                const guild = bot.guilds.cache.get(guildid);
                guild.channels.cache.first().createInvite().then(invite => message.author.send(invite.url))
                
            }
        }
    }*/

    if(cmd === `${prefix}prefix`){
        bot.commands.get('prefix').execute(message, args)
    }

    if(cmd === `${prefix}avatar`){
        bot.commands.get('avatar').execute(message, args)
    }

    if(cmd === `${prefix}bots`){
        bot.commands.get('Bots').execute(message, args)
    }

    
    if(cmd === `${prefix}help`){
        bot.commands.get('help').execute(message, args)
    }

    if(cmd === `${prefix}user-info` || cmd === `${prefix}ui`){
        bot.commands.get('user-info').execute(message, args)
    }

    if(cmd === `${prefix}embed`){
        bot.commands.get('embed').execute(message, args)
    }

    if(cmd === `${prefix}ss`){
        bot.commands.get('ss').execute(message, args, bot)
    }

    if(cmd === `${prefix}stats`){
        bot.commands.get('stats').execute(message, args)
    }

    if(cmd === '<@724669282172010506>'){
        bot.commands.get('prefix').execute(message, args)
    }

    if(cmd === `${prefix}purge`){
        bot.commands.get('purge').execute(message, args)
    }

    if(cmd === `${prefix}complexembed`){
        bot.commands.get('complexembed').execute(message, args)
    }
    

    if(cmd === `${prefix}msg`){
        bot.commands.get('msg').execute(message, args)
    }

   /* if(cmd === `${prefix}prefixdebug`){
        if(message.member.hasPermission("ADMINISTRATOR")){
            db.set('Prefix', { Prefix: `l?`})
            message.channel.send('Done!')
        }
    }*/

    /*if(cmd === `${prefix}setup`){
        
    }*/
    

  /*  if(cmd === `${prefix}temptext`){
        message.guild.channels.create(`${message.author.username}'s temporary text channel`, {
            parent: "761991856909189120", //category
            type: 'text', //type
            permissionOverwrites: [ //Permise
                {
                    id: message.author ,
                    allow: ['MANAGE_CHANNELS']
                }
            ] 
        }).then(ch => ch.delete({timeout: 10000}))
        
        
        
        
    }*/

    if(cmd === `${prefix}afk`){
        let modargs = args.join(" ")
        let content = db.get(`test_${message.author.id}.afkstatus`)
        let afk = db.get(`afk_${message.author.id}`)
        db.set(`afk_${message.author.id}`,{ afk: 'afk' })
        db.set(`test_${message.author.id}`,{ afkstatus: modargs })
        message.channel.send(`Successfully set your AFK message to \`${modargs}\`. Type ${prefix}unafk to turn of your AFK status!`).then(m => m.delete({timeout: 60000}))
    }

    if(cmd === `${prefix}unafk`){
        db.set(`afk_${message.author.id}`,{ afk: 'notafk' })
        message.reply('Set you as not AFK!')
    }

    if(cmd === `${prefix}lockdown`){
        bot.commands.get('lockdown').execute(message, args)
    }

    if(cmd === `${prefix}unlock`){
        bot.commands.get('unlock').execute(message, args)
    }

    if(cmd === `${prefix}quarantine` || cmd === `${prefix}hide`){
        bot.commands.get('hide').execute(message, args)
    }

    if(cmd === `${prefix}unquarantine` || cmd === `${prefix}unhide`){
        bot.commands.get('unhide').execute(message, args)
    }

    if(cmd === `${prefix}distancing` || cmd === `${prefix}slowmode`){
        bot.commands.get('slowmode').execute(message, args)
    }

    if(message.mentions.members.size){
        let afk = db.get(`afk_${muser.id}.afk`)
        let afkmsg = db.get(`test_${muser.id}.afkstatus`)
        if(afk === 'afk'){
            message.channel.send(`${muser} is AFK : ${afkmsg}`)
        }else return;
    }
    
    if(cmd === `${prefix}welcome-message`){
        const embed = new Discord.MessageEmbed()
        .setTitle('Welcome message')
        .setDescription(`Add **true** or **false** statement to turn on/off welcome message.`)
        .addField('Welcome message state:', `${db.get(`welcome_${message.guild.id}.msg`)}`)
        if(message.member.hasPermission('ADMINISTRATOR')){
            if(args[0]){
                message.channel.send(embed)
            }else if(args === 'true'){
                db.set(`welcome_${message.guild.id}`, {msg: 'true'})
                message.channel.send('Succesfully set welcome message to **true**.')
            }else if(args === 'false'){
                db.set(`welcome_${message.guild.id}`, {msg: 'false'})
                message.channel.send('Succesfully set welcome message to **true**.')
            }else{
                message.reply(`That\'s not a valid statement! write \`${prefix}welcome-message\` to show all options.`)
            }
        }else {
            message.reply('You require permission `ADMINISTRATOR` to manage guild bot settings.')
        }
    }

    if(cmd === `${prefix}mute`){
        bot.commands.get('mute').execute(message, args)
    }

    if(cmd === `${prefix}unmute`){
        bot.commands.get('unmute').execute(message, args)
    }

    if(cmd === `${prefix}vm` || cmd === `${prefix}voicemute`){
        bot.commands.get('voicemute').execute(message, args)
    }

    if(cmd === `${prefix}unvm` || cmd === `${prefix}unvoicemute`){
        bot.commands.get('unvoicemute').execute(message, args)
    }

    if(cmd === `${prefix}hug`){
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

    if(cmd === `${prefix}users`){
        if(message.author.id === botowner){
            const usercount = bot.users.cache.size
            const users = bot.users.cache.map(u => u.tag + " (" + u.id + ")").join('\n')
            fs.writeFile('./txt.txt', users, (err) => {
                if(err) throw err;
            })
            const attachment = new Discord.MessageAttachment('./txt.txt')
            message.author.send("Currently serving **" + usercount + "** users", attachment).then(fs.writeFile('./txt.txt', " ", {timeout: 5000}))
        }else {
            return;
        }
    }

    if(cmd === `${prefix}sqlshell`){
        if(message.author.id === botowner){
            const command = args.join(" ")
            pdb.query(command, function(err, result, fields) {
                if(err){
                    message.channel.send("**Couldn't execute the command:** \n```" + err.toString() + "```")
                    return;
                }
                const resultstring = JSON.stringify(result)
                message.channel.send("**Success:** \n```" + resultstring + "```")
            })
        }
    }

    if(cmd === `${prefix}sqlsetup`){
        if(message.author.id === botowner){
            bot.users.cache.forEach(user => {
                const update = {id: user.id, admin: 0, vip: 0, afk: 0, afkstatus: "none"}
                pdb.query('INSERT INTO user SET ?', update)
            })
        }
    }

    
})





bot.login(process.env.token)







