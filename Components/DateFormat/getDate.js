// Function tha will get the Weekday, Month, Day and Time
const weekday = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
const months  = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

const getDate = () => {
  let today = new Date();
  let minutes = ( today.getMinutes() < 10 ) ? `0${ today.getMinutes() }` : `${ today.getMinutes() }`;
  let seconds = ( today.getSeconds() < 10 ) ? `0${ today.getSeconds() }` : `${ today.getSeconds() }`;
  let hours = ( today.getHours() < 10 ) ? `0${ today.getHours() }` : `${ today.getHours() }`;
  let time = `${ weekday[ today.getDay() ] }, ${ months[ today.getMonth() ] } ${ today.getDate() } at: ${ hours }:${ minutes }:${ seconds }`;
  return time;
}

module.exports = getDate;