jQuery("document").ready(function(){

    /****** V A R I A B L E S ******/
    // Create an image tag for the down caret for use in the SOG header
    var taoDownCaret = "<svg class='taoCaret'><use xlink:href='#tao_down_caret' /></svg>";
    // Find the Best Flex +1,000 points row (IKME3) and save it to a variable
    var $taoRateRowTemplate = jQuery("div.regularRates div.rateTypeLineItem input[value='IKME3']").eq(0).closest("div.regularRates");

    // Start working on the page, hitting one rate type at a time
    jQuery(".rateTypeLineItems").each(function(i) {

        // Put this .rateTypeLineItems instance into a variable for future
        // referencing.
        var $taoThisRoom = jQuery(this);

        // Create an array of rates that have already been processed, an array
        // of just the prices for all rates in this room, and an associative
        // array of the price (key) and DOM node for the rate row (value).
        // These last two arrays will be used to sort all rates in the SOG
        // from cheapest to most expensive.
        var taoProcessedRates = [];
        var taoJustPrices = {};
        var taoJustRateRows = {};

        // Remove all instances of the red circle with check mark inside.
        // Sometimes the image is in a .bestFlexibleNoTabImage class instead,
        // so check that, too.
        jQuery(this).find(".bestFlexibleNoTabImage").remove();
        jQuery(this).find(".bestFlexibleHeaderImage").remove();

        // create a 3 Rate Pack (3RP div) for the IGCOR, IDME1, or IKME3 rates.
        var $tao3RatePackDiv = jQuery("<div class='tao3RatePack' id='tao3RP" + i + "'></div>");
        $tao3RatePackDiv.insertBefore($taoThisRoom.find(".viewAllRatesLink"));

        // create a Special Offers Group (SOG div) for any rates that are not
        // IGCOR, IDME1, or IKME3.
        var $taoSpecialOfferGroupingDiv = jQuery("<div class='taoSpecialOfferGroup'></div>");
        $taoSpecialOfferGroupingDiv.append("<div class='taoSOGHeader taoSOGHeaderPadding'>View More Rates " + taoDownCaret + "</div>");
        $taoSpecialOfferGroupingDiv.append("<div class='taoSOGrates' id='taoSOG" + i + "'></div>");
        $taoSpecialOfferGroupingDiv.insertBefore($taoThisRoom.find(".viewAllRatesLink"));

        // Go through all of the rates for this room and move them into their
        // specific locations -- either the 3RP div or SOG div
        $taoThisRoom.find(".regularRates, .secondaryRates").each(function() {

            // create a var for this rate row
            var $taoThisRateRow = jQuery(this);

            /****** IVANI ******/
            if ($taoThisRateRow.find("div.spotlightPointsAndCash").length > 0) {
                // This is the Points & Cash rate, put it first in the SOG div
                jQuery("#taoSOG" + i).prepend(jQuery(this));

                // Add it to the processed rates array
                taoProcessedRates.push("IVANI");

            /****** IKME3 ******/
            } else if ($taoThisRateRow.find("input[name='rateCodeValueForRow']").val() == "IKME3") {
                // This is the +1,000 Points YOUR RATE rate.

                // Remove "nightly rate" and "Bonus Points"
                jQuery(this).find("div.avgratediv").remove();
                jQuery(this).find("img.bonusLogo").remove();

                // Put it last in the 3RP div.
                jQuery("#tao3RP" + i).append(jQuery(this));

                // Add it to the processed rates array
                taoProcessedRates.push("IKME3");

            } else if ($taoThisRateRow.find("div.upSellContainer").length > 0) {
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

                // Create a clone of the first upsellContainer. We will use
                // this quite a lot in building the IGCOR and IKME1 rates, so
                // no need to keep searching for it every time. Just grab it
                // once and keep using that same instance.
                var $taoUpsellContainer_0 = jQuery(this).find("#upsellContainer_0").clone();

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
                    // right place. Sometimes these bullet points have an extra
                    // rate title area, so be sure to remove it if it is there.
                    var $taoBFBulletPoints = $taoUpsellContainer_0.find(".rateInfoArea").clone();
                    $taoBestFlexRate.find(".rateInfoArea").remove();
                    $taoBestFlexRate.find("div.rateTypeLineItem div.rateTypeLineItemLeft").append($taoBFBulletPoints);
                    $taoBestFlexRate.find("div.bestFlexibleNoTabText").remove();

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

                    // Add it to the processed rates array
                    taoProcessedRates.push("IGCOR");

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

                    // Grab the Best Flex rate bullet points and put them in the
                    // right place. Sometimes these bullet points have an extra
                    // rate title area, so be sure to remove it if it is there.
                    var $taoMRBFBulletPoints = $taoUpsellContainer_0.find(".rateInfoArea").clone();
                    $taoMRBestFlexRate.find(".rateInfoArea").remove();
                    $taoMRBestFlexRate.find("div.rateTypeLineItem div.rateTypeLineItemLeft").append($taoMRBFBulletPoints);
                    $taoMRBestFlexRate.find("div.bestFlexibleNoTabText").remove();

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

                    // Add it to the processed rates array
                    taoProcessedRates.push("IDME1");

                }

                // Now loop through all of the upsell containers and find the
                // other rates that either have a big button, checkbox, or
                // radio button.
                jQuery(this).find(".upSellContainer").each(function() {

                    // Create a clone of this upsell container
                    var $taoThisUpsellContainer = jQuery(this).clone();

                    /****** BUTTONS ******/
                    // Let's hit the big buttons first
                    $taoThisUpsellContainer.find("input[value='Book This Room']").each(function() {

                        // Grab the short and long rate codes for this button
                        var taoCurrentShortRateCode = taoDetermineButtonRateCode(jQuery(this).attr("name"), 'short');
                        var taoCurrentLongRateCode = taoDetermineButtonRateCode(jQuery(this).attr("name"), 'long');

                        // Skip this button if we have already processed this
                        // rate code.
                        if (taoProcessedRates.indexOf(taoCurrentShortRateCode) > -1) {
                            return true;
                        }

                        // OK, so we haven't processed this code yet! Let's
                        // start by making a clone of the template.
                        var $taoThisBigButtonRateRow = taoCloneRateRowTemplate($taoRateRowTemplate);

                        // Grab the rate title, description, and bullet points
                        // and put them in the right place. Be sure to remove
                        // the visible rate description and ellipsis link to
                        // more rate details. Also check to see if there is a
                        // radio button input lingering around and remove it.
                        var $taoBulletPoints = $taoThisUpsellContainer.find("#rateInfo_" + taoCurrentLongRateCode).clone();
                        $taoBulletPoints.find(".rateDesc").remove();
                        $taoBulletPoints.find("div > span.spotlight_expandedDetails_link").remove();
                        $taoThisBigButtonRateRow.find(".rateInfoArea").remove();
                        $taoThisBigButtonRateRow.find("div.rateTypeLineItem div.rateTypeLineItemLeft").append($taoBulletPoints);
                        $taoThisBigButtonRateRow.find("div.rateTypeLineItemLeft > input[type=radio]").remove();

                        // Grab the "Book This Room" button and put it into the new row
                        var $taoButton = jQuery(this).parent().clone();
                        $taoThisBigButtonRateRow.find(".rateSelectionArea").remove();
                        $taoThisBigButtonRateRow.find(".rateTypeLineItemRight").append($taoButton);

                        // Grab the pricing info and put it in
                        var $taoPricing = jQuery(this).parent().siblings(".priceInfoArea").find(".upsellTotal_" + taoCurrentLongRateCode + " span.price").clone();
                        $taoThisBigButtonRateRow.find("span.price").remove();
                        $taoThisBigButtonRateRow.find("div.priceInfoArea").append($taoPricing);

                        // Separate out price and insert it into taoJustPrice.
                        // Put price and the new row into taoAllPricesAndRates.
                        var taoPrice = parseFloat($taoPricing.find("span.cc_number").text());

                        // Add this to taoJustPrices and taoJustRateRows. We
                        // take these arrays later and build out the SOG when
                        // we are done with all of the rates for this row has
                        // been processed.
                        taoJustPrices[taoCurrentShortRateCode] = taoPrice;
                        taoJustRateRows[taoCurrentShortRateCode] = $taoThisBigButtonRateRow;

                        // Add it to the processed rates array
                        taoProcessedRates.push(taoCurrentShortRateCode);

                    });

                    /****** CHECKBOXES & RADIO BUTTONS ******/
                    // The big buttons are done, so let's move on to all of
                    // the checkboxes.
                    $taoThisUpsellContainer.find(".breakfastOpt").each(function() {

                        // Grab the short and long rate codes for this button
                        var taoCurrentShortRateCode = taoDetermineButtonRateCode(jQuery(this).find("input[type=hidden]").val(), 'short');
                        var taoCurrentLongRateCode = taoDetermineButtonRateCode(jQuery(this).find("input[type=hidden]").val(), 'long');

                        // Skip this button if we have already processed this
                        // rate code.
                        if (taoProcessedRates.indexOf(taoCurrentShortRateCode) > -1) {
                            return true;
                        }

                        // OK, so we haven't processed this code yet! Let's
                        // start by making a clone of the template.
                        var $taoThisCheckboxRateRow = taoCloneRateRowTemplate($taoRateRowTemplate);

                        // Grab the rate title, description, and bullet points
                        // and put them in the right place. Be sure to remove
                        // the visible rate description and ellipsis link to
                        // more rate details. Also check to see if there is a
                        // radio button input lingering around and remove it.
                        var $taoBulletPoints = $taoThisUpsellContainer.find("div#rateInfo_" + taoCurrentLongRateCode).clone();
                        $taoBulletPoints.removeClass("hide");
                        $taoBulletPoints.find(".rateDesc").remove();
                        $taoBulletPoints.find("div > span.spotlight_expandedDetails_link").remove();
                        $taoThisCheckboxRateRow.find(".rateInfoArea").remove();
                        $taoThisCheckboxRateRow.find("div.rateTypeLineItem div.rateTypeLineItemLeft").append($taoBulletPoints);

                        // Grab the "Book This Room" button and put it into
                        // the new row.
                        var $taoButton = jQuery(this).closest("div.rateTypeLineItemRight, div.memberRateTypeLineItem, div.memberRateTypeLineItemRight").find(".rateSelectionArea").clone();
                        // Make sure the button has the rate for this checkbox
                        var taoNewButtonCode = taoReplaceRateCodeForButton($taoButton.find("input").attr("name"), taoCurrentLongRateCode);
                        $taoButton.find("input").attr("name", taoNewButtonCode);
                        $taoThisCheckboxRateRow.find(".rateSelectionArea").remove();
                        $taoThisCheckboxRateRow.find(".rateTypeLineItemRight").append($taoButton);

                        // Grab the pricing information and put it in. There
                        // is one rate area that uses a different class name,
                        // so $taoPricing may be empty. If so, look for the
                        // different name.
                        var $taoPricing = jQuery(this).siblings("span.upsellTotal_" + taoCurrentLongRateCode).clone();
                        if ($taoPricing.find("span").length == 0) {
                            $taoPricing = jQuery(this).siblings("span.memberExclusiveUpsellTotal_" + taoCurrentLongRateCode).clone();
                        }
                        $taoPricing = $taoPricing.find("span.price");
                        $taoThisCheckboxRateRow.find("span.price").remove();
                        $taoThisCheckboxRateRow.find("div.priceInfoArea").append($taoPricing);

                        // Separate out price and insert it into taoJustPrice.
                        // Put price and the new row into taoAllPricesAndRates.
                        var taoPrice = parseFloat($taoPricing.find("span.cc_number").text());

                        // Add this to taoJustPrices and taoJustRateRows. We
                        // take these arrays later and build out the SOG when
                        // we are done with all of the rates for this row has
                        // been processed.
                        taoJustPrices[taoCurrentShortRateCode] = taoPrice;
                        taoJustRateRows[taoCurrentShortRateCode] = $taoThisCheckboxRateRow;

                        // Add it to the processed rates array
                        taoProcessedRates.push(taoCurrentShortRateCode);

                    });

                });

                // Now that all of the rearranging and sorting is done for this
                // DIV containing an upsellContainer, remove this row because
                // we don't need it anymore.
                $taoThisRateRow.remove();
                // jQuery(".regularRates").eq(0).hide(); // this line is for testing purposes

            } else {

                // This is one of the many "other" rates and needs to be put
                // into the SOG. First, remove any "Nightly Rate" or "Bonus
                // Points" text blocks.
                $taoThisRateRow.find("span.avgrate").remove();
                $taoThisRateRow.find("img.bonusLogo").remove();

                // Second, find the rateCode and the price.
                var taoPrice = parseFloat($taoThisRateRow.find("span.cc_number").text());
                var taoShortRateCode = taoDetermineButtonRateCode($taoThisRateRow.find("input[value='Book This Room']").attr("name"), 'short');

                // Third, we can insert it into the taoJustRates and
                // taoJustRateRows arrays for later placement in the SOG.
                taoJustPrices[taoShortRateCode] = taoPrice;
                taoJustRateRows[taoShortRateCode] = $taoThisRateRow;

                // Fourth, add it to the processed rates array
                taoProcessedRates.push(taoShortRateCode);

            }

            // FINALLY! We have gone through all of the rates for this room.
            // Now we are ready to loop through the taoJustPrices and
            // taoJustRateRows arrays and build out the SOG.
            taoDisplaySOG(taoJustPrices, taoJustRateRows, i);

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

        // finally, trigger a click tracking event in Adobe
        mboxPixelTrack('mboxClickTrack', 'clicked=SOG_click');

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
    //   5. hidden span we don't need
    $clone.find("img.bonusLogo").remove();
    $clone.find("div.avgratediv").remove();
    $clone.find("div.rateTypeLineItem > input[type='hidden']").remove();
    $clone.find("div.rateInfoArea > input[type='hidden']").remove();
    $clone.find("div.rateTypeLineItem > span").eq(0).remove();

    return $clone;

}

function taoDetermineButtonRateCode(name, length) {
    // takes the name from a big button and pulls out the rate code. Returns
    // either the shortened 5-digit code or the full 9-digit code.
    var values = name.split('_');
    var fullRateCode = values[1];

    // If fullRateCode is undefined, then we passed a smaller name variable
    // that contains just the long version of the rate code.
    if (fullRateCode == undefined) {
        fullRateCode = values[0];
    }

    if (length == 'short') {
        return fullRateCode.substr(4, 8);
    } else {
        return fullRateCode;
    }

}

function taoReplaceRateCodeForButton(currentCode, replacementCode) {
    // takes the long value for a button and inserts a new code. Returns long
    // value with replacement code inserted.
    var values = currentCode.split('_');
    var newCode = currentCode.replace(values[1], replacementCode);

    return newCode;

}

function taoDisplaySOG(ratePrices, rateRows, counter) {
    // This function looks at the ratePrices and rateRows and figures
    // out the sorted order for rates, lowest to highest.
    //     ratePrices - array containing key=>value pairs of rateCode=>price
    //     rateRows - array containing key=>value pairs of rateCode=>DOM node
    //         for rate row
    //     counter - integer containing counter for #taoSOG (as in #taoSOG3,
    //         #taoSOG4, etc)

    // First, sort the prices and get them in order -- lowest to highest. The
    // sortedPrices array contains just the prices
    var sortedPrices = Object.values(ratePrices).sort(function(a, b){return a - b});

    // Second, go through the sortedPrices array and find the rates that match
    // the prices.
    sortedPrices.forEach(function(price) {
        Object.keys(ratePrices).forEach(function (rateCode) {
            if (ratePrices[rateCode] == price) {

                // Third, now that we have matched the rate to the price, take
                // the DOM node of the corresponding rateRow and append it to
                // the SOG. This should make everything line up from cheapest
                // to most expensive. Remember, the RC Points option (IVANI) is
                // already in the SOG so it will appear first.
                var $correctRow = rateRows[rateCode];

                // append this new rate row to the correct SOG div
                jQuery("#taoSOG" + counter).append($correctRow);

            }

        });

    });

}