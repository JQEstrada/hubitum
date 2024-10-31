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