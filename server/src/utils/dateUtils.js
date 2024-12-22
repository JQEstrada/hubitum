/*
    * Returns oldest date possible. If dateIn older than 365 days, return date from 365 days ago
    * @param dateIn - Date object
    * 
*/
exports.getOldestDatePossible = function (dateIn) {
        
    const currentDate = new Date().setHours(0,0,0);
    const yesterday = dateIn.setHours(0,0,0)
    const diff = currentDate - yesterday
    const diffDays = Math.floor((new Date(diff)) / (1000*60*60*24))
    let returnDate = new Date()
    if(diffDays>365) {
        returnDate = date.setDate(date.getDate() - 365)
    } else {
        returnDate = dateIn
    }

    return returnDate
    
}

/*
    * Returns a list of days that constitute the week (monday to sunday) where a given day is included
    * @param dateIn - Date object
    * 
*/
exports.getWeekFromDay = function (dateIn) {

    const date = new Date(dateIn); // Make a copy of the input date to avoid mutating it
    const dayOfWeek = date.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    
    // Calculate the date of the Monday of the week
    const monday = new Date(date);
    monday.setDate(date.getDate() - ((dayOfWeek + 6) % 7)); // Adjust to Monday
    
    // Generate dates for the whole week (Monday to Friday)
    const weekDays = [];
    for (let i = 0; i < 5; i++) {
      const weekDay = new Date(monday);
      weekDay.setDate(monday.getDate() + i);
      weekDays.push(weekDay);
    }
    
    return weekDays;

}
/*
    * Returns a list of days that constitute the week (monday to sunday) where a given day is included
    * @param dateIn - Date object
    * 
*/
exports.getWeekMondayFromDay = function (dateIn) {

    const date = new Date(dateIn); // Make a copy of the input date to avoid mutating it
    const dayOfWeek = date.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    
    // Calculate the date of the Monday of the week
    const monday = new Date(date);
    monday.setDate(date.getDate() - ((dayOfWeek + 6) % 7)); // Adjust to Monday
    
    return new Date(monday);

}
/*
    * Returns the given date minus the given number of months
    * @param date - Date object
    * @param months - Months to subtract
    * 
*/
exports.getWsubtractMonth = function(date, months) {
    let d = date.getDate();
    date.setMonth(date.getMonth() - months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }