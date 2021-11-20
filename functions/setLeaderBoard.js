/*
  This function will take all the accounts
  and will create an embed message that will
  be displayed in Discord's LeaderBoard channel
*/

const bot = require('../local/bot.json' );
const { MessageEmbed } = require('discord.js')
const getAccounts = require( '../functions/getSortedAccounts' );
const getDate = require('./getDate');

const emojis = [
  '<:first_place:905313532055257099>',
  '<:second_place:905313492473643069>',
  '<:third_place:905313659687936030>'
];

const setLeaderBoard = async ( client ) => {
  try {
    // Fetch an array of object with all the scholars sorted by mmr
    let scholars = await getAccounts();
    // Replace test channel_id with live channel id
    let leaderBoardChannel =  await client.channels.fetch( bot.channel_ID );
    createEmbedMessage( leaderBoardChannel, scholars );
    
  } catch ( error ) {
    return
  }
}

const createEmbedMessage = async ( leaderBoardChannel, scholars ) => {

  const embedMessage = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('<:trophy:905316507419045898>  RANKING  <:trophy:905316507419045898>')
    .setDescription('\u200b \u200B');
    
    for ( let i = 0; i < 3; i++ ) {
      embedMessage.addFields( { name: `${ emojis[i] } ${ scholars[i].name.toUpperCase() }  |  ${ scholars[i].manager.toUpperCase() }`, value: `${ scholars[i].mmr.toString() }`, inline: true } );
    }
    embedMessage.addFields( { name: '\u200B',  value: '\u200B' } );
    embedMessage.addFields( { name: "SCHOLAR", value: '\u200B', inline: true } );
    embedMessage.addFields( { name: "MANAGER", value: '\u200B', inline: true } );
    embedMessage.addFields( { name: "<:trophy:905316507419045898> MMR <:trophy:905316507419045898>", value: '\u200B', inline: true } );

    let count    = 0;
    let names    = '';
    let managers = '';
    let mmr      = '';

    for ( let j = 3; j <= scholars.length; j++ ) {
      count ++;
      if ( count === 15 || j === scholars.length ) {
        count = 0;
        embedMessage.addFields( { name: `${ names.toString() } `,    value: '\u200B', inline: true } )
        embedMessage.addFields( { name: `${ managers.toString() }`,  value: '\u200B', inline: true } )
        embedMessage.addFields( { name: `${ mmr.toString() } `,      value: '\u200B', inline: true } )
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
    if ( Array.from( msg ).length === 0 ) {
      console.log( `Leaderboard has been created at: ${ getDate() }` );
      embedMessage.setFooter( `Created at: ${ getDate() }` );
      leaderBoardChannel.send( { embeds: [embedMessage] });
    } else {
      console.log( `Leaderboard has been updated at ${ getDate() }` );
      embedMessage.setFooter( `Last update: ${ getDate() }` );
      msg.first().edit( { embeds: [embedMessage] } );
    }
  }
}

module.exports = setLeaderBoard;