// Hide the old form before doing any of the changes.
Bootstrapper.MVT.injectCSS("#reserveNowMsg { display:none; }");

jQuery(document).ready(function () {

    // Remove the IMG tag and replace it with a div that uses the background
    // image for the new icon.
    jQuery(".reserveNowMsgImgDiv img").remove();
    jQuery(".reserveNowMsgImgDiv").html("<div class='reserveNowCheckBox taoCheckBoxSpriteWhite'></div>");

    // Show the row now that everything is done
    jQuery("#reserveNowMsg").show();

});
