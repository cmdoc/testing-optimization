//Grab the check-in day and month
var taoCheckInDay = page.param("qCiD"),
    taoCheckInMonth = page.param("qCiMy");

// Change check-in month and day into a Date object
var taoCheckInYear = taoCheckInMonth.substring(2, 6); // Creates something like 2016
taoCheckInMonth = taoCheckInMonth.substring(0, 2); // Should now just be 00 through 11
var taoCheckInDate = new Date(taoCheckInYear, taoCheckInMonth, taoCheckInDay);
var taoToday = new Date();

// Take those dates and determine how far away is the check-in date
return Math.round((taoCheckInDate - taoToday) / (1000 * 60 * 60 * 24));
