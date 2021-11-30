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
    let leaderBoardChannel =  await client.channels.fetch( bot.test_channel_ID );
    createMessage( leaderBoardChannel, scholars );
  } catch ( error ) {
    return
  }
}

const createMessage = async ( leaderBoardChannel, scholars ) => {
  try {
    // If channel exists
    if ( leaderBoardChannel ) {
      // Fetch all current messages in the channel
      let allMessages = await leaderBoardChannel.messages.fetch();
      // Delete all current messages in the channel
      allMessages.map( msg => {
        msg.delete();
      });

      leaderBoardChannel.send( `:trophy:  RANKINGS  :trophy: `);
      leaderBoardChannel.send( `:first_place: **${ scholars[0].name.toUpperCase() }**  -  *${ scholars[0].manager }*   __${ scholars[0].mmr }__ `);



    }



  } catch ( error ) {
    console.log( error );
  }
}

module.exports = setLeaderBoard;