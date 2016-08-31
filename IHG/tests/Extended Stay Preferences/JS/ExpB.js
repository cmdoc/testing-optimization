// Hide the search results until we do all of our work. Then display it again.
Bootstrapper.MVT.injectCSS("div#searchResultContainer { display: none; }");

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


function taoReSortResults() {
    // This will take the results returned to the browser and re-sort them with
    // all of the CW and SB properties at the top.

    // See if there are any CW and/or SB properties in the search results. If
    // so, then do all of the work.
    if (jQuery("div.resRow[data-brandcode=cw], div.resRow[data-brandcode=sb]").length > 0) {

        // Look at all of the CW and SB rows and see if it has the .taoExStay class.
        // If not, then add it. This is what the Mango color is added to.
        jQuery("div.resRow[data-brandcode=cw], div.resRow[data-brandcode=sb]").each(function () {
            if (!jQuery(this).hasClass("taoExStay")) {
                jQuery(this).addClass("taoExStay");
            }
        });

        // Move all of the CW and SB results to the top
        jQuery("div#searchResultContainer").prepend(jQuery("div.resRow[data-brandcode=cw], div.resRow[data-brandcode=sb]"));

        // Create the heading for the new section and then put it into a <p> tag
        // at the top of the search results
        var taoHeading = "Long term stays deserve special treatment. Check out Candlewood and Staybridge Suites for your upcoming stay.";
        jQuery("div#searchResultContainer").prepend("<p class='taoHeading'>" + taoHeading + "</p>");

        // Put the "Apartment Style" banner on each hotel thumbnail image
        jQuery("div.resRow[data-brandcode=cw], div.resRow[data-brandcode=sb]").find("div.col-md-12 .picture").append('<div class="newBanner"><span>Apartment Style</span></div>');

        // Wrap all of the CW and SB results with the Mango border. To do this, 
        // first we get the number of items returned with the :last call.
        // Then we loop through the items grabbed with the :last call (there will
        // either be one or two returned since we are searching for CW and SB).
        // For the last one returned, add the two special CSS classes so we can 
        // properly put the Mango border around them all.
        var taoLastRow = jQuery(".taoExStay:last").length;
        jQuery(".taoExStay:last").each(function (taoIndex) {
            if (taoIndex === taoLastRow - 1) {
                jQuery(this).addClass("taoLast");
                jQuery(this).find(".pillBox").addClass("taoPillBox");
            }
        });

        // Since the user is going to see something re-sorted, trigger a click 
        // track event so we can measure this is the Target Metrics.
        mboxPixelTrack('mboxClickTrack', 'clicked=5daySearch');

    }

}

///////////////////////////////////////////////////////////////////////////////
// M A I N 
jQuery(document).ready(function () {

    // Get the number of days for this search just once and then use it 
    // multiple times.
    var taoNumOfDays = taoDetermineNumOfDays();

    // If taoTotalDays is 5 or greater, then re-order the search results
    // and feature the extended stay hotels at the top.
    if (taoNumOfDays >= 5) {
        taoReSortResults();
    }

    // Show the search results
    jQuery("div#searchResultContainer").show();

    // Track for when the user clicks on the "Show More" or "Show All"
    // buttons. If the number of days is 5 or greater, then when the 
    // re-sort the page when ajaxComplete() finishes.
    jQuery("body").on("click", "#showMoreLink, #showAllLink", function () {

        if (taoNumOfDays >= 5) {

            localStorage.setItem("taoShowClick", "true");

            // Wait until the ajax call is complete then re-sort the results
            jQuery(document).ajaxComplete(function (event, request, settings) {

                if (localStorage.getItem("taoShowClick") == "true") {

                    // Send the command to resort the results
                    taoReSortResults();

                    // Figure out how many rows there are and set the scroll
                    // time to 50 milliseconds per
                    var taoResRows = jQuery(".resRow").length * 50;

                    // Show the results area and scroll to the top
                    $('html, body').animate({scrollTop: 285}, taoResRows);

                }

                localStorage.setItem("taoShowClick", "false");

            });

        }

    });

});