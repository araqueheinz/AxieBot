const sortScholars = ( scholars, sortBy ) => {
  try {
    if( sortBy === 'slp' ) {
      console.log( "Scholar Accounts have been sorted by: SLP" );
      return scholars.sort ( ( a, b ) => { return  b.totalSLP - a.totalSLP } );
    } else {
      console.log( "Scholar Accounts have been sorted by: MMR" );
      return scholars.sort ( ( a, b ) => { return  b.mmr - a.mmr } );
    }
  }  catch ( error ) {
    console.error( error );
    return;
  }
}

module.exports = sortScholars;