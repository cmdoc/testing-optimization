﻿jQuery(document).ready(function () {

    // Build the DIV that contains the "Are you sure?" messaging and place
    // it in the right position so it can be shown when needed.
    jQuery(".quickEnrollLeft").append("<div id='taoAreYouSure'></div>");
    jQuery("#taoAreYouSure").hide();
    jQuery("#taoAreYouSure").text("Are you sure you don't want access to member exclusive discounted rates?");

    // When the "No" option is clicked for Quick Enroll, show or hide the 
    // "Are you sure?" messaging.
    jQuery("input[name='pcrQuickEnroll']").click(function () {
        if (jQuery(this).val() == "false") {
            jQuery("#taoAreYouSure").slideDown(250);
        } else {
            jQuery("#taoAreYouSure").slideUp(250);
        }
    });
});