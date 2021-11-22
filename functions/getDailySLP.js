const fs = require( 'fs' );

const getAccounts = require( '../functions/getSortedAccounts' );
const days        = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months      = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getDailySLP = async ( accountOwner = '') => {
  const d = new Date();
  const accounts      = await getAccounts( 'slp', accountOwner );
  const accountsBySlp = {};

  accounts.forEach( element => {
    accountsBySlp[element.name] = {
      "TotalSLP" : element.totalSLP
    };
  });
  fs.writeFile( `${ d.getMonth() }-${ d.getDate() }-${ d.getFullYear() }.json`, JSON.stringify( accountsBySlp ), ( error ) => {
    if ( error ) return console.log( error )
  } )
}

module.exports = getDailySLP;