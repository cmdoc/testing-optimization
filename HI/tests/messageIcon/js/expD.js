// Hide the old form before doing any of the changes.
Bootstrapper.MVT.injectCSS("#reserveNowMsg { display:none; }");

jQuery(document).ready(function () {

    // Change out the source for the checkbox icon and add the CSS class 
    // that will display it correctly
    jQuery("img.reserveNowCheckBox").attr("src", "http://prodcache.internal.ihg.com/content/dam/etc/media_library/cn/0/cn/misc/sprite/taoUrgIcons.png");
    jQuery("img.reserveNowCheckBox").addClass("taoIconLock");

    // Show the row now that everything is done
    jQuery("#reserveNowMsg").show();

});