jQuery("document").ready(function(){

    // Create an image tag for the down caret for use in the SOG header
    var taoDownCaret = "<img class='taoDownCaret' src='//prodcache.internal.ihg.com/content/dam/etc/media_library/branded/cn/images/transparent_1x1.gif' border='0'>";

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

        // CD: grab all prices in $taoThisRoom and loop through them one by one, keeping the lowest price
        var taoLowestPrice = 100000;
        var taoCurrentPrice = 0;
        $taoThisRoom.find("span.mainRateDisplay > span.price > span.cc_number, span#upsellTotal > span.price > span.cc_number, div.priceInfoArea > span.price > span.cc_number").each(function() {
            taoCurrentPrice = parseFloat(jQuery(this).text());
            if (taoCurrentPrice < taoLowestPrice) {
                taoLowestPrice = taoCurrentPrice;
            }
        });

        // Go through all of the rates for this room and move the special
        // offers and secondary rates to the new div
        $taoThisRoom.find(".regularRates, .secondaryRates").each(function() {

            // Look for any that does not contain an div.upSellContainter or
            // div.spotlightPointsAndCash. We have some work to do with those.
            if (jQuery(this).find("div.upSellContainer").length == 0 && jQuery(this).find("div.spotlightPointsAndCash").length == 0) {

                // CD: If this rate is equal to the cheapest price, then move it to just before the Points & Cash rate.
                var taoThisPrice = parseFloat(jQuery(this).find("span.cc_number").text());
                if (taoThisPrice == taoLowestPrice) {
                    // Insert before the points and cash rate.
                    $taoThisRoom.find("div.rateTypeLineItems").prepend(jQuery(this));
                    // jQuery(this).insertBefore($taoThisRoom.find("div.regularRates > div.spotlightPointsAndCash").parent());

                } else {
                    // Put this into the new div we just created
                    jQuery("#taoSOG" + i).append(jQuery(this));
                }

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
        var $taoSOGHeaderIcon = $taoSOGDiv.find(".taoSOGHeader img");

        // Figure out what icon is being referred to and change it to
        // reference the other one
        if ($taoSOGHeaderIcon.attr("class") == "taoDownCaret") {
            $taoSOGHeaderIcon.attr("class", "taoUpCaret");
        } else {
            $taoSOGHeaderIcon.attr("class", "taoDownCaret");
        }

        // finally, trigger a click tracking event in Adobe
        mboxPixelTrack('mboxClickTrack', 'clicked=SOG_click');

    });

    // Empty out the .viewAllRatesLink DIVs because this test replaces that
    // functionality
    jQuery(".viewAllRatesLink").empty();

});

///////////////////////////////////////////////////////////////////////////////
// F U N C T I O N S
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
