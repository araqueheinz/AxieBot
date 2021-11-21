/*
  Functions tha will get all the accounts
  and return an array with all the accounts
  sorted by the given parameter ( 'slp', 'mmr').
*/
const axios = require( 'axios' ).default;
const accounts = require( '../local/accounts.json' );
const heinzAccounts = require( '../local/heinzAccounts.json' );

// Save all ronin addresses into one array
let roninAddresses;
let selectedAccounts;

// GET all account by using ronin addresses
const getAccounts = async ( sortBy = 'mmr', accountOwner = '' ) => {
  try {
    if ( accountOwner === 'heinz' ) {
      roninAddresses = heinzAccounts.map( account => { return account[ 'ronin' ];  });
      selectedAccounts = heinzAccounts;
    } else {
      roninAddresses = accounts.map( account => { return account[ 'ronin' ];  });
      selectedAccounts = accounts;
    }
    // Axis API GET call
    const response = await axios.get( "https://game-api.axie.technology/api/v1/" + roninAddresses.toString() );
    // Turn JSON into ARRAY of Objects
    const dataArray = Object.values( response.data ).map( data => { return data } );
    // Function Call
    return buildScholarObject( dataArray, sortBy );

  } catch ( error ) {
    console.error( error );
    return;
  }
}

// Create an Array of objects with the data we need
const buildScholarObject = ( data, sortBy ) => {
  try {
    let scholarsObjectArray = []
    // Create custom object with the data we need
    for (let i = 0; i < selectedAccounts.length; i ++) {
      let scholar = {
        "manager": selectedAccounts[i].manager,
        "name" : selectedAccounts[i].name,
        "mmr" : data[i].mmr,
        "accountName" : data[i].name,
        "ronin" : selectedAccounts[i].ronin, 
        "link" : "https://marketplace.axieinfinity.com/profile/" + selectedAccounts[i].trueRonin + "/axie/",
        "totalSLP": data[i].in_game_slp
      }
      scholarsObjectArray.push( scholar );
    }
    // Function call
    return sortArrayByMmr( scholarsObjectArray, sortBy );
  } catch ( error ) {
    console.error( error );
    return;
  }
}

const sortArrayByMmr = ( scholars, sortBy ) => {
  try {
    if( sortBy === 'slp' ) {
      let sortedScholars = scholars.sort ( ( a, b ) => { return  b.totalSLP - a.totalSLP } );
      return sortedScholars;
    } else if( sortBy === 'mmr' ) {
      let sortedScholars = scholars.sort ( ( a, b ) => { return  b.mmr - a.mmr } );
      return sortedScholars;
    } else {
      let sortedScholars = scholars.sort ( ( a, b ) => { return  b.mmr - a.mmr } );
      return sortedScholars;
    }

  }  catch ( error ) {
    console.error( error );
    return;
  }
}

module.exports = getAccounts;