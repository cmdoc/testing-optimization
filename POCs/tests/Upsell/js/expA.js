jQuery(document).ready(function () {

    // First we have to find all of the rooms that have upSellContainers.
    // Then we loop through those rooms, grab the upSellContainers, pull out
    // the offers on each, and put them on the first upSellContainer as a radio
    // button list.  

    // Create a string to help build each offer and an array to put all of the 
    // offers in
    var taoNewOffer = "";
    var taoAllOffers = new Array();
    var taoNameCounter = 0;

    // Find all of the rooms and place the current one into taoThisHotelRoom to
    // avoid confusion in embedded each loops.
    jQuery(".rateTypeLineItems").each(function () {
        var $taoThisHotelRoom = jQuery(this);

        // Find the all of the rateTypeLineItem DIVs. If it doesn't contain 
        // a tabVisibleArea DIV, then skip it
        $taoThisHotelRoom.find(".rateTypeLineItem").each(function () {
            var $taoThisRateTypeLineItem = jQuery(this);

            if ($taoThisRateTypeLineItem.find(".tabVisibleArea").length == 1) {

                // Find the line item for this room that has upSellContainers.
                $taoThisRateTypeLineItem.find(".upSellContainer").each(function () {
                    var $taoThisUpsellContainer = jQuery(this);

                    // Go through each upSellContainer and pull out the offers.
                    // Put each offer into an array so we can rebuild the offers
                    // into one comprehensive list
                    $taoThisUpsellContainer.find(".breakfastOpt").each(function () {
                        var $taoThisOffer = jQuery(this);

                        // go through each offer (there may be only one or as 
                        // many as four or five) and put them into the array
                        taoNewOffer = "<div class='breakfastOpt'>" + $taoThisOffer.html() + "</div>";
                        taoNewOffer += "<div class='breakfastLabel'>" + $taoThisOffer.next().html() + "</div>"; // grabs the label
                        taoNewOffer += "<div class='clearingDiv'>" + $taoThisOffer.next().next().html() + "</div>"; // grabs the clearing div
                        taoAllOffers.push(taoNewOffer);

                    });

                });

                // Now that we have all the offers, format them into something
                // nice and place them over the offer(s) on the first 
                // tab (upSellContainer)
                var $taoFirstTab = $taoThisRateTypeLineItem.find(".upSellContainer").eq(0);

                // Get the name that we should use for the radio group
                var taoRadioGroupName = "taoRadioGroupName_" + taoNameCounter;

                //debugger;
                //$taoFirstTab.find("input[type='radio']").each(function () {
                //    debugger;
                //    var $taoThisName = jQuery(this).attr("name");
                //    if ($taoThisName != "checkbox") {


                //        // THIS IS BROKEN!


                //        taoRadioGroupName = taoName;
                //        return false; // break out of the loop
                //    }
                //})
                // = $taoFirstTab.find("input[type='radio']").first().attr("name");

                // Remove the existing breakfast-type nodes so we can put in the
                // ones in the taoAllOffers array
                $taoFirstTab.find(".breakfastOpt").remove();
                $taoFirstTab.find(".breakfastLabel").remove();
                $taoFirstTab.find(".clearingDiv").remove();

                // Loop through taoAllOffers and plug in the each item (offer).
                for (var i = 0; i < taoAllOffers.length; i++) {
                    jQuery(taoAllOffers[i]).insertBefore($taoFirstTab.find("hr"));

                    // Grab the offer we just plugged in so we can work on it
                    var $taoCurrentOpt = $taoFirstTab.find(".breakfastOpt").last();
                    
                    // Check if the current offer needs to be modified from a
                    // checkbox to a radio button.
                    if ($taoCurrentOpt.find("input[type='checkbox']").length > 0) {
                        $taoCurrentOpt.find("input[type='checkbox']").attr("type", "radio");
                    }

                    // Check if the current offer needs to convert a plus sign
                    // to a radio button.
                    var $taoThisUpsellPlus = $taoCurrentOpt.find(".upSellPlus");
                    if ($taoThisUpsellPlus.length > 0) {
                        var taoRateCode = $taoThisUpsellPlus.attr("id");
                        jQuery("<input type='radio' id='rateInfo_" + taoRateCode + "' class='breakfastChk'>").insertBefore($taoThisUpsellPlus);

                        // Now that we have created a radio button input for
                        // this offer, remove the original
                        $taoThisUpsellPlus.remove();
                    }

                }

                // Finally, there are two more things to do. First, make sure
                // all of the inputs on this tab have the same radio group name.
                // Second, hide the tabs so the user can't activate them and 
                // make a different choice.
                $taoFirstTab.find("input[type=radio]").attr("name", taoRadioGroupName);
                $taoFirstTab.find(".tabVisibleArea").attr("style", "display: none;");

                // Now we are all done with this room!  Only some housekeeping
                // left, so let's clear out the allOffers array, increment 
                // taoNameCounter, and continue on to the next hotel room.
                taoAllOffers = [];
                taoNameCounter++;

            }

        });

    });

});