const getAccounts   = require( "./getAccounts" );
const axios    = require( "axios" ).default;
const coinGeckoSLP = 'https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false';

const main = async ( accounts, cut ) => {
  let allSLP = 0;
  const allAccounts = await getAccounts( accounts );
  allAccounts.forEach( element => {
    allSLP += element.in_game_slp;
  });
  const getSlpPrice = await axios.get( coinGeckoSLP );
  const slpPrice = getSlpPrice.data['smooth-love-potion'].usd;
  const managersSlpCut = allSLP * ( cut / 100 );
  const managersCut = managersSlpCut * slpPrice;
  console.log( `Current SLP price: ${ slpPrice.toFixed( 6 ) }` );
  console.log( `Managers Cut at ${cut}%: ${ managersSlpCut } SLP, a total of \$${ managersCut.toFixed( 2 ) } ` );
}

module.exports = main;