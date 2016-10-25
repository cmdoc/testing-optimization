jQuery("document").ready(function(){

    // Start working on the page, hitting one rate type at a time
    jQuery(".rateTypeLineItems").each(function(i) {

        // Put this .rateTypeLineItems instance into a variable for future
        // referencing.
        var $taoThisRoom = jQuery(this);

        // create a div for any rates we find that we need to move
        var $taoSpecialOfferGroupingDiv = jQuery("<div class='taoSpecialOfferGroup'></div>");
        $taoSpecialOfferGroupingDiv.append("<div class='taoSOGHeader taoSOGHeaderPadding'><input class='cssButton bcex' value='Special Offers &amp; Deals Go Here'>");
        $taoSpecialOfferGroupingDiv.append("<div class='taoSOGrates' id='taoSOG" + i + "'></div>");
        $taoThisRoom.prepend($taoSpecialOfferGroupingDiv);

        // Go through all of the rates for this room and move the special
        // offers and secondary rates to the new div
        $taoThisRoom.find(".regularRates, .secondaryRates").each(function() {

            // Look for any that does not contain an div.upSellContainter or
            // div.spotlightPointsAndCash. We have some work to do with those.
            if (jQuery(this).find("div.upSellContainer").length == 0 && jQuery(this).find("div.spotlightPointsAndCash").length == 0) {

                // Put this into the new div we just created
                jQuery("#taoSOG" + i).append(jQuery(this));
//                $taoSpecialOfferGroupingDiv.append(jQuery(this));
            }

        });

        // Add a Hide button to the new div
        jQuery("#taoSOG" + i).append("<div class='taoSOGFooter'><input class='cssButton bcex' value='Hide Special Offers &amp; Deals'>");

    });

    // Put in all the code and functionality to cause the new button to open
    // and close the grouped rates.
    jQuery(".taoSOGHeader, .taoSOGFooter").on("click", "input", function () {

        // find the parent div
        var $taoSOGDiv = jQuery(this).closest(".taoSpecialOfferGroup");

        // toggle the .taoSOGpadding and .taoSOGHeaderPadding classes so the
        // open or closed group has the right padding
        $taoSOGDiv.toggleClass("taoSOGpadding");
        $taoSOGDiv.find(".taoSOGHeader").toggleClass("taoSOGHeaderPadding");

        // toggle the rates being offered in this .taoSpecialOfferGroup
        $taoSOGDiv.find(".taoSOGrates").toggle(400);

    });

});