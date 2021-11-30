/*
  This function will take all the accounts
  and will create an embed message that will
  be displayed in Discord's LeaderBoard channel
*/

const bot = require('../local/bot' );
const { MessageEmbed } = require('discord.js')
const getAccounts = require( '../Components/getSortedAccounts' );
const getDate = require('./getDate');

const emojis = [
  '<:first_place:905313532055257099>',
  '<:second_place:905313492473643069>',
  '<:third_place:905313659687936030>'
];

const globalChampionsGif = [
  'https://media.giphy.com/media/1yjZXySg7tSohpcmUM/giphy.gif',
  'https://media.giphy.com/media/ORjPQ0Fc43cp3hDzef/giphy.gif',
  'https://media.giphy.com/media/a0h7sAqON67nO/giphy.gif',
  'https://media.giphy.com/media/l4FGztRST7RVKUhoI/giphy.gif',
  'https://media.giphy.com/media/8qQtJM19hUPjG/giphy.gif',
  'https://media.giphy.com/media/vnMdLhS2vs35fTXIk0/giphy.gif',
  'https://media.giphy.com/media/HyTbdIwBzphgk/giphy.gif',
  'https://media.giphy.com/media/f7dKnkz57H7aqjOXUQ/giphy.gif',
  'https://media.giphy.com/media/jOQAp4RQgxiIswO2ah/giphy.gif',
  'https://media.giphy.com/media/mJlJyzCKcNFVN49ODE/giphy.gif',
  'https://media.giphy.com/media/K3RxMSrERT8iI/giphy.gif',
  'https://media.giphy.com/media/w84Mj6unuV1JlLxVqW/giphy.gif',
  'https://media.giphy.com/media/QaN6eYS5k4nja/giphy.gif',
  'https://media.giphy.com/media/14rk56liuv7mQo/giphy.gif',
  'https://media.giphy.com/media/8gQR12M5d4kPMRYoC1/giphy.gif',
];

let globalCount = 3;
let globalScholars = []

const setLeaderBoard = async ( client ) => {
  try {
    // Fetch an array of object with all the scholars sorted by mmr
    let scholars = await getAccounts();
    // Fill global scholars variable with scholars
    globalScholars = [ ...scholars ];
    // Replace test channel_id with live channel id
    let leaderBoardChannel =  await client.channels.fetch( bot.channel_ID );
    
    if ( leaderBoardChannel ) {
      // Fetch a collection of messages with a limit of 1 to ensure that we get only one message
      let messages = await leaderBoardChannel.messages.fetch();
      messages.map( msg => msg.delete()) ;

      setPodiumScholars( leaderBoardChannel );
      while ( globalScholars.length > 0 ){
        await createEmbedMessage( leaderBoardChannel );
      }
      console.log( `\nLeader Board set SUCCESSFULLY!\n` );

      globalCount = 3;
    }
  } catch ( error ) {
    console.log( error );
    console.log( `\nSetting Leader Board has FAILED!\n` );
  }
  console.log( `Last update: ${ getDate() }` );
}

const setPodiumScholars = async ( leaderBoardChannel ) => {
  try {
    let ran = Math.floor( Math.random() * globalChampionsGif.length );
    const podiumMessage = new MessageEmbed()
      .setColor('#ffee00')
      .setTitle('<:trophy:905316507419045898>  RANKING  <:trophy:905316507419045898>')
      .setDescription('\u200B')
      for ( let i = 0; i < 3; i++ ) {
        podiumMessage.addFields( { name: `${ emojis[i] } ${ globalScholars[i].name.toUpperCase() }`, value: `[${ globalScholars[i].mmr }](${globalScholars[i].link})   |  ${ globalScholars[i].manager }`, inline: true } );
        
      }
      podiumMessage.setImage( `${ globalChampionsGif[ ran ] }` )
      globalScholars.splice( 0, 3 );
      // Check if msg collection is empty then create message
      leaderBoardChannel.send( { embeds: [podiumMessage] } );
  } catch ( error ) {
    console.log( error );
  }
}

const createEmbedMessage = async ( leaderBoardChannel ) => {
  try {
    const embedMessage = new MessageEmbed()
    .setColor('#0099ff')
    .setDescription('\u200B');
    for ( let i = 0; i < globalScholars.length  && i < 24; i++ ) {
      embedMessage.addFields( { name: `\` ${ globalCount + 1 }. \`${globalScholars[i].name.toUpperCase() }`, value: `[${ globalScholars[i].mmr }](${globalScholars[i].link}) | ${ globalScholars[i].manager }`, inline: true } );
      globalCount = globalCount + 1;
    }
    globalScholars.splice( 0, 24 );

    leaderBoardChannel.send( { embeds: [embedMessage] } )
  } catch ( error ) {
    console.log( error );
  }
}

module.exports = setLeaderBoard;