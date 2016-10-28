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
        $taoSpecialOfferGroupingDiv.append("<div class='taoSOGHeader taoSOGHeaderPadding'><input class='cssButton bcex' value='Special Offers &amp; Deals'>" + taoCirclePlus + "</div>");
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
        jQuery("#taoSOG" + i).append("<div class='taoSOGFooter'><input class='cssButton bcex' value='Hide Special Offers &amp; Deals'>" + taoCircleMinus + "</div>");

    });

    // Put in all the code and functionality to cause the new button to open
    // and close the grouped rates.
    jQuery(".taoSOGHeader, .taoSOGFooter").on("click", "input", function () {

        // find the parent div
        var $taoSOGDiv = jQuery(this).closest(".taoSpecialOfferGroup");

        // identify the svg tags in the header and footer.
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
        $taoSOGDiv.find(".taoSOGrates").toggle(500);

        // put the focus on the body to remove odd behavior of button
        // highlighting and text cursor appearing in text of button.
        $taoSOGDiv.click();

    });

    // Empty out the .viewAllRatesLink DIVs because this test replaces that
    // functionality
    jQuery(".viewAllRatesLink").empty();

});