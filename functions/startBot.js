const { MessageEmbed } = require('discord.js')
const { Client, Intents } = require( 'discord.js' );
const getAccounts = require( '../functions/getSortedAccounts' );
const bot = require( '../local/bot.json' );

const client = new Client( { intents: [ Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES" ] } );

// Replace test token with live token
client.login( bot.test_token );

const emojis = [
  '<:first_place:905313532055257099>',
  '<:second_place:905313492473643069>',
  '<:third_place:905313659687936030>'
];

const startBotCommand = () => {
  client.on( 'ready', () => {
  console.log( 'This bot is now online: ', client.user.tag );
  try {
      setInterval( async () => {
        // Fetch an array of object with all the scholars sorted by mmr
        let scholars = await getAccounts();
        // Replace test channel_id with live channel id
        let leaderBoardChannel =  await client.channels.fetch( bot.test_channel_id );
        // Example EMBEDED
        const exampleEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('<:trophy:905316507419045898>  RANKING  <:trophy:905316507419045898>')
          .setDescription('\u200b');
          
          for ( let i = 0; i < scholars.length; i++ ){
            if ( i < 3 ){
             exampleEmbed.addFields( { name: `${emojis[i]} ${scholars[i].name}  ${scholars[i].manager}`, value: `${ scholars[i].mmr.toString() }`, inline: true } )
            }
          }

          // .addFields(
          //   { name: 'Regular field title', value: 'Some value here' },
          //   { name: '\u200B', value: '\u200B' },
          //   { name: 'Inline field title', value: 'Some value here', inline: true },
          //   { name: 'Inline field title', value: 'Some value here', inline: true },
          // )
          // .addField('Inline field title', 'Some value here', true)
          // .setImage('https://i.imgur.com/AfFp7pu.png')
          // .setTimestamp()
          // .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

        // Check if channel exists
        if ( leaderBoardChannel ) {
          // Fetch a collection of messages with a limit of 1 to ensure that we get only one message
          let msg = await leaderBoardChannel.messages.fetch( { limit : 1 } );
          // Check if msg collection is empty
          if ( Array.from(msg).length === 0 ) {
            // If empty create message
            console.log( "Message has been created" );
            leaderBoardChannel.send( { embeds: [exampleEmbed] });
          } else {
            console.log( "Message has been edited!" );
            // Edit the message
            msg.first().edit( { embeds: [exampleEmbed] } );
          }
        }
      }, 5000 ); // How many milliseconds until next interval 5000 = 5 seconds
    } catch ( error ) {
      console.log(error);
    }
  } );
}



module.exports = startBotCommand;