const axios    = require( "axios" ).default;

/**
 * @returns an Array of Objects containing the accounts information
 */

const getAccounts = async ( accounts ) => {
  try {
    console.log( "\nFetching Accounts....." );
    // Turn all the ronin addresses into a single string separated by commas
    const roninAddresses = accounts.map( account => { return account[ 'ronin' ];  } ).join(',');
    // Axios API GET all accounts
    const response = await axios.get( "https://game-api.axie.technology/api/v1/" + roninAddresses );
    // Check if there's an empty object within the response
    Object.values( response.data ).forEach( data => { 
      // If soo, call yourself again, to try an new API call
      if ( data.mmr === undefined ){
        console.log( "API Fetch Attempt Failed" );
        getAccounts( accounts );
      }
    });
    console.log( "API Fetch Successful" );
    // Return an Array of objects
    return Object.values( response.data );
  } catch ( error ) {
    console.log( `getAccounts: ${ error }` );
  }
}

module.exports = getAccounts;