const { MessageEmbed } = require('discord.js')
const { Client, Intents } = require( 'discord.js' );
const getAccounts = require( '../functions/getSortedAccounts' );
const bot = require('../local/bot.json' );

const client = new Client( { intents: [ Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES" ] } );

////// Replace test token with live token /////
client.login( bot.token );

const emojis = [
  '<:first_place:905313532055257099>',
  '<:second_place:905313492473643069>',
  '<:third_place:905313659687936030>'
];

const startBotCommand = () => {
  client.on( 'ready', () => {
    console.log( 'This bot is now online: ', client.user.tag );

    setInterval( () => {
      setLeaderBoard();
    }, 5000 ); // 5000 = 5 seconds | 3600000 = 1 hour | 2700000 = 45 min | 1800000 = 30 min
  } );
}

const getDate = () => {
  let today = new Date();
  const weekday = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
  const months  = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  let minutes = ( today.getMinutes() < 10 ) ? `0${ today.getMinutes() }` : `${ today.getMinutes() }`;
  let seconds = ( today.getSeconds() < 10 ) ? `0${ today.getSeconds() }` : `${ today.getSeconds() }`;
  let hours = ( today.getHours() < 10 ) ? `0${ today.getHours() }` : `${ today.getHours() }`;
  let time = `${ weekday[ today.getDay() ] }, ${ months[ today.getMonth() ] } ${ today.getDate() } at: ${ hours }:${ minutes }:${ seconds }`;
  return time;
}

// Function that will fetch all sorted accounts by mmr and create an embed message "LeaderBoard"
const setLeaderBoard = async () => {
  try {
    // Fetch an array of object with all the scholars sorted by mmr
    let scholars = await getAccounts();
    // Replace test channel_id with live channel id
    let leaderBoardChannel =  await client.channels.fetch( bot.channel_ID );
    // Example EMBEDED
    const exampleEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('<:trophy:905316507419045898>  RANKING  <:trophy:905316507419045898>')
      .setDescription('\u200b \u200B');
      
      for ( let i = 0; i < 3; i++ ) {
        exampleEmbed.addFields( { name: `${ emojis[i] } ${ scholars[i].name.toUpperCase() }  |  ${ scholars[i].manager.toUpperCase() }`, value: `${ scholars[i].mmr.toString() }`, inline: true } );
      }
      exampleEmbed.addFields( { name: '\u200B',  value: '\u200B' } );
      exampleEmbed.addFields( { name: "SCHOLAR", value: '\u200B', inline: true } )
      exampleEmbed.addFields( { name: "MANAGER", value: '\u200B', inline: true } )
      exampleEmbed.addFields( { name: "<:trophy:905316507419045898> MMR <:trophy:905316507419045898>", value: '\u200B', inline: true } )

      let count    = 0;
      let names    = '';
      let managers = ''
      let mmr      = '';

      for ( let j = 3; j <= scholars.length; j++ ) {
        count ++;
        if ( count === 15 || j === scholars.length ) {
          count = 0;
          exampleEmbed.addFields( { name: `${ names.toString() } `,    value: '\u200B', inline: true } )
          exampleEmbed.addFields( { name: `${ managers.toString() }`,  value: '\u200B', inline: true } )
          exampleEmbed.addFields( { name: `${ mmr.toString() } `,      value: '\u200B', inline: true } )
          names    = '';
          managers = '';
          mmr      = '';
        } else {
          names    += `${  j + 1  }.  ${ scholars[j].name }\n`;
          managers += `${ scholars[j].manager }\n`;
          mmr      += `${ scholars[j].mmr.toString() }\n`;
        }  
      }
    // Check if channel exists
    if ( leaderBoardChannel ) {
      // Fetch a collection of messages with a limit of 1 to ensure that we get only one message
      let msg = await leaderBoardChannel.messages.fetch( { limit : 1 } );
      // Check if msg collection is empty then create message
      if ( Array.from(msg).length === 0 ) {
        console.log( `Leaderboard has been created at: ${ getDate() }` );
        exampleEmbed.setFooter(`Created at: ${ getDate() }`);
        leaderBoardChannel.send( { embeds: [exampleEmbed] });
      } else {
        console.log( `Leaderboard has been updated at ${ getDate() }` );
        exampleEmbed.setFooter(`Last update: ${ getDate() }`);
        msg.first().edit( { embeds: [exampleEmbed] } );
      }
    }
  } catch ( error ) {
    console.log(`Interval has failed:\n ${ error } `)
  }
}

module.exports = startBotCommand;