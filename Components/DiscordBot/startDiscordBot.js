const { Client, Intents } = require( "discord.js" );
const getAccounts         = require( "../Accounts/index" );
const getManagersCut      = require( "../Accounts/getManagersCut" );
const setLeaderboard      = require( "./setLeaderboard" ); 
const bot                 = require( "../../local/bot.json" );
const heinzAccounts       = require( "../../local/heinzAccounts.json" );
const client              = new Client( { intents: [ Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES" ] } );

client.on( "ready", async () => {

  console.log( `\nDISCORD BOT: "${ client.user.tag }" is now ONLINE!` );

  setInterval( async () => {
    
    /* Functions that takes accounts and the % cut and returns SLP price and managers cut*/
    await getManagersCut( heinzAccounts, 60 );

    /* Functions that "can or not" take 2 parameters, an accounts and a sort parameter. By default it returns an array objects of all the accounts sorted by mmr */
    const allAccounts = await getAccounts();

    /* Toggle between test_channel_ID & channel_ID */
    const leaderBoardChannel =  await client.channels.fetch( bot.test_channel_ID );

    if ( leaderBoardChannel ) {
      console.log( `\nChannel: ${ leaderBoardChannel.name } found!` );

      setLeaderboard( leaderBoardChannel, allAccounts );

    } else {
      console.log( "\nERROR! Could not get the leaderboard channel..." );
    }

  }, 10000 ); // 5000 = 5 seconds 7200000 = 2 hour |  6300000 = 1 hour & 45 min  | 3600000 = 1 hour | 2700000 = 45 min | 1800000 = 30 min
});


const startBot = async() => {
  /* Toggle between test_token & token */
  client.login( bot.test_token );
}

module.exports = startBot;