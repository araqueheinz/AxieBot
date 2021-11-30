const accounts = require( "../../local/accounts.json" );

// Create an Array of objects with the data we need
const buildScholarObject = ( data ) => {
  try {
    let scholarsObjectArray = []
    // Create custom object with the data we need
    for ( let i = 0; i < data.length; i ++ ) {
      let scholar = {
        "manager": accounts[i].manager,
        "name" : accounts[i].name,
        "mmr" : data[i].mmr,
        "accountName" : data[i].name,
        "ronin" : accounts[i].ronin, 
        "link" : "https://marketplace.axieinfinity.com/profile/" + accounts[i].trueRonin + "/axie/",
        "totalSLP": data[i].in_game_slp
      }
      scholarsObjectArray.push( scholar );
    }
    console.log( "Scholar Object Array has been made!" );
    return scholarsObjectArray;
  } catch ( error ) {
    console.error( error );
    con
  }
}

module.exports = buildScholarObject;