   ///////////////////////////////
  //   GET ALL RONIN ACCOUNTS  //
 //   AND SORT THEM BY MMR    //
///////////////////////////////

const axios = require( 'axios' ).default;
const accounts = require( '../local/accounts.json' );

// Save all ronin addresses into one array
const roninAddresses = accounts.map( account => { return account[ 'ronin' ];  });

// GET all account by using ronin addresses
const getAccounts = async () => {
  try {
    // Axis API GET call
    const response = await axios.get( "https://game-api.axie.technology/api/v1/" + roninAddresses.toString() );
    // Turn JSON into ARRAY of Objects
    const dataArray = Object.values( response.data ).map( data => { return data } );
    // Function Call
    return buildScholarObject( dataArray );

  } catch ( error ) {
    console.error( error );
    return;
  }
}

// Create an Array of objects with the data we need
const buildScholarObject = data => {
  let scholarsObjectArray = []

  try {
    // Create custom object with the data we need
    for (let i = 0; i < accounts.length; i ++) {
      let scholar = {
        "manager": accounts[i].manager,
        "name" : accounts[i].name,
        "mmr" : data[i].mmr,
        "accountName" : data[i].name,
        "ronin" : accounts[i].ronin, 
        "link" : "https://marketplace.axieinfinity.com/profile/" + accounts[i].trueRonin + "/axie/"
      }
      scholarsObjectArray.push( scholar );
    }
    // Function call
    return sortArrayByMmr( scholarsObjectArray )
  } catch ( error ) {
    console.error( error );
    return;
  }
}

const sortArrayByMmr = scholars => {
  try {
    let sortedScholars = scholars.sort ( ( a, b ) => { return  b.mmr - a.mmr } );
    return sortedScholars;
  }  catch ( error ) {
    console.error( error );
    return;
  }
}

module.exports = getAccounts;