const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * 
 * @param {Date} date 
 */
export function clampDate(date) {
  let currDate = new Date();
  let dateDiff = currDate - date;

  if (Math.floor(dateDiff /= 1000) < 60) {
    // If seconds
    return Math.floor(dateDiff) + "s";
  } else if (Math.floor(dateDiff /= 60) < 60) {
    // If minutes
    return Math.floor(dateDiff) + "m";
  } else if (Math.floor(dateDiff /= 60) < 24) {
    // If hours
    return Math.floor(dateDiff) + "h";
  } else if (currDate.getFullYear() - date.getFullYear() > 0) {
    // If years
    return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
  } else {
    // If days or months
    return months[date.getMonth()] + " " + date.getDate();
  }
}

/**
 * 
 * @param {Date} date 
 */
export function fullDate(date) {
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let day = date.getDate();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let period = hour >= 12 ? "PM" : "AM";

  hour = (hour % 12) || 12;
  minute = minute < 10 ? "0" + minute : minute;

  return `${hour}:${minute} ${period} ${month} ${day}, ${year}`;
}

/**
 * 
 * @param {Date} date 
 */
export function monthYearDate(date) {
  return months[date.getMonth()] + " " + date.getFullYear();
}