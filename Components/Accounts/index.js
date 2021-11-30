const getAccounts        = require( "./getAccounts" );
const sortAccounts       = require( "./sortAccounts" );
const buildScholarObject = require( "./buildScholarObject" );

const main = async ( sortby = '' ) => {
  return sortedAccounts = sortAccounts( buildScholarObject( await getAccounts() ), sortby );
}


module.exports = main;