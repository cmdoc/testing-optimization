// Hide the hotel description, address, phone numbers, "Nightly Rate,"
// original price information, and the whole detail specs row above the
// thumbnail.
Bootstrapper.MVT.injectCSS(".row.hotelDesc { display: none; }");
Bootstrapper.MVT.injectCSS(".row.addressRow { display: none; }");
Bootstrapper.MVT.injectCSS(".row.phoneRow { display: none; }");
Bootstrapper.MVT.injectCSS(".row.distanceRow { display: none; }");
Bootstrapper.MVT.injectCSS(".avgrate { display: none; }");
Bootstrapper.MVT.injectCSS(".col-md-12.priceBefore { display: none; }");
Bootstrapper.MVT.injectCSS(".detailSpecsTop { display: none; }");

// Temporarily hide the hotel name and "Book Now and Save" info.
// After doing some work, we show these again.
Bootstrapper.MVT.injectCSS(".detailsLink { display: none; }");
Bootstrapper.MVT.injectCSS(".priceBookSave { display: none; }");

// doc ready!
jQuery("document").ready(function(){

    // On doc ready, call the taoRearrange() function
    taoRearrange();

    // Watch for a click on Show More or Show All. On ajaxComplete(), rerun the
    // taoRearrange() function.
    jQuery("body").on("click", "#showMoreLink, #showAllLink", function () {

        localStorage.setItem("taoShowClick", "true");

        jQuery(document).ajaxComplete(function (event, request, settings) {

            if (localStorage.getItem("taoShowClick") == "true") {

                taoRearrange();

            }

            localStorage.setItem("taoShowClick", "false");

        });

    });

    // Click track functions
    jQuery(".detailsBtn").on("click", function () {
        mboxPixelTrack('mboxClickTrack', 'clicked=detailsClick');
    });

    jQuery(".mapsBtn").on("click", function () {
        mboxPixelTrack('mboxClickTrack', 'clicked=mapsClick');
    });

    jQuery(".photoViewerWrapper").on("click", function () {
        mboxPixelTrack('mboxClickTrack', 'clicked=galleryClick');
    });

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

function taoRearrange () {

    // Move the hotel name to the new location. To do this, we have to loop
    // through each hotel name. For each hotel name, add a .taoHotelName css
    // class. Then find the corresponding div.detailSpecsBottom. Finally,
    // prepend the hotel name to the items in div.detailSpecsBottom.
    jQuery(".detailSpecsTop div.col-md-9 > div.row").each( function() {
        var $taoHotelName = jQuery(this);
        $taoHotelName.addClass("taoHotelName");
        var $taoSpecsBottomDetails = $taoHotelName.closest(".detailSpecsTop").siblings(".detailSpecsBottom").find(".details");
        $taoHotelName.prependTo($taoSpecsBottomDetails);
    });

    // Now that the loop is done, show the hotel name
    jQuery(".detailsLink").show();

    // Remove the "Nightly Rate" from the right side of the row
    jQuery(".avgrate").parent().remove();

    // Now we need to put the "Book Now and Save" and the actual savings on
    // the same line. For each of these, we grab the node for "Book Now". Then
    // we find the actual savings and move it up the "Book Now" node. Finally,
    // remove the node the actual savings was in.
    jQuery(".priceBookSaveTitle").each(function () {

        // Before we do anything, replace the 'and' with '&'
        var taoTemp = jQuery(this).find("span").text().replace("and","&");
        jQuery(this).find("span").text(taoTemp);

        var $taoPriceBookSaveTitle = jQuery(this);
        var $taoActualSavings = $taoPriceBookSaveTitle.parent().find(".col-md-12").eq(1);

        // Now we have to loop through $taoActualSavings and put each <span>
        // into the new location
        $taoActualSavings.find("span").each(function (i) {
            jQuery(this).appendTo($taoPriceBookSaveTitle.find(".col-md-12"));
            if (i == 2) {
                $taoPriceBookSaveTitle.find(".col-md-12").append(document.createTextNode("\u00A0"));
            }
        });

        // Finally, put the percentage savings at the end (if it exists)
        var taoPercentage = $taoActualSavings.text().match(/\(\d+%\)/);
        if (taoPercentage) {
            $taoPriceBookSaveTitle.find(".col-md-12").append(" " + taoPercentage);
        }

        $taoPriceBookSaveTitle.siblings(".row").remove();
    });

    // Now that the loop is done, show the "Book Now and Save" information
    jQuery(".priceBookSave").show();

    // Last thing -- loop through each hotel thumbnail and move it to the new
    // location above the Check Rates button.
    jQuery(".detailSpecsTop img").each(function () {
        jQuery(this).prependTo(jQuery(this).closest(".resRow").find(".priceInfoArea"));
    });

    // With the thumbnail moved, we can remove .detailSpecsTop
    jQuery(".detailSpecsTop").remove();

}
