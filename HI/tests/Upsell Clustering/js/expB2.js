jQuery(document).ready(function () {

    // First we have to find all of the rooms that have upSellContainers.
    // Then we loop through those rooms, grab the upSellContainers, pull out
    // the offers on each, and put them on the first upSellContainer as a radio
    // button list.  

    // Create the following:
    //     a string to help build each offer we find
    //     an array to put all of the offers in
    //     a string to put in the rate code for the offer/description
    //     an array to put the descriptions in for each offer (using rate code
    //         as a key)
    //     a counter for creating unique radio group name later on
    var taoNewOffer = "";
    var taoAllOffers = new Array();
    var taoDescriptionCode = "";
    taoAllDescriptions = new Array(); // this needs to be global
    var taoNameCounter = 0;

    // Find all of the rooms and place the current one into taoThisHotelRoom to
    // avoid confusion in embedded each loops.
    jQuery(".rateTypeLineItems").each(function () {
        var $taoThisHotelRoom = jQuery(this);

        // Find the all of the rateTypeLineItem DIVs. 
        $taoThisHotelRoom.find(".rateTypeLineItem").each(function () {
            var $taoThisRateTypeLineItem = jQuery(this);

            // If it doesn't contain a tabVisibleArea DIV, then skip it. If 
            // it does, then we have to do 2 things: grab all of the offers
            // and grab all of the descriptions/details for those offers.
            if ($taoThisRateTypeLineItem.find(".tabVisibleArea").length == 1) {

                $taoThisRateTypeLineItem.find(".upSellContainer").each(function (i) {

                    // Check to see if this is the first upSellContainer. If it
                    // is, then skip it because we don't want to move it.
                    if (i == 0) {
                        return true;
                    }

                    var $taoThisUpsellContainer = jQuery(this);

                    // Let's get the offers first, so go through each 
                    // upSellContainer and pull them out. Put each offer into
                    // an array so we can rebuild the offers into one 
                    // comprehensive list
                    $taoThisUpsellContainer.find(".breakfastOpt").each(function () {
                        var $taoThisOffer = jQuery(this);

                        // Go through each offer (there may be only one or as 
                        // many as four or five) and put them into the array.
                        // As you do so, check to see if the <input> tags have
                        // 'checked' attribute. If so, clear it.
                        $taoThisOffer.find('input').each(function () {
                            if (jQuery(this).attr('type') != 'hidden') {
                                jQuery(this).removeAttr('checked');
                            }
                        });
                        taoNewOffer = "<div class='breakfastOpt'>" + $taoThisOffer.html() + "</div>";
                        taoNewOffer += "<div class='breakfastLabel'>" + $taoThisOffer.next().html() + "</div>"; // grabs the label
                        taoNewOffer += "<div class='clearingDiv'>" + $taoThisOffer.next().next().html() + "</div>"; // grabs the clearing div
                        taoAllOffers.push(taoNewOffer);

                    });

                    // Now we can grab the descriptions/details that go with
                    // the offers. For some reason, these are also in DIVs that
                    // have the rateTypeLineItem class, just like it's parent.
                    var taoOriginalRateCode = $taoThisUpsellContainer.children("input[type='hidden']").val();

                    $taoThisUpsellContainer.find(".rateInfoArea").each(function () {

                        var $taoRateDescription = jQuery(this);
                        var taoDescriptionId = $taoRateDescription.attr("id");

                        // See if this DIV.rateInfoArea has an ID. If it
                        // doesn't, then we need to use the orginial rate code.
                        // If it does, then we need to split it on the _ and 
                        // keep the second half (which is the rate code).
                        if (taoDescriptionId == undefined) {
                            taoDescriptionCode = taoOriginalRateCode;
                        } else {
                            var taoDescriptionIdSplit = taoDescriptionId.split("_");
                            taoDescriptionCode = taoDescriptionIdSplit[1];
                        }

                        // Now put the rate code and the description into the
                        // array, using the rate code as the key so we can 
                        // easily retrieve it later. If the description doesn't
                        // have an ID, then create one for it before putting it
                        // into the array.
                        if ($taoRateDescription.attr("id") == undefined) {
                            $taoRateDescription.attr("id", "rateInfo_" + taoDescriptionCode);
                        }
                        taoAllDescriptions[taoDescriptionCode] = $taoRateDescription.detach();

                    })

                    // We're all done with this Upsell Container, so we need
                    // to .remove() it from the DOM.
                    $taoThisUpsellContainer.remove();

                });


                // Now that we have all the offers and descriptions, we need to
                // format them into something nice and place under the current
                // row of rates. First, we need to create a new node that will
                // hold the hidden rates.
                var $taoNewRateRow = jQuery("<div class='regularRates roomsView taoDEBUG'><div class='rateTypeLineItem'><input type='hidden' value='IGCOR' name='upsellParentRateCode'></div>");
                //$taoThisRateTypeLineItem.clone().appendTo($taoNewRateRow);

                // Second, we need to clone the first tab and put it into the
                // new taoNewRateRow.
                var $taoFirstTab = $taoThisRateTypeLineItem.find(".upSellContainer").eq(0);
                var $taoNewRateRowLineItem = $taoNewRateRow.find(".rateTypeLineItem");
                $taoFirstTab.clone().appendTo($taoNewRateRowLineItem);

                // Third, we need to remove the YOUR RATE and the default 
                // rateInfo areas from the cloned section because we don't
                // need them to appear twice.
                $taoNewRateRowLineItem.find(".memberRateTypeLineItemRight").remove();
                $taoNewRateRowLineItem.find(".rateInfoArea").remove();

                // Fourth, insert the clearing DIV to help give shape to
                // the row and force the other rows to give it room.
                jQuery("<div class='clearingDiv'></div>").appendTo($taoNewRateRowLineItem);

                // Get the name that we should use for the radio group
                var taoRadioGroupName = "taoRadioGroupName_" + taoNameCounter;

                // Remove the existing breakfast-type nodes so we can put in the
                // ones in the taoAllOffers array
                $taoNewRateRowLineItem.find(".breakfastOpt").remove();
                $taoNewRateRowLineItem.find(".breakfastLabel").remove();

                // Loop through taoAllOffers and plug in the each item (offer).
                for (var i = 0; i < taoAllOffers.length; i++) {
                    jQuery(taoAllOffers[i]).insertAfter($taoNewRateRowLineItem.find("br").eq(1));

                    // Grab the offer we just plugged in so we can work on it
                    var $taoCurrentOpt = $taoNewRateRowLineItem.find(".breakfastOpt").first();

                    // Check if the current offer needs to be modified from a
                    // checkbox to a radio button.
                    if ($taoCurrentOpt.find("input[type='checkbox']").length > 0) {
                        $taoCurrentOpt.find("input[type='checkbox']").attr("type", "radio");
                    }

                    // Check if the current offer needs to convert a plus sign
                    // to a radio button.
                    var $taoThisUpsellPlus = $taoCurrentOpt.find(".upSellPlus");
                    if ($taoThisUpsellPlus.length > 0) {
                        var taoRateCode = $taoThisUpsellPlus.prev().attr("value");
                        jQuery("<input type='radio' id='rateInfo_" + taoRateCode + "' class='breakfastChk'>").insertBefore($taoThisUpsellPlus);

                        // Now that we have created a radio button input for
                        // this offer, remove the original
                        $taoThisUpsellPlus.remove();
                    }

                }

                // Make the first new radio button the default
                $taoNewRateRowLineItem.find("input[type='radio']:first").click();

                // Finally, there are four more things to do. First, make sure
                // all of the inputs on this tab have the same radio group name.
                // Second, hide the tabs so the user can't activate them and 
                // make a different choice. Third, put all of the descriptions
                // in the right place on the first tab. Fourth, place the new 
                // row in the right spot (after the current row)
                $taoNewRateRowLineItem.find("input[type=radio]").attr("name", taoRadioGroupName);
                $taoThisRateTypeLineItem.find(".tabVisibleArea").attr("style", "display: none;");
                for (var taoKey in taoAllDescriptions) {
                    $taoNewRateRowLineItem.find(".rateTypeLineItem").append(taoAllDescriptions[taoKey]);
                }
                $taoNewRateRow.insertAfter($taoThisRateTypeLineItem.parent());


                // Now we are all done with this room!  Only some housekeeping
                // left, so let's clear out the allOffers and allDescriptions
                // arrays, increment taoNameCounter, and continue on to the 
                // next hotel room.
                taoAllOffers = [];
                taoAllDescriptions = [];
                taoNameCounter++;

            }

        });

    });

    // Now that all of the new rows have been created, we need to run one line
    // of code to remove some inline styling that is making the new data appear
    // in the wrong place.
    setTimeout(function() {
        jQuery(".taoDEBUG .memberRateTypeLineItem").removeAttr("style");
    }, 3000);
    
    // Add in a onClick action that will change the name value of the submit
    // button so the right rate code is used when the user clicks on 
    // 'BOOK THIS ROOM'. Also figure out the new nightly rate to display by
    // adding the cost of the upgrade to the base rate. Make sure the new 
    // nightly rate is dipslayed with a .show() function.
    jQuery(".breakfastOpt input[type='radio']").on("click", function () {

        // Get the ID of the radio button clicked on, split it on "_", and 
        // save the rate offer in the second half.
        var $taoRadioId = jQuery(this).attr("id");
        var taoRadioIdSplit = $taoRadioId.split("_");
        var taoOfferRateCode = taoRadioIdSplit[1];

        // Find the submit button that relates to this radio button, get its
        // current name value, and then plug in the new rate code. The current
        // name value should be something like this:
        //      "selectedRoom_KNGNIGCOR_1BD_0000_0_0_"
        // We need to replace the KNGNIGCOR portion with the new code.
        var $taoSubmitButton = jQuery(this).closest(".rateTypeLineItemRight").find("input[type='submit']");

        var taoSubmitButtonCurName = $taoSubmitButton.attr("name");
        var taoSubmitNameSplit = taoSubmitButtonCurName.split("_");
        var taoSubmitButtonNewName = taoSubmitNameSplit[0] + "_" +
                                     taoOfferRateCode + "_" +
                                     taoSubmitNameSplit[2] + "_" +
                                     taoSubmitNameSplit[3] + "_" +
                                     taoSubmitNameSplit[4] + "_" +
                                     taoSubmitNameSplit[5] + "_";

        $taoSubmitButton.attr("name", taoSubmitButtonNewName);

        // Figure out the cost of this upgrade, get the base nightly rate, and
        // then figure out what the new nightly rate should be. 
        var taoUpgradeCost = jQuery(this).closest(".breakfastOpt").find(".price span.amt").text();
        var taoBaseRate = jQuery(this).closest("#priceInfoArea").find(".mainRateDisplay span.amt").text();
        var taoNewNightlyRate = +taoBaseRate + +taoUpgradeCost;
        jQuery(this).closest(".rateTypeLineItemRight").find("#upsellTotal span.amt").text(taoNewNightlyRate.toFixed(2));

        // If the user clicked on a radio button other than the 'no selection'
        // option, then update the nightly rate. Make sure it is displayed 
        // with a .show() function.
        if (jQuery(this).data("default") != true) {
            var taoThat = jQuery(this);
            setTimeout(function () {
                jQuery(taoThat).closest(".rateTypeLineItemRight").find("#upsellTotal").removeClass("hide");
                jQuery(taoThat).closest(".rateTypeLineItemRight").find("#upsellTotal").siblings("hr").removeClass("hide");
            }, 25);
        }
    });

});
