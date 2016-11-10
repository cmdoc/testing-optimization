jQuery("document").ready(function(){

    /****** V A R I A B L E S ******/
    // Create an image tag for the down caret for use in the SOG header
    var taoDownCaret = "<svg class='taoCaret'><use xlink:href='#tao_down_caret' /></svg>";
    var taoUpCaret = "<svg class='taoCaret'><use xlink:href='#tao_up_caret' /></svg>";

    // Start working on the page, hitting one rate type at a time
    jQuery(".rateTypeLineItems").each(function(i) {

        // Put this .rateTypeLineItems instance into a variable for future
        // referencing.
        var $taoThisRoom = jQuery(this);

        // create a 3 Rate Pack (3RP div) for the IGCOR, IDME1, or IKME3 rates.
        var $tao3RatePackDiv = jQuery("<div class='tao3RatePack' id='tao3RP" + i + "'></div>");
        $tao3RatePackDiv.insertBefore($taoThisRoom.find(".viewAllRatesLink"));

        // create a Special Offers Group (SOG div) for any rates that are not
        // IGCOR, IDME1, or IKME3.
        var $taoSpecialOfferGroupingDiv = jQuery("<div class='taoSpecialOfferGroup'></div>");
        $taoSpecialOfferGroupingDiv.append("<div class='taoSOGHeader taoSOGHeaderPadding'>Special Offers &amp; Deals " + taoDownCaret + "</div>");
        $taoSpecialOfferGroupingDiv.append("<div class='taoSOGrates' id='taoSOG" + i + "'></div>");
        $taoSpecialOfferGroupingDiv.insertBefore($taoThisRoom.find(".viewAllRatesLink"));

        // Go through all of the rates for this room and move them into their
        // specific locations -- either the 3RP div or SOG div
        $taoThisRoom.find(".regularRates, .secondaryRates").each(function() {

            if (jQuery(this).find("div.spotlightPointsAndCash").length > 0) {
                // This is the Points & Cash rate, put it first in the SOG div
                jQuery("#taoSOG" + i).prepend(jQuery(this));

            } else if (jQuery(this).find("input[name='rateCodeValueForRow']").val() == "IKME3") {
                // This the +1,000 Points Your Rate rate. Put it last in the
                // 3RP div.
                jQuery("#tao3RP" + i).append(jQuery(this));

            } else if (jQuery(this).find("div.upSellContainer").length > 0) {
                // This is the messy option.  This row contains multiple rates,
                // so we have to find each type (some will always exist and
                // others will sometimes exist) and create a new row of proper
                // HTML for each one. This HTML needs to include all of the
                // hidden inputs, rate details, titles, and other items that
                // will make sure these rates will work when the user chooses
                // to book that rate for this room. Finally, put the rates in
                // their proper place, either in the 3RP div (if it is a
                // IGCOR or IDME1 rate) or in the SOG div (if it is not IGCOR
                // or IDME1).
                jQuery("#tao3RP" + i).prepend(jQuery(this));

            } else {
                // This is one of the many "other" rates. Put this at the end
                // of the SOG div
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
