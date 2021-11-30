const getAccounts        = require( "./getAccounts" );
const sortAccounts       = require( "./sortAccounts" );
const buildScholarObject = require( "./buildScholarObject" );
const accounts           = require( "../../local/accounts.json" );

const main = async ( allAccounts = accounts, sortby = '' ) => {
  return sortedAccounts = sortAccounts( buildScholarObject( await getAccounts( allAccounts ) ), sortby );
}


module.exports = main;