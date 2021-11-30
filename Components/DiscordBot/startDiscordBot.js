const { Client, Intents } = require( "discord.js" );
const setLeaderboard      = require( "./setLeaderboard" ); 
const bot                 = require( "../../local/bot.json" );
const client              = new Client( { intents: [ Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES" ] } );

/* Toggle between test_token & token */
client.login( bot.test_token );

const startBot = async ( scholars ) => {
  client.on( 'ready', async () => {
    /* Toggle between test_channel_ID & channel_ID */
    const leaderBoardChannel =  await client.channels.fetch( bot.test_channel_ID );
    console.log( `\nThis bot is now online: ${ client.user.tag }` );
    if ( leaderBoardChannel ) {
      setLeaderboard( leaderBoardChannel, scholars );
    } 
  });
}

module.exports = startBot;
