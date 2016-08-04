// Hide the search results until we do all of our work. Then display it again.
Bootstrapper.MVT.injectCSS("div#searchResultContainer { display: none; }");

// make a function to pull out values from the GET url. Call it like this:
//      var blog = getUrlParameter('blog');
var getUrlParameter = function getUrlParameter(sParam) {
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

// Takes two Date objects and determines how many days are between them.
function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

jQuery(document).ready(function () {

    // We have to wrap this in an .ajaxComplete call so the code will rerun
    // when the user clicks on "Show More" or "Show All".
    jQuery(document).ajaxComplete(function (event, request, settings) {

        // Create a var that will track if the user has clicked on the 
        // "Show More" or "Show All" button at the bottom of the search
        // results.
        var taoShowButtonClick = false;

        // If the user clicked on the "Show More" or "Show All" buttons,
        // then run through this code.  Otherwise, skip it.
        if (taoShowButtonClick) {

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
            var taoTotalDays = daydiff(taoCheckInDate, taoCheckOutDate);

            // If taoTotalDays is 5 or greater, then re-order the search results
            // and feature the extended stay hotels at the top.
            if (taoTotalDays >= 5) {

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
                var taoLastRow = jQuery("div.resRow[data-brandcode=cw]:last, div.resRow[data-brandcode=sb]:last").length;
                jQuery("div.resRow[data-brandcode=cw]:last, div.resRow[data-brandcode=sb]:last").each(function (taoIndex) {
                    if (taoIndex === taoLastRow - 1) {
                        jQuery(this).addClass("taoLast");
                        jQuery(this).find(".pillBox").addClass("taoPillBox");
                    }
                });
            }

            // reset the button to false so we don't run through the 
            // ajaxComplete() function until the user clicks on the 
            // "Show More" or "Show All" button again.
            taoShowButtonClick = false;
        }

        // Show the search results
        jQuery("div#searchResultContainer").show();

        // Track for when the user clicks on the "Show More" or "Show All"
        // buttons. We use this to determine if we need to run through the
        // ajaxComplete() function, which we only want to do if the user
        // clicks on one of these buttons.
        jQuery("#showMoreLink input, #showAllLink input").on("click", function () {
            taoShowButtonClick = true;
        });

    });

});