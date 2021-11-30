const getAccounts    = require( "../Components/Accounts/index" );
const getManagersCut = require( "../Components/Accounts/getManagersCut" );
const startBot       = require( "../Components/DiscordBot/index" );
const accounts       = require( "../local/accounts.json" );
const heinzAccounts  = require( "../local/heinzAccounts.json" );

( async () => {
  // setInterval( async () => {
    /* Functions that takes accounts and the % cut and returns SLP price and managers cut*/
    await getManagersCut( heinzAccounts, 60 );
     /* Functions that takes accounts and can take sort parameter and returns and array of objects*/
    const allAccounts = await getAccounts( accounts );
    /* Function to start the bot, set the leaderboard */
    await startBot( allAccounts );
  // }, 10000 ); // 5000 = 5 seconds 7200000 = 2 hour |  6300000 = 1 hour & 45 min  | 3600000 = 1 hour | 2700000 = 45 min | 1800000 = 30 min
})();