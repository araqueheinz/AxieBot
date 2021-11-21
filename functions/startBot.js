/*
  Function that will start the Interval BOT
  & Call setLeaderBoard passing the client
*/
const { Client, Intents } = require( 'discord.js' );
const bot = require('../local/bot.json' );
const client = new Client( { intents: [ Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES" ] } );
const setLeaderBoard = require( './setLeaderBoard' );

/* Toggle between test_token & token */
client.login( bot.token );

const startBotCommand = () => {
  client.on( 'ready', () => {
    console.log( `This bot is now online: ${ client.user.tag }` );

    setInterval( () => {
      try {
        setLeaderBoard( client );
      } catch ( error ) {
        console.log( `Interval has failed:\n ${ error } `);
      }
    }, 6300000 ); // 5000 = 5 seconds |  6300000 = 1 hour & 45 min  | 3600000 = 1 hour | 2700000 = 45 min | 1800000 = 30 min
  } );
}

module.exports = startBotCommand;