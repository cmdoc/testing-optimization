jQuery("document").ready(function(){

    // Create an image tag for the down caret for use in the SOG header
    var taoDownCaret = "<svg class='taoCaret'><use xlink:href='#tao_down_caret' /></svg>";
    var taoUpCaret = "<svg class='taoCaret'><use xlink:href='#tao_up_caret' /></svg>";

    // Start working on the page, hitting one rate type at a time
    jQuery(".rateTypeLineItems").each(function(i) {

        // Put this .rateTypeLineItems instance into a variable for future
        // referencing.
        var $taoThisRoom = jQuery(this);

        // create a div for any rates we find that we need to move
        var $taoSpecialOfferGroupingDiv = jQuery("<div class='taoSpecialOfferGroup'></div>");
        $taoSpecialOfferGroupingDiv.append("<div class='taoSOGHeader taoSOGHeaderPadding'>Special Offers &amp; Deals " + taoDownCaret + "</div>");
        $taoSpecialOfferGroupingDiv.append("<div class='taoSOGrates' id='taoSOG" + i + "'></div>");
        $taoSpecialOfferGroupingDiv.insertBefore($taoThisRoom.find(".viewAllRatesLink"));

        // Go through all of the rates for this room and move the special
        // offers and secondary rates to the new div
        $taoThisRoom.find(".regularRates, .secondaryRates").each(function() {

            // Look for any that does not contain an div.upSellContainter or
            // div.spotlightPointsAndCash. We have some work to do with those.
            if (jQuery(this).find("div.upSellContainer").length == 0 && jQuery(this).find("div.spotlightPointsAndCash").length == 0) {

                // Put this into the new div we just created
                jQuery("#taoSOG" + i).append(jQuery(this));

            }

        });

    });

    // Put in all the code and functionality to cause the new button to open
    // and close the grouped rates.
    jQuery(".taoSOGHeader").on("click", function () {

        // find the parent div
        var $taoSOGDiv = jQuery(this).closest(".taoSpecialOfferGroup");

        // toggle the rates being offered in this .taoSpecialOfferGroup
        $taoSOGDiv.find(".taoSOGrates").toggle(500);

        // identify the svg tags in the header and footer.
        var $taoSOGHeaderSVG = $taoSOGDiv.find(".taoSOGHeader svg use");

        // Figure out what SVG icon is being referred to and change it to
        // reference the other one
        if ($taoSOGHeaderSVG.attr("xlink:href") == "#tao_down_caret") {
            $taoSOGHeaderSVG.attr("xlink:href", "#tao_up_caret");
        } else {
            $taoSOGHeaderSVG.attr("xlink:href", "#tao_down_caret");
        }

    });

    // Empty out the .viewAllRatesLink DIVs because this test replaces that
    // functionality
    jQuery(".viewAllRatesLink").empty();

});