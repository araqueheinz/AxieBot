const getAccounts = require( "../Components/Accounts/index" );
const startBot    = require( "../Components/DiscordBot/index" );

const main = async () => {
  const allAccounts = await getAccounts();
  startBot( allAccounts );
}

main();