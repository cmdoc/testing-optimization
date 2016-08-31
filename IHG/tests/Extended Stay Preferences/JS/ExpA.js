///////////////////////////////////////////////////////////////////////////////
// F U N C T I O N S
function taoDetermineNumOfDays() {
    // Figure out the dates being searched for. These are grabbed from
    // the URL and need to be formatted to a Date object so we
    // can determine how many total consecutive days are being booked.
    // This code will work for all dates, whether they span over two
    // months or over two different years. It should also correctly
    // accomodate leap years.
    var taoCheckInDay = getUrlParameter("qCiD"); // 01 through 31
    var taoCheckOutDay = getUrlParameter("qCoD"); // 01 through 31
    var taoCheckInMonth = getUrlParameter("qCiMy"); // 002016 (Jan) through 112016 (Dec)
    var taoCheckOutMonth = getUrlParameter("qCoMy"); // 002016 (Jan) through 112016 (Dec)
    var taoCheckInYear = taoCheckInMonth.substring(2, 6); // Should just get 2016
    var taoCheckOutYear = taoCheckOutMonth.substring(2, 6); // Should just get 2016
    taoCheckInMonth = taoCheckInMonth.substring(0, 2); // Should now just be 00 through 11
    taoCheckOutMonth = taoCheckOutMonth.substring(0, 2); // Should now just be 00 through 11

    // Now that we have all of the parts, let's piece them together
    // into a real Date object.
    var taoCheckInDate = new Date(taoCheckInYear, taoCheckInMonth, taoCheckInDay);
    var taoCheckOutDate = new Date(taoCheckOutYear, taoCheckOutMonth, taoCheckOutDay);

    // Now take those dates and figure out how many consecutive days the
    // search is for
    return daydiff(taoCheckInDate, taoCheckOutDate);
}

function daydiff(first, second) {
    // Takes two Date objects and determines how many days are between them.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

var getUrlParameter = function getUrlParameter(sParam) {
    // make a function to pull out values from the GET url. Call it like this:
    //      var blog = getUrlParameter('blog');
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function mboxPixelTrack(mbox) {
    // Code stolen from Adobe's Proactive Chat. This should track click events.
    var d = new Date();
    var ub = mboxFactoryDefault.getUrlBuilder().clone();
    ub.addParameter("mbox", mbox);
    ub.addParameter('mboxTime', d.getTime() - (d.getTimezoneOffset() * 60000));
    ub.addParameters(Array.prototype.slice.call(arguments).slice(1));
    var img = new Image();
    img.src = ub.buildUrl().replace("/mbox/undefined", "/mbox/ajax");
    img.style.display = "none";
    if (document.body) {
        document.body.insertBefore(img, document.body.firstChild);
    }
}

///////////////////////////////////////////////////////////////////////////////
// M A I N
jQuery(document).ready(function () {

    // trigger click tracking action when user searches for 5 or more days
    // Get the number of days for this search just once and then use it
    // multiple times.
    var taoNumOfDays = taoDetermineNumOfDays();

    // If taoTotalDays is 5 or greater, then re-order the search results
    // and feature the extended stay hotels at the top.
    if (taoNumOfDays >= 5) {
        mboxPixelTrack('mboxClickTrack', 'clicked=5daySearch');
    }

});
