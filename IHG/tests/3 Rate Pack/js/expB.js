jQuery("document").ready(function(){

    /****** V A R I A B L E S ******/
    // Create an image tag for the down caret for use in the SOG header
    var taoDownCaret = "<svg class='taoCaret'><use xlink:href='#tao_down_caret' /></svg>";
    var taoUpCaret = "<svg class='taoCaret'><use xlink:href='#tao_up_caret' /></svg>";

    // Find the Best Flex +1,000 points row (IKME3) and save it to a variable
    var $taoRateRowTemplate = jQuery("div.regularRates div.rateTypeLineItem input[value='IKME3']").eq(0).closest("div.regularRates");

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

                // Create a clone of each upsellContainer. We will use these
                // quite a lot, so no need to keep searching for them every
                // time.
                var $taoUpsellContainer_0 = jQuery(this).find("#upsellContainer_0").clone();
                var $taoUpsellContainer_1 = jQuery(this).find("#upsellContainer_1").clone();
                var $taoUpsellContainer_2 = jQuery(this).find("#upsellContainer_2").clone();

                /****** IGCOR ******/
                // Let's tackle the easiest first -- the Best Flex rate.
                // First, check to see if the Best Flex rate is in the
                // expected place. If so, then clone the template into a new
                // Best Flex Rate Row and make changes to that new row.
                // We need to look for the input named "originalRateCode" and
                // see if it ends in IGCOR.
                if ($taoUpsellContainer_0.find("input[name=originalRateCode]").val().indexOf("IGCOR") > -1) {

                    // make a clone of the template for the new Best Flex row
                    var $taoBestFlexRate = taoCloneRateRowTemplate($taoRateRowTemplate);

                    // Grab the Best Flex rate bullet points and put them in the
                    // right place
                    var $taoBFBulletPoints = $taoUpsellContainer_0.find(".rateInfoArea").clone();
                    $taoBestFlexRate.find(".rateInfoArea").remove();
                    $taoBestFlexRate.find("div.rateTypeLineItem div.rateTypeLineItemLeft").append($taoBFBulletPoints);

                    // Now grab the rate details link and put it in place of the
                    // last bullet point, which should replace the "Most Popular
                    // Rate" line item
                    var $taoBFRateDetails = $taoUpsellContainer_0.find(".baseRateInfo").clone();
                    $taoBestFlexRate.find(".defaultRateInfo div:last-child li").html($taoBFRateDetails);

                    // Replace the rate title
                    var taoRateTitle = "Best Flexible Rate";
                    var taoRateTitleSpan = "<span class='rateCategory roomOrder'>" + taoRateTitle + "</span>";
                    $taoBestFlexRate.find("div.rateInfoArea").prepend(taoRateTitleSpan);

                    // Grab the "Book This Room" button and put it into the new row
                    var $taoBFButton = $taoUpsellContainer_0.find(".rateSelectionArea").eq(0).clone();
                    $taoBestFlexRate.find(".rateSelectionArea").remove();
                    $taoBestFlexRate.find(".rateTypeLineItemRight").append($taoBFButton);

                    // Grab the pricing info and put it in
                    var $taoBFPricing = $taoUpsellContainer_0.find(".mainRateDisplay span.price").eq(0).clone();
                    $taoBestFlexRate.find("span.price").remove();
                    $taoBestFlexRate.find("div.priceInfoArea").append($taoBFPricing);

                    // Finally, stick the new Best Flex rate row in the right place
                    jQuery("#tao3RP" + i).prepend($taoBestFlexRate);
                }

                /****** IDME1 ******/
                // Let's tackle the easiest first -- the Best Flex rate.
                // First, check to see if the Best Flex member rate is in the
                // expected place. If so, then clone the template into a new
                // Best Flex Rate Row and make changes to that new row.
                // We need to look for the input named "memberOiginalRateCode"
                // and see if it ends in IDME1.
                if ($taoUpsellContainer_0.find("input[name=memberOiginalRateCode]").val().indexOf("IDME1") > -1) {

                    // make a clone of the template
                    var $taoMRBestFlexRate = taoCloneRateRowTemplate($taoRateRowTemplate);
//debugger;
                    // Grab the Best Flex rate bullet points and put them in the
                    // right place
                    var $taoMRBFBulletPoints = $taoUpsellContainer_0.find(".rateInfoArea").clone();
                    $taoMRBestFlexRate.find(".rateInfoArea").remove();
                    $taoMRBestFlexRate.find("div.rateTypeLineItem div.rateTypeLineItemLeft").append($taoMRBFBulletPoints);

                    // Now grab the rate details link and put it in place of the
                    // last bullet point, which should replace the "Most Popular
                    // Rate" line item
                    var $taoMRBFRateDetails = $taoUpsellContainer_0.find(".memberRateInfo").clone();
                    $taoMRBestFlexRate.find(".defaultRateInfo div:last-child li").html($taoMRBFRateDetails);

                    // Replace the rate title
                    var taoRateTitle = "YOUR RATE by IHG&reg; Rewards Club";
                    var taoRateTitleSpan = "<span class='rateCategory roomOrder'>" + taoRateTitle + "</span>";
                    $taoMRBestFlexRate.find("div.rateInfoArea").prepend(taoRateTitleSpan);

                    // Grab the "Book This Room" button and put it into the new row
                    var $taoMRBFButton = $taoUpsellContainer_0.find(".rateSelectionArea").eq(1).clone();
                    $taoMRBestFlexRate.find(".rateSelectionArea").remove();
                    $taoMRBestFlexRate.find(".rateTypeLineItemRight").append($taoMRBFButton);

                    // Grab the pricing info and put it in
                    var $taoMRBFPricing = $taoUpsellContainer_0.find(".mainRateDisplay span.price").eq(1).clone();
                    $taoMRBestFlexRate.find("span.price").remove();
                    $taoMRBestFlexRate.find("div.priceInfoArea").append($taoMRBFPricing);

                    // Finally, stick the new Best Flex rate row in the right place
                    jQuery("#tao3RP" + i).prepend($taoMRBestFlexRate);
                }

            } else {

                // This is one of the many "other" rates. Put this at the end
                // of the SOG div
                jQuery("#taoSOG" + i).append(jQuery(this));

            }

        }); // end of looping through .regularRates and .secondaryRates rows

    }); // end of looping through each room type

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

/****** F U N C T I O N S ******/
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

function taoCloneRateRowTemplate ($row) {
    // clones a template row and sends the clone back for usage
    var $clone = $row.clone();

    // Remove several things from the new row:
    //   1. "Bonus Points" image
    //   2. "Nightly Rate" text
    //   3. hidden inputs we don't need
    //   4. more hidden inputs we don't need
    //   4. hidden span we don't need
    $clone.find("img.bonusLogo").remove();
    $clone.find("div.avgratediv").remove();
    $clone.find("div.rateTypeLineItem > input[type='hidden']").remove();
    $clone.find("div.rateInfoArea > input[type='hidden']").remove();
    $clone.find("div.rateTypeLineItem > span").eq(0).remove();

    return $clone;
}