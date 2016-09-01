// Hide the search results until we do all of our work. Then display it again.
Bootstrapper.MVT.injectCSS("div#searchResultContainer { display: none; }");

///////////////////////////////////////////////////////////////////////////////
// F U N C T I O N S

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

    }

}

///////////////////////////////////////////////////////////////////////////////
// M A I N 
jQuery(document).ready(function () {

    // Re-order the search results and feature the extended stay hotels at the
    // top of the list
    taoReSortResults();

    // Show the search results
    jQuery("div#searchResultContainer").show();

    // Track for when the user clicks on the "Show More" or "Show All"
    // buttons. If the number of days is 5 or greater, then when the 
    // re-sort the page when ajaxComplete() finishes.
    jQuery("body").on("click", "#showMoreLink, #showAllLink", function () {

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

    });

});