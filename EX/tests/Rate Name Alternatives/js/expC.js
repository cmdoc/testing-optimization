jQuery(document).ready(function () {

    // Set up a couple of variables for the two types of rate names
    var taoNewTitle = "<span class='memberTitle'>Member Rate</span>";
    var taoNewTitleAdvance = "<span class='memberTitle'>Member Rate Advance</span>";

    // Loop through each of the rate names and determine if you need to change
    // the name and which one you should use.
    jQuery(".memberRateTypeLineItemRight div#memberPriceTitle").each(function () {
        if (jQuery(this).text().indexOf("Advance") > 0) {
            jQuery(this).html(taoNewTitleAdvance);
        } else {
            jQuery(this).html(taoNewTitle);
        }
    });

});