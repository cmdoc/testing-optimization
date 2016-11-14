jQuery("document").ready(function(){

    // Create image tags for the plus and minus icons for use in the SOGHeader
    // and SOGFooter
    var taoCirclePlusHref = "https://ihg-my.sharepoint.com/personal/garrod_gibb_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=eRvhlMA2lqMe8T83kC%2bmHY8u4%2fHg1zCbRUwFkCjn1oA%3d&docid=1f335072843d14c6e958de62671988c6f&rev=1";
    var taoCircleMinusHref = "https://ihg-my.sharepoint.com/personal/garrod_gibb_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=wzYe750GEHAvk1mQZR9UDUsivboz5iGVoO4pvPZCwOo%3d&docid=1892de4bf2a2245ed8c86127862a8e5cd&rev=1";
    var taoCirclePlus = "<img class='taoCirclePlus' href='"+ taoCirclePlusHref + "' />";
    var taoCircleMinus = "<img class='taoCircleMinus' href='"+ taoCircleMinusHref + "' />";

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

    // Loop through all of the new .taoSpecialOfferGroup DIVs and remove those
    // that don't have any rates (in other words, they are empty).
    jQuery(".taoSpecialOfferGroup").each(function() {

        if (jQuery(this).find(".taoSOGrates .regularRates").length == 0) {
            jQuery(this).remove();
        }

    });

    // Put in all the code and functionality to cause the new button to open
    // and close the grouped rates.
    jQuery(".taoSOGHeader span, .taoSOGFooter input, img.taoCirclePlus, img.taoCircleMinus").on("click", function () {

        // find the parent div
        var $taoSOGDiv = jQuery(this).closest(".taoSpecialOfferGroup");

        // identify the img tags in the header.
        var $taoSOGHeaderImg = $taoSOGDiv.find(".taoSOGHeader img");

        // Figure out what icon is being referred to and change it to
        // reference the other one
        if ($taoSOGHeaderImg.hasClass("taoCirclePlus")) {
            $taoSOGHeaderImg.attr("href", taoCircleMinusHref).removeClass("taoCirclePlus").addClass("taoCircleMinus");
        } else {
            $taoSOGHeaderImg.attr("href", taoCirclePlusHref).removeClass("taoCircleMinus").addClass("taoCirclePlus");
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