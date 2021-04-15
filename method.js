const Discord = require('discord.js');

const rollDices = (message, rolls, sides, crit) => {

    if (rolls > 1) {
        const rollResults = [];
        //for each rolls , get a random number and push in results row
        for (let i = 0; i < rolls; i++) {
            let diceRoll = Math.floor(Math.random() * sides) + 1

            rollResults.push(diceRoll);
            //if cr has been used, reroll the dice and push in result row
            if (crit && crit > 0 && diceRoll >= crit) {
                rollResults.push(Math.floor(Math.random() * sides) + 1);
            }
        }
        // calcul total sum
        const sum = rollResults.reduce((a, b) => a + b);

        const multipleDices = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`just rolled [${rollResults.toString()}]`)
            .setAuthor(message.author.username)
            .setDescription(`total: ${sum}`)
            .setTimestamp()

        return message.reply(multipleDices);

    } else {
        const singleDice = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(message)
            .setAuthor(message.author.username)
            .setDescription(Math.floor(Math.random() * sides) + 1)
            .setTimestamp()

        return message.reply(
            (singleDice)
        );
    }
}

module.exports = rollDices;