jQuery("document").ready(function(){

    jQuery(".regularRates, .secondaryRates").each(function(i) {

        // create a div for any rates we find that we need to move
        var $taoSpecialOfferGroupingDiv = jQuery("<div class='taoSpecialOfferGroup' id='taoSOG" + i + "'></div>");

        // Look for any that does not contain an div.upSellContainter or
        // div.spotlightPointsAndCash. We have some work to do with those.
        if (jQuery(this).find("div.upSellContainer").length == 0 || jQuery(this).find("div.spotlightPointsAndCash").length == 0) {

            // Put this into the new div we just created

        }

    });

    // Now that we are done looping through all of the rate offerings, take
    // the rates we collected and put them in their new location


    // Create the new HTML/CSS for the Special Offers & Deals button


    // Put in all the code and functionality to cause the new button to open
    // and close the grouped rates.


});