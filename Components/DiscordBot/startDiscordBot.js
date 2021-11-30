const { Client, Intents } = require( "discord.js" );
const setLeaderboard      = require( "./setLeaderboard" ); 
const bot                 = require( "../../local/bot.json" );
const client              = new Client( { intents: [ Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES" ] } );

const startBot = async( scholars ) => {
  /* Toggle between test_token & token */
  await client.login( bot.token );
  /* Toggle between test_channel_ID & channel_ID */
  const leaderBoardChannel =  await client.channels.fetch( bot.channel_ID );
  if ( leaderBoardChannel ) {
    console.log( `\nChannel: ${ leaderBoardChannel.name } found!` );
    botReady( leaderBoardChannel, scholars );
  } else {
    console.log( "ERROR! Could not get the leaderboard channel..." )
  }
}

const botReady = async ( leaderBoardChannel, scholars ) => {
  console.log( "Attempting to start the bot..." );
  await client.on( "ready", () => {
    console.log( `This bot is now online: ${ client.user.tag }` );
    // setLeaderboard( leaderBoardChannel, scholars );
  });
}

module.exports = startBot;
