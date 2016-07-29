jQuery(document).ready(function() {

    jQuery(document).ajaxComplete(function (event, request, settings) {

        // Move all of the CW and SB results to the top
        jQuery("div#searchResultContainer").prepend(jQuery("div.resRow[data-brandcode=cw], div.resRow[data-brandcode=sb]"));

        // Create the heading for the new section and then put it into a <p> tag
        // at the top of the search results
        var taoHeading = "Long term stays deserve special treatment. Check out Candlewood and Staybridge Suites for your upcoming stay.";
        jQuery("div#searchResultContainer").prepend("<p class='taoHeading'>" + taoHeading + "</p>");

        // Put the "Apartment Style!" banner on each hotel thumbnail image
        jQuery("div.resRow[data-brandcode=cw], div.resRow[data-brandcode=sb]").find("div.col-md-12 .picture").append('<div class="newBanner"><span>Apartment Style!</span></div>');

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

        // Show the search results
        jQuery("div#searchResultContainer").show();

    });

});