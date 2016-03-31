// Hide the old form before doing any of the changes.
// Bootstrapper.MVT.injectCSS("#reserveNowMsg { display:none; }");

jQuery(document).ready(function () {

    // Build the DIV that contains the "Are you sure?" messaging and place
    // it in the right position so it can be shown when needed.
    jQuery(".quickEnrollLeft").append("<div id='taoAreYouSure'></div>");
    jQuery("#taoAreYouSure").hide();
    jQuery("#taoAreYouSure").text("Are you sure you're not interested in free Internet during your stay?");

    // When the "No" option is clicked for Quick Enroll, show or hide the 
    // "Are you sure?" messaging.
    //jQuery("#pcrNoEnroll").on("change", function () { 
    //    jQuery("#taoAreYouSure").toggle();
    //});

    jQuery("input[name='pcrQuickEnroll']").click(function () {
        if (jQuery(this).val() == "false") {
            jQuery("#taoAreYouSure").show();
        } else {
            jQuery("#taoAreYouSure").hide();
        }
    });
});