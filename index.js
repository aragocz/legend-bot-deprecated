const Discord = require('discord.js');
const botsettings = require('./botsettings.json')
const fs = require('fs');
//const intentsfile = require("./intents.json")
//const intents = intentsfile.intents
//const bot = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING]});
const bot = new Discord.Client();
const db = require('quick.db');
const { type } = require('os');
const randomcolor = Math.floor(Math.random() * 16777214) + 1;
const botowner = '428984613935775765'
const sql = require("mysql");
const { setInterval } = require('timers');
const { exec } = require('child_process');

//MySQL------------------------------------------------------------------------------------------------------

const host = process.env.host;
const user = process.env.user;
const password = process.env.pass;
const database = "heroku_19e5a3a858bbdc1";

const pdb = sql.createConnection({
    host: "eu-cdbr-west-01.cleardb.com",
    user: "b5d2d12a74b1ee",
    password: "c209df9b",
    database: "heroku_19e5a3a858bbdc1"
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
    console.log("Running " + __filename)
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
bot.on("messageCreate" , async message => {
    pdb.query('SELECT blacklisted FROM user WHERE id = ' + message.author.id, function(err, result){
        if(result.blacklisted === 1){
            message.author.send("You've been blacklisted by the bot administration team. If you believe this act was unreasonable, contact `aragocz#8496`")
        }
    })

    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].slice(prefix.length);
    let args = messageArray.slice(1);
    let version = botsettings.version;
    const muser = message.mentions.users.first();


    

    if(cmd === `ping`){
       bot.commands.get('ping').execute(message, args)
    }

    if(cmd === `invite`){
        bot.commands.get('invite').execute(message, args)
    }

    if(cmd === `servers`){
        if(message.author.id === `428984613935775765`){
            const guildcount = bot.guilds.cache.size
            const guilds = bot.guilds.cache.map(g => '*' + g.name + '*  With  *' + g.memberCount + '*  members (' + g.id + ')' ).join('\n')
            message.author.send('**I\'m currently in ' + guildcount + ' servers \nServers i\'m in:**\n' + guilds)
            
            
        }
    }

    if(cmd === "fixdbusers"){
        if(message.author.id === botowner){
            bot.users.cache.forEach(u => {
                pdb.query("SELECT EXISTS(SELECT * FROM bot WHERE id = \"" + u.id + "\")", function(err, res){
                    if(res === 0){
                        pdb.query(`INSERT INTO bot (id, admin, vip, afk, afkstatus, blacklisted, lgnddev) VALUES (${u.id}, 0, 0, "none", 0, null)`, function(err, result){
                            if(err){
                                const errs = err.toString();
                                if(errs.length <= 4000){
                                    console.log("**Error:**\n```" + errs + "```")
                                }else{
                                    fs.writeFile("./txt.txt", errs)
                                }
                            }
                            const resultstring = JSON.stringify(result, null, 2)
                            if(resultstring.length <= 4000){
                                console.log("**Success:**\n```" + resultstring + "```")
                            }else{
                                fs.writeFile("./txt.txt", resultstring)
                            }
                        })
                    }else if(res === 1) return;
                })
            })
        }else message.channel.send("no")
    }

  /*  if(cmd === `admininv`){
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

    if(cmd === `prefix`){
        bot.commands.get('prefix').execute(message, args)
    }

    if(cmd === `avatar`){
        bot.commands.get('avatar').execute(message, args)
    }
  
    if(cmd === `help`){
        bot.commands.get('help').execute(message, args)
    }

    if(cmd === `user-info` || cmd === `ui`){
        bot.commands.get('user-info').execute(message, args)
    }

    if(cmd === `embed`){
        bot.commands.get('embed').execute(message, args)
    }

    if(cmd === `ss`){
        bot.commands.get('ss').execute(message, args, bot)
    }

    if(cmd === `stats`){
        bot.commands.get('stats').execute(message, args)
    }

    if(cmd === '<@724669282172010506>'){
        bot.commands.get('prefix').execute(message, args)
    }

    if(cmd === `purge`){
        bot.commands.get('purge').execute(message, args)
    }
    
    if(cmd === `msg`){
        bot.commands.get('msg').execute(message, args)
    }

   /* if(cmd === `prefixdebug`){
        if(message.member.hasPermission("ADMINISTRATOR")){
            db.set('Prefix', { Prefix: `l?`})
            message.channel.send('Done!')
        }
    }*/

    /*if(cmd === `setup`){
        
    }*/
    

  /*  if(cmd === `temptext`){
        message.guild.channels.create(`${message.author.username}'s temporary text channel`, {
            parent: "761991856909189120", //category
            type: 'text', //type
            permissionOverwrites: [ //Permise
                {
                    id: message.author ,
                    allow: ['MANAGE_CHANNELS']
                }
            ] 
        }).then(m => {setTimeout(() => m.delete(), 10000)}).catch(err => {console.log(err)});
        
        
        
        
    }*/

    if(cmd === `afk`){
        let modargs = args.join(" ")
        let content = db.get(`test_${message.author.id}.afkstatus`)
        let afk = db.get(`afk_${message.author.id}`)
        db.set(`afk_${message.author.id}`,{ afk: 'afk' })
        db.set(`test_${message.author.id}`,{ afkstatus: modargs })
        message.channel.send(`Successfully set your AFK message to \`${modargs}\`. Type ${prefix}unafk to turn of your AFK status!`).then(m => m.delete({timeout: 60000}))
    }

    if(cmd === `unafk`){
        db.set(`afk_${message.author.id}`,{ afk: 'notafk' })
        message.reply('Set you as not AFK!')
    }

    if(cmd === `lockdown`){
        bot.commands.get('lockdown').execute(message, args)
    }

    if(cmd === `unlock`){
        bot.commands.get('unlock').execute(message, args)
    }

    if(cmd === `quarantine` || cmd === `hide`){
        bot.commands.get('hide').execute(message, args)
    }

    if(cmd === `unquarantine` || cmd === `unhide`){
        bot.commands.get('unhide').execute(message, args)
    }

    if(cmd === `distancing` || cmd === `slowmode`){
        bot.commands.get('slowmode').execute(message, args)
    }

    if(message.mentions.members.size){
        let afk = db.get(`afk_${muser.id}.afk`)
        let afkmsg = db.get(`test_${muser.id}.afkstatus`)
        if(afk === 'afk'){
            message.channel.send(`${muser} is AFK : ${afkmsg}`)
        }else return;
    }

    if(cmd === `mute`){
        bot.commands.get('mute').execute(message, args)
    }

    if(cmd === `unmute`){
        bot.commands.get('unmute').execute(message, args)
    }

    if(cmd === `vm` || cmd === `voicemute`){
        bot.commands.get('voicemute').execute(message, args)
    }

    if(cmd === `unvm` || cmd === `unvoicemute`){
        bot.commands.get('unvoicemute').execute(message, args)
    }

    if(cmd === `hug`){
       bot.commands.get('hug').execute(bot, message, args)
    }

    if(cmd === `users`){
        bot.commands.get('users').execute(message, args, bot, botowner);
    }

    if(cmd === `sqlshell`){
        if(message.author.id === botowner){
            const command = args.join(" ")
            pdb.query(command, function(err, result, fields) {
                if(err){
                    message.channel.send("**Couldn't execute the command:** \n```" + err.toString() + "```")
                    return;
                }
                const resultstring = JSON.stringify(result, null, 2)
                if(resultstring.length <= 4000){
                    message.channel.send("**Success:** \n```" + resultstring + "```")
                }else {
                    fs.writeFile('./txt.txt', resultstring, (err) => {
                        if(err) throw err;
                    })
                    const attachment = new Discord.MessageAttachment('./txt.txt')
                    message.channel.send("**Success:**", attachment)
                }
            })
        }
    }

    if(cmd === `shell`){
        if(message.author.id === botowner){
            const command = args.join(" ");
            exec(command, function(err, stdout, stderr){
                if(err){
                    message.channel.send("**Error:**\n```"+err+"```");
                }
                if(!err){
                    if(stdout.length <= 4000){
                        message.channel.send("**Success:**\n```"+stdout+"```")
                    }else {
                        fs.writeFile('./txt.txt', stdout, err => {
                            if(err) throw err;
                        })
                        const attachment = new Discord.MessageAttachment('./txt.txt');
                        message.channel.send("**Success:**", attachment);
                    }
                }
            })
        }
    }

    //4ever virgins exclusives
    if(message.guild.id === "752968279445733416"){

        if(cmd === `unmuteme`){
            if(message.member.voice.mute === true){
                message.member.voice.setMute(false, "Requested unmute.");
                message.reply("unmuted you.");
            }else {
                message.reply("you're not muted dumass.");
            }
        }

    }
    
})





bot.login(/*process.env.token*/"NzI0NjY5MjgyMTcyMDEwNTA2.XvDi3A.KzFt3ZIQira0-rrc1dZlSrOZIt0")







