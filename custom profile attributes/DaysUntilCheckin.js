var taoCheckInDay, taoCheckInMonth = '';

// Grab the URL from the page and split out all of the key=>value pairs
var sPageURL = decodeURIComponent(page.url),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === "qCiD") {
        taoCheckInDay = sParameterName[1] === undefined ? true : sParameterName[1];
    }

    if (sParameterName[0] === "qCiMy") {
        taoCheckInMonth = sParameterName[1] === undefined ? true : sParameterName[1];
    }

}

// Figure out the dates being searched for. These are grabbed from
// the URL and need to be formatted to a Date object so we
// can determine how many total consecutive days are being booked.
// This code will work for all dates, whether they span over two
// months or over two different years. It should also correctly
// accommodate leap years.
var taoCheckInYear = taoCheckInMonth.substring(2, 6); // Should just get something like 2016
taoCheckInMonth = taoCheckInMonth.substring(0, 2); // Should now just be 00 through 11

// Now that we have all of the parts, let's piece them together
// into a real Date object.
var taoCheckInDate = new Date(taoCheckInYear, taoCheckInMonth, taoCheckInDay);
var taoToday = new Date();

// Now take those dates and figure out how many consecutive days the
// search is for
// return taoDaydiff(taoCheckInDate, taoCheckOutDate);
// return Math.round((taoCheckOutDate - taoCheckInDate) / (1000 * 60 * 60 * 24));
return Math.round((taoCheckInDate - taoToday) / (1000 * 60 * 60 * 24));

