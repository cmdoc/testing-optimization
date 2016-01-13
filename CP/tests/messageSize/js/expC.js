// Hide the old form before doing any of the changes.
Bootstrapper.MVT.injectCSS("#reserveNowMsg { display:none; }");

jQuery(document).ready(function () {

    // Change the dimensions of the checkbox icon
    jQuery(".reserveNowCheckBox").attr("width", "11").attr("height", "11");

    // Show the message
    jQuery("#reserveNowMsg").show();

});