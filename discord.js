const Discord = require('discord.js');
require('dotenv').config()
const rollDices = require('./DiceModule')
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  //Split message 
  const messageSplit = message.content.split(' ');
  // help command
  if (messageSplit[0] === '!h') {
    const embed = new Discord.MessageEmbed()
      .setTitle("Commands help")
      .setAuthor(message.author.username)
      .setColor(0x00AE86)
      .setDescription("Voici la liste des commandes disponible ")
      .addField('!h', 'help', false)
      .addField('!roll', 'roll un dé à 20 faces', false)
      .addField('!roll [ INT ]d[ INT ] ', 'roll le nombre de dé voulu avec le nombre de face voulu ex: !roll 2d100', false)
      .addField('!roll [ INT ]d[ INT ] *[ INT ] ', 'répète le roll un nombre de fois voulu ex: !roll 2d20 *6 ', false)
      .addField('!roll [ INT ]d[ INT ] cr[ INT ]', 'roll avec possibilité de critique, si le résultat du dé est supérieur ou égale au critique le dé est relancé et ajouté au roll total ex: !roll 2d20 cr18.', false)
      .setTimestamp()
    message.reply({ embed })
  }
  //!roll command
  if (messageSplit[0] === '!roll') {
    // if roll is triggerd alone, will roll a single d20
    if (messageSplit.length === 1) {
      return message.reply(
        (Math.floor(Math.random() * 20) + 1)
      );
    }
    //inititate variable
    let sides = messageSplit[1];
    let rolls = 1;
    let crit = null;
    //check if the command is correct
    if (sides > 100) {
      message.reply('sides cannot be greater than 100')
    }
    if (!isNaN(parseInt(messageSplit[1][0], 10)) && messageSplit[1].includes('d')) {
      // get the number of sides and rolls from the message
      rolls = parseInt(messageSplit[1].split('d')[0]);
      sides = messageSplit[1].split('d')[1];

    } else if (messageSplit[1][0] == 'd') {
      // get the number of sides if the user didn't specify how many dice to roll
      sides = sides.slice(1);
    }
    sides = parseInt(sides, 10);
    //return if the message isn't correct
    if (isNaN(sides) || isNaN(rolls)) {
      return;
    }
    //get the crit number if using cr
    if (messageSplit[2] && messageSplit[2].includes('cr')) {
      crit = parseInt(messageSplit[2].split('cr')[1], 10)
    }
    // get the number of time to repeat dice roll if using * and execute rollDices needed
    if (messageSplit[2] && messageSplit[2].includes('*')) {
      repeat = parseInt(messageSplit[2].split('*')[1], 10)
      if (repeat > 20) {
        return message.reply(`too many dices`);
      }
      for (let i = 0; i < repeat; i++) {
        rollDices(message, rolls, sides, crit);
      }
      return
    }
    rollDices(message, rolls, sides, crit);
  }
});

client.login(process.env.DISCORD_TOKEN);