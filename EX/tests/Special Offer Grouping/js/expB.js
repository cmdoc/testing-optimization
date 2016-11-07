jQuery("document").ready(function(){

    // Create image tags for the plus and minus icons for use in the SOGHeader
    // and SOGFooter
    var taoCirclePlus = "<svg class='taoCirclePlus'><use xlink:href='#tao_circle_plus' /></svg>";
    var taoCircleMinus = "<svg class='taoCircleMinus'><use xlink:href='#tao_circle_minus' /></svg>";

    // Start working on the page, hitting one rate type at a time
    jQuery(".rateTypeLineItems").each(function(i) {

        // Put this .rateTypeLineItems instance into a variable for future
        // referencing.
        var $taoThisRoom = jQuery(this);

        // create a div for any rates we find that we need to move
        var $taoSpecialOfferGroupingDiv = jQuery("<div class='taoSpecialOfferGroup'></div>");
        $taoSpecialOfferGroupingDiv.append("<div class='taoSOGHeader taoSOGHeaderPadding'><span class='cssButton bcex' type='button'>Special Offers &amp; Deals</span>" + taoCirclePlus + "</div>");
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

            }

        });

        // Add a Hide button to the new div
        $taoSpecialOfferGroupingDiv.append("<div class='taoSOGFooter'><input class='cssButton bcex' type='button' value='Hide Special Offers &amp; Deals'>" + taoCircleMinus + "</div>");

    });

    // Put in all the code and functionality to cause the new button to open
    // and close the grouped rates.
    jQuery(".taoSOGHeader span, .taoSOGFooter input, svg.taoCirclePlus, svg.taoCircleMinus").on("click", function () {

        // find the parent div
        var $taoSOGDiv = jQuery(this).closest(".taoSpecialOfferGroup");

        // identify the svg tags in the header.
        var $taoSOGHeaderSVG = $taoSOGDiv.find(".taoSOGHeader svg use");

        // Figure out what SVG icon is being referred to and change it to
        // reference the other one
        if ($taoSOGHeaderSVG.attr("xlink:href") == "#tao_circle_plus") {
            $taoSOGHeaderSVG.attr("xlink:href", "#tao_circle_minus");
        } else {
            $taoSOGHeaderSVG.attr("xlink:href", "#tao_circle_plus");
        }

        // toggle the .taoSOGpadding and .taoSOGHeaderPadding classes so the
        // open or closed group has the right padding
        $taoSOGDiv.toggleClass("taoSOGpadding");
        $taoSOGDiv.find(".taoSOGHeader").toggleClass("taoSOGHeaderPadding");

        // toggle the rates being offered in this .taoSpecialOfferGroup
        $taoSOGDiv.find(".taoSOGrates, .taoSOGFooter").toggle(500);

    });

    // Empty out the .viewAllRatesLink DIVs because this test replaces that
    // functionality
    jQuery(".viewAllRatesLink").empty();

});