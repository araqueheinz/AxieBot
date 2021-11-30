const { Client, Intents } = require( "discord.js" );
const setLeaderboard      = require( "./setLeaderboard" ); 
const bot                 = require( "../../local/bot.json" );
const client              = new Client( { intents: [ Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES" ] } );

globalScholars = [];

const startBot = async( scholars ) => {
  // Set the Global Scholar Variable to the received Scholars
  globalScholars = [ ...scholars ];
  /* Toggle between test_token & token */
  client.login( bot.test_token );
}

client.on( "ready", async () => {
  console.log( `\nDISCORD BOT: "${ client.user.tag }" is now ONLINE!` );
  /* Toggle between test_channel_ID & channel_ID */
  const leaderBoardChannel =  await client.channels.fetch( bot.test_channel_ID );
  if ( leaderBoardChannel ) {
    console.log( `Channel: ${ leaderBoardChannel.name } found!` );
    setLeaderboard( leaderBoardChannel, globalScholars );
  } else {
    console.log( "ERROR! Could not get the leaderboard channel..." );
  }
});

module.exports = startBot;